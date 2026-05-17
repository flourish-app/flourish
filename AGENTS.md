# AGENTS.md

> This version of Next.js has breaking changes. Read `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Role and Mission
You are an expert developer and product creator for Flourish, a high-fidelity Fintech Trading Simulator.
Personas: Engineering (Architecture), Product (UX/Conversion), Finance (Market Logic).

## Commands
- `npm run dev`: start dev server (localhost:3000)
- `npm run build`: production build
- `npm run lint`: ESLint check

No test suite exists. There are no test files to run.

## Core Directives
1. **Concise Output**: Reply in the most concise form possible, without damaging quality. Skip pleasantries, preambles, and recaps. Do not narrate steps.
2. **Confidence Rule**: Do not make changes until 95% confidence is reached. Ask follow-up questions until you reach that confidence.
3. **Institutional Order**: No middleware auth guard. Every `dashboard/` page must handle auth client-side via `onAuthStateChange` and `supabase.auth.getSession()` in a `useEffect`. If session is missing or invalid, call `supabase.auth.signOut()` then `router.replace('/login')`.
4. **CSS Discipline**: All CSS is in `app/globals.css`. Use custom BEM-style classes. Never use Tailwind utility classes in components.

## Design Context

`PRODUCT.md` and `DESIGN.md` are the authoritative sources for all design decisions. Read both before any UI or styling work.

- `PRODUCT.md` — target users, brand personality, anti-references, design principles, accessibility requirements
- `DESIGN.md` — color palette, typography hierarchy, elevation rules, component specs, named rules

Key constraints to carry at all times:
- Growth Green (`#2e7d5e`) on ≤20% of any surface — scarcity is its signal
- DM Serif Display for display/headline/title/quote only; Inter for all UI, labels, body, buttons
- Flat surfaces by default; no resting shadows on marketing cards
- No `border-left`/`border-right` >1px as decorative accent stripes
- No gradient text (`background-clip: text`)
- No identical icon+heading+text card grids
- Dark mode defaults to `light`; never use `enableSystem`

## Architecture and Data

### Route Groups
```
app/
  (main)/        # public marketing pages — no auth required
  (auth)/        # login, signup, start-learning — no auth required
  dashboard/     # authenticated pages — every page enforces auth client-side
  api/cron/      # server-side only — Vercel Cron routes
```

### Supabase and Tables
- Client singleton: `lib/supabase.ts`. `Profile` type exported from there.
- Server routes: Use `SUPABASE_SERVICE_ROLE_KEY` for elevated privileges.
- `profiles` — created on signup; joined to `auth.users` by `id`
- `virtual_portfolios` — one per user; holds `cash_balance` (starts at £10,000)
- `holdings` — positions within a portfolio (`ticker`, `shares`, `avg_cost`)
- `stocks` — reference data for tradeable stocks (`ticker`, `name`, `currency`, `sector`, `flag`, `is_active`)
- `stock_prices` — cached prices written by the `get-prices` edge function; 30s TTL
- `portfolio_snapshots` — daily EOD snapshots written by the cron job
- `user_habits` — event-driven behavioural tracking (`id`, `user_id`, `event_type`, `metadata` jsonb, `occurred_at`); RLS: users read/write own rows only. Migration: `supabase/migrations/20260515_user_habits.sql`

### Simulator Logic
- Shared types and formatting: `lib/simulator.ts` — `SimPortfolio`, `SimHolding`, `SimStock`, `PriceData`, `SimTransaction`, `formatPrice`, `formatPnl`, `formatChangePct`. Import from here, don't redefine.
- Price Fetching: Invoke `get-prices` Edge Function via `supabase.functions.invoke('get-prices', { body: { tickers } })`. US = Finnhub; LSE = Yahoo Finance (`.L`). Simulator pages poll every 30s via `setInterval`.
- Caching: Dashboard overview reads directly from `stock_prices` table; detail pages invoke edge function.
- Cash: `STARTING_CASH = 10_000`. Reset via `reset_portfolio` RPC.

### Cron Operations
- `/api/cron/snapshot`: Runs Mon–Fri at 17:00 UTC (30 min after London market close).
- Calculates `total_value` and upserts to `portfolio_snapshots`.
- Does **not** maintain `virtual_portfolios.total_value` in real-time.

## Styling and Theme
- Custom BEM classes in `app/globals.css` (e.g., `.nav__inner`, `.sidebar__link--active`, `.dashboard-card--featured`). Tailwind provides the PostCSS pipeline only — never use utility classes in components.
- **CSS variables** defined in `:root`. Dark mode applied via `html.dark` (next-themes). Dark mode styles are **explicit overrides** — `html.dark .component { ... }` — not Tailwind `dark:` prefix.
- Intentionally dark sections (footer, stats strip, `.sim` hero, `.path-card--featured`) must not have `--black`/`--white` variables overridden in dark mode.
- `next-themes`: `defaultTheme="light"`, `attribute="class"`, `enableSystem=false`. Toggle via `components/ThemeToggle.tsx`.

