# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite exists. There are no test files to run.

---
## Instructions for Claude

### Crucial
Reply in the most concise form possible, without damaging quality. Skip plesantries, preambles and recaps/repeats of my question. Do not narrate your steps.

Do not make any changes until you have 95% confidence in what you need to build. Ask me follow-up questions until you reach that confidence.

## Architecture

### Route groups

```
app/
  (main)/        # public marketing pages — no auth required
  (auth)/        # login, signup, start-learning — no auth required
  dashboard/     # authenticated pages — every page enforces auth client-side
  api/cron/      # server-side only — Vercel Cron routes
```

There is **no middleware** auth guard. Every `dashboard/` page handles auth itself: it subscribes to `onAuthStateChange` for `SIGNED_OUT` and calls `supabase.auth.getSession()` in a `useEffect`. If session is missing or invalid it calls `supabase.auth.signOut()` then `router.replace('/login')`. Follow this pattern for any new dashboard page.

### Supabase

The client is a singleton at `lib/supabase.ts`. The `Profile` type is exported from there too. Use `supabase` (anon key, client-side) for all user-facing data access. Server routes that need elevated privileges (`/api/cron/`) create their own client with `SUPABASE_SERVICE_ROLE_KEY`.

Key tables:
- `profiles` — created on signup; joined to `auth.users` by `id`
- `virtual_portfolios` — one per user; holds `cash_balance` (starts at £10,000)
- `holdings` — positions within a portfolio (`ticker`, `shares`, `avg_cost`)
- `stocks` — reference data for tradeable stocks (`ticker`, `name`, `currency`, `sector`, `flag`, `is_active`)
- `stock_prices` — cached prices written by the `get-prices` edge function; 30s TTL
- `portfolio_snapshots` — daily EOD snapshots written by the cron job

### Simulator

`lib/simulator.ts` contains all shared types (`SimPortfolio`, `SimHolding`, `SimStock`, `PriceData`, `SimTransaction`) and formatting utilities (`formatPrice`, `formatPnl`, `formatChangePct`). Import from here rather than redefining.

**Price fetching:** Call the `get-prices` Supabase Edge Function via `supabase.functions.invoke('get-prices', { body: { tickers } })`. It uses Finnhub for US stocks and Yahoo Finance for LSE stocks (ticker suffix `.L`). Results are cached in `stock_prices` for 30 seconds. The simulator pages poll this every 30s via `setInterval`.

**Dashboard portfolio preview** reads directly from the `stock_prices` table (cached) rather than invoking the edge function, to avoid unnecessary Finnhub calls on the overview page.

**Starting cash** is `STARTING_CASH = 10_000` (exported from `lib/simulator.ts`). Portfolio reset is done via a Supabase RPC `reset_portfolio`.

### Cron

`/api/cron/snapshot` runs Mon–Fri at 17:00 UTC (30 min after London market close). It reads prices from `stock_prices`, computes `total_value` per portfolio, and upserts into `portfolio_snapshots`. It does **not** write back to `virtual_portfolios.total_value` — that column is not maintained in real-time.

### Styling

All CSS is in `app/globals.css` — one large file using custom classes (loosely BEM: `.nav__inner`, `.sidebar__link--active`, `.dashboard-card--featured`). Tailwind is installed but not used for component styling; it provides the PostCSS pipeline only. Do not add Tailwind utility classes to components.

**CSS variables** are defined in `:root`. The dark mode theme is applied by `html.dark` (added by `next-themes`). Dark mode styles are **explicit overrides** — `html.dark .component { ... }` — rather than Tailwind's `dark:` prefix. When adding new components, add dark mode overrides explicitly in `globals.css`. Intentionally dark sections (footer, stats strip, `.sim` hero, `.path-card--featured`) must not have their `--black`/`--white` variables overridden in dark mode.

### Theme

`next-themes` wraps the app via `components/ThemeProvider.tsx` with `defaultTheme="light"` and `attribute="class"`. The toggle is a reusable `components/ThemeToggle.tsx`. Do not use `enableSystem` — the site defaults to light regardless of OS preference.

### Components

`components/Nav.tsx` — public marketing navbar (auth-aware: shows Dashboard link when signed in).  
`components/DashboardSidebar.tsx` — dashboard sidebar with mobile drawer; includes `ThemeToggle`.  
`components/ThemeProvider.tsx` and `components/ThemeToggle.tsx` — theme management.

#### Component directories

All components follow a **container/presentational** split: state, Supabase calls, and event handlers live in `page.tsx`; UI is extracted to named components. `'use client'` is only added where state/effects/event handlers are needed.

**`components/Marketing/`** — UI for `app/(main)/` pages.
- `types.ts` — shared types (`MarketingLesson`)
- `CtaBanner.tsx` — full-width CTA section; accepts `children: React.ReactNode` so server pages can pass plain `<Link>`s or client components like `StartLearningCTA`
- `MarketingCourseSignupCard.tsx` — course hero signup card (props: `emoji`, `total`)
- `MarketingCourseCurriculum.tsx` — free/locked lesson list (props: `lessons: MarketingLesson[]`, `subText?`)
- `MarketingCourseCTABlock.tsx` — mid-page CTA block with sign-up/login links (props: `headline`, `sub`)
- `HomeHero.tsx`, `HomeStats.tsx`, `HomeHowItWorks.tsx`, `HomeCoursesGrid.tsx`, `HomeToolsGrid.tsx`, `HomeSimTeaser.tsx`, `HomeTestimonials.tsx` — homepage sections (data hardcoded internally, no props)
- `HowItWorksGap.tsx`, `HowItWorksBarriers.tsx`, `HowItWorksJourney.tsx` — how-it-works page sections
- `SimPageHero.tsx`, `SimPageFeatures.tsx`, `SimPageSteps.tsx`, `SimPageLeaderboard.tsx` — simulator marketing page sections

**`components/Auth/`** — UI for `app/(auth)/` pages.
- `types.ts` — `SignupStep1Props`, `SignupStep2Props`
- `LoginForm.tsx` (`'use client'`) — full login form with `useSearchParams`; page.tsx wraps in `<Suspense>`
- `SignupStep1.tsx` (`'use client'`) — step 1 of signup (name, age range, uni/course)
- `SignupStep2.tsx` (`'use client'`) — step 2 of signup (email, password + strength meter)
- `SignupEmailSent.tsx` — confirmation screen (no client directive)
- `ForgotPasswordForm.tsx` (`'use client'`) — forgot password email input
- `ForgotPasswordSent.tsx` — sent confirmation screen (no client directive)
- `ResetPasswordForm.tsx` (`'use client'`) — new password + confirm fields

**`components/CourseOverview/`** — used by both `(main)/courses/` pages and `dashboard/courses/` pages.
- `CourseOutcomes`, `CourseForGrid`, `CourseFaq`, `CourseRelated` — shared UI blocks; `RelatedCourse.href` is populated with the appropriate path by each consumer.

**`components/DashboardCourses/`** — `CourseCard`, `ComingSoonCard` used in dashboard course listing.

### Environment variables

Public (client-safe): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `FINNHUB_API_KEY`, `CRON_SECRET`