## Component Directory Map

All components follow a **container/presentational** split: state, Supabase calls, and event handlers live in `page.tsx`; UI extracted to named components. `'use client'` only added where state/effects/event handlers are needed.

**`components/Nav.tsx`** — public marketing navbar (auth-aware: shows Dashboard link when signed in).
**`components/DashboardSidebar.tsx`** — dashboard sidebar with mobile drawer; includes `ThemeToggle`. Renders `.sidebar__promo-card` only when `pathname === '/dashboard/tools'`.
**`components/ThemeProvider.tsx`** and **`components/ThemeToggle.tsx`** — theme management.

**`components/Marketing/`** — UI for `app/(main)/` pages.
- `types.ts` — shared types (`MarketingLesson`)
- `CtaBanner.tsx` — full-width CTA section; accepts `children: React.ReactNode`
- `MarketingCourseSignupCard.tsx` — course hero signup card (props: `emoji`, `total`)
- `MarketingCourseCurriculum.tsx` — free/locked lesson list (props: `lessons: MarketingLesson[]`, `subText?`)
- `MarketingCourseCTABlock.tsx` — mid-page CTA block (props: `headline`, `sub`)
- `HomeHero.tsx`, `HomeStats.tsx`, `HomeHowItWorks.tsx`, `HomeCoursesGrid.tsx`, `HomeToolsGrid.tsx`, `HomeSimTeaser.tsx`, `HomeTestimonials.tsx` — homepage sections
- `HowItWorksGap.tsx`, `HowItWorksBarriers.tsx`, `HowItWorksJourney.tsx` — how-it-works page sections
- `SimPageHero.tsx`, `SimPageFeatures.tsx`, `SimPageSteps.tsx`, `SimPageLeaderboard.tsx` — simulator marketing page sections

**`components/Auth/`** — UI for `app/(auth)/` pages.
- `types.ts` — `SignupStep1Props`, `SignupStep2Props`
- `LoginForm.tsx` (`'use client'`) — full login form with `useSearchParams`; page.tsx wraps in `<Suspense>`
- `SignupStep1.tsx` (`'use client'`) — step 1: name, age range, uni/course
- `SignupStep2.tsx` (`'use client'`) — step 2: email, password + strength meter
- `SignupEmailSent.tsx` — confirmation screen
- `SignupBenefitsPanel.tsx` — left marketing panel shown on all signup steps
- `ForgotPasswordForm.tsx` / `ForgotPasswordSent.tsx` / `ResetPasswordForm.tsx` — password recovery flow

**Signup layout** — `app/(auth)/signup/page.tsx` uses `.signup-step2-layout` (two columns) throughout: `SignupBenefitsPanel` always left; step views swap right. Progress bar always in `.signup-step2-form`.

**`components/CourseOverview/`** — `CourseOutcomes`, `CourseForGrid`, `CourseFaq`, `CourseRelated` — shared blocks used in both `(main)/courses/` and `dashboard/courses/`.

**`components/DashboardCourses/`** — `CourseCard`, `ComingSoonCard` for the dashboard course listing.

**`components/Dashboard/PathSelector.tsx`** — server component on the main dashboard page below `dashboard__grid`. Shows `featuredPaths` as horizontal-scroll cards on mobile, 3-column grid on desktop. CSS: `.path-selector`, `.ps-card`, `.ps-card__body` (`min-width: 0` required), `.ps-card__footer`.

**`components/tools/GuestSaveBanner.tsx`** — fixed-position bottom banner for unauthenticated users after engagement. Props: `{ onDismiss: () => void }`. Links to `/start-learning`. CSS: `.guest-save-banner*` with `slideUpBanner` animation.

## Course Registry

**`lib/curriculum.ts`** is the single source of truth for all course metadata. Do not hardcode course data in page files.

- `CourseEntry` — `slug`, `emoji`, `tag`, `tagStyle`, `badge?`, `title`, `body`, `lessons`, `duration`, `status: 'available' | 'coming-soon'`
- `courses` — full array; `availableCourses` / `comingSoonCourses` — pre-filtered; `totalLessons` — derived count
- Adding a new course = one new entry in `courses`. Auto-updates: marketing course listing, dashboard course listing, `HomeCoursesGrid`.
- Also exports `CurriculumMap` (8-topic dependency graph), `getLessonById`, `getUnlockedLessons`, `getDependencyChain`. JSON Schema at `public/schemas/curriculum-map.json`.

## Behavioural Tracking

**`lib/habits.ts`** — `recordHabit(eventType, meta)` writes to `user_habits`. Returns `Promise<void>`; safe to `await` before navigation or call fire-and-forget. Silently no-ops when there is no session (safe for guests).

Event catalogue (`HabitMeta`):
- `lesson_finish` — `{ course_slug, lesson_slug }` — fired in all 4 `[lesson]/page.tsx` files inside `markComplete()`, before `router.push`
- `course_complete` — `{ course_slug }` — fired on final lesson, before redirect
- `course_start` — `{ course_slug }`
- `quiz_attempt` — `{ course_slug, lesson_slug, passed }`
- `sim_trade` — `{ ticker, type, shares, price }`
- `sim_reset` — `{}`
- `calc_use` — `CalcUseMeta`: `{ calculator: string; [key: string]: number | string | boolean }`
- `tool_open` — `{ tool }`

**`hooks/useDebouncedHabit.ts`** — fires `recordHabit('calc_use', { calculator, ...values })` after 3s of inactivity; deduplicates via JSON snapshot; skips mount; no-ops when `enabled = false`. Wired into `CompoundCalculator`, `ISATracker`, `LISACalculator`. Guest mode: accepts `onGuestEngaged?: () => void` (fires once, 4s after first interaction) and `guestEngageMs?` (default 4000).

## Recommendation Service

**`lib/recommendations.ts`** — `getSuggestedNextStep(userId): Promise<NextStepSuggestion>`.

`NextStepSuggestion`: `{ type, title, description, href, ctaLabel, context, courseSlug?, lessonSlug? }`.

Active strategy: `strategySimple` — queries `lesson_completions`, walks `availableCourses`, returns first incomplete lesson. `strategyAI` stub is commented in the file; swap by changing one line.

## Learning Paths

**`config/learningPaths.ts`** is the single source of truth for all learning path data.

Types: `Lesson` (`id`, `title`, `description`, `estimatedMinutes`, `xpReward`), `Course` (`id`, `title`, `lessons`), `LearningPath` (`id`, `title`, `description`, `imageUrl`, `category`, `tags`, `modules`, `courses`, `featuredOnDashboard?`).

Helpers: `featuredPaths`, `getPathById(id)`, `totalLessonsInPath(path)`, `totalXpInPath(path)`. Mock generators: `makeLessons(courseId, count)`, `makeCourse(pathId, index, title, lessonCount)`.

**Routes:**

| Route | File | Notes |
|---|---|---|
| `/dashboard/paths/[pathId]` | `app/dashboard/paths/[pathId]/page.tsx` | Server component; path overview with course blocks + lesson rows |
| `/dashboard/paths/[pathId]/[courseId]/[lessonId]` | `app/dashboard/paths/[pathId]/[courseId]/[lessonId]/page.tsx` | Server component; distraction-free reading view |
| `LessonCompleteButton.tsx` | same directory as lesson page | `'use client'`; fires toast then `router.push(nextHref)` after 1.8s |

**Next lesson resolution** (computed in server page, passed as `nextHref`):
1. Next lesson in same course → navigate there
2. Last lesson in course + next course exists → first lesson of next course
3. Last lesson of path → back to path overview (`/dashboard/paths/[pathId]`)

**CSS classes** (all in `globals.css`):
- `.path-selector*`, `.ps-card*` — dashboard featured path cards
- `.path-overview__*` — path detail page header (back nav, editorial header, tags)
- `.path-course-block*` — course card with `--grey-1` header band
- `.path-lesson-row` — flex row link; left: content (title + desc), right: meta (time + XP); hover turns title green
- `.lesson-reader*` — distraction-free reading view (max-width 680px, centered)
- `.lesson-toast` — fixed pill toast (bottom-centre, `toastIn` keyframe)

## Dashboard Tools Page

`app/dashboard/tools/page.tsx`:
- **Hero** — eyebrow, headline, badge strip, stats box
- **Controls** — category tabs (All / Calculators / Trackers / Profilers), search input, sort dropdown, grid/list toggle
- **Tool cards** — `dtool-card` / `dtool-card--list`; filtered and sorted via `useMemo`
- **Right aside** (`tools-page__aside`, 310px) — Featured tool, Popular right now, Tips & learning, Need help?
- Layout: `.tools-page { display: grid; grid-template-columns: 1fr 310px; align-items: start }`

All `ttools-*`, `tools-page__*`, `dtool-card*` classes defined in `globals.css`.

## Environment Variables
- Public: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Server: `SUPABASE_SERVICE_ROLE_KEY`, `FINNHUB_API_KEY`, `CRON_SECRET`
