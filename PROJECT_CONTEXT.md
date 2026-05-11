# Flourish — Project Context

Flourish is a UK-focused financial literacy platform for university students and young adults. The goal is to make financial education approachable, interactive, and non-intimidating — combining structured courses, a virtual portfolio simulator, and financial tools.

**Brand positioning:** Flourish is a financial confidence platform, not a trading app or advice service. The tone is calm, encouraging, and student-friendly. Design references: Monzo, Notion, Linear.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router (TypeScript) |
| Styling | Custom CSS in `app/globals.css` — BEM-style classes, CSS variables. Tailwind installed for PostCSS pipeline only — do **not** use Tailwind utility classes |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| Deployment | Vercel |
| Price data | Finnhub (US stocks) + Yahoo Finance (LSE stocks via `.L` suffix) |

Dark mode is applied via `html.dark` explicit overrides — not Tailwind's `dark:` prefix. Theme provider is `next-themes` with `defaultTheme="light"`, no `enableSystem`.

---

## Route Structure

```
app/
  (main)/          public marketing pages (no auth)
  (auth)/          login, signup, start-learning (no auth)
  dashboard/       authenticated pages — each page enforces auth client-side
  api/cron/        server-only Vercel Cron routes
```

There is **no middleware auth guard**. Every `dashboard/` page subscribes to `onAuthStateChange` for `SIGNED_OUT` and calls `supabase.auth.getSession()` in a `useEffect`. If the session is missing it calls `supabase.auth.signOut()` then `router.replace('/login')`.

---

## Database Schema

All tables have RLS enabled. The Supabase client singleton is at `lib/supabase.ts`.

### `profiles`
Created on signup, joined to `auth.users` by `id`.
- `id` uuid (PK, references auth.users)
- `email` text
- `first_name` text
- `age_range` text (`Under 18`, `18–21`, `22–25`, `26–30`, `31+`)
- `university` text
- `course` text
- `not_in_he` boolean
- `created_at` timestamptz

### `virtual_portfolios`
One per user. Starting cash is `£10,000` (`STARTING_CASH` exported from `lib/simulator.ts`). Reset via RPC `reset_portfolio`.
- `id` uuid (PK)
- `user_id` uuid (references auth.users)
- `cash_balance` numeric

### `holdings`
Positions within a portfolio.
- `id` uuid (PK)
- `portfolio_id` uuid
- `ticker` text
- `shares` numeric
- `avg_cost` numeric

### `stocks`
Reference data for tradeable stocks.
- `ticker` text (PK)
- `name` text
- `currency` text
- `sector` text
- `flag` text
- `is_active` boolean

### `stock_prices`
Cached prices written by the `get-prices` edge function. 30-second TTL.
- `ticker` text (PK)
- `price` numeric

### `portfolio_snapshots`
Daily EOD snapshots written by the cron job (`/api/cron/snapshot`, Mon–Fri 17:00 UTC).
- `portfolio_id` uuid
- `total_value` numeric
- `snapshot_date` date

### `lesson_completions`
Tracks which lessons each user has completed. Used for course progress, dashboard stats, and streak calculation.
- `id` uuid (PK)
- `user_id` uuid (references auth.users, `DEFAULT auth.uid()`)
- `course_slug` text
- `lesson_slug` text
- `completed_at` timestamptz (DEFAULT now())
- UNIQUE on `(user_id, course_slug, lesson_slug)`

RLS policies: users can SELECT, INSERT, and DELETE their own rows only.

---

## Courses

### Overview pages

Each course has two versions of its overview page:
- `app/(main)/courses/[course-slug]/page.tsx` — public marketing page (locked lessons, sign-up CTA)
- `app/dashboard/courses/[course-slug]/page.tsx` — authenticated page (all lessons unlocked, real progress)

Courses currently defined:
| Slug | Title | Lessons |
|---|---|---|
| `investing-from-scratch` | Investing from Scratch | 8 |
| `isas-and-tax-free-saving` | ISAs & Tax-Free Saving | 6 |
| `stocks-etfs-and-funds` | Stocks, ETFs & Funds | 10 |
| `pensions-and-your-future` | Pensions & Your Future | 5 |

### Course content library

Lesson content is defined as structured TypeScript data in `lib/lessons/[course-slug].ts`. The types are:

```typescript
type Section = {
  heading?: string
  paragraphs: string[]
  list?: string[]
  callout?: Callout           // type: 'key' | 'tip' | 'example'
  checkpoint?: Checkpoint     // inline interactive element
}

type Lesson = {
  num: number
  slug: string                // e.g. 'lesson-1'
  title: string
  duration: string
  intro: string
  sections: Section[]
  keyTakeaways: string[]
}
```

Checkpoints are one of three types:
- `quiz` — question + options; immediate feedback; encouraging tone (never "wrong!")
- `confidence` — emoji self-assessment (fuzzy/getting it/got it); fuzzy surfaces a recap
- `reflection` — a fill-in-the-blank prompt with a "Reveal answer" button

### Lesson pages

Route: `app/dashboard/courses/investing-from-scratch/[lesson]/page.tsx`

Features:
- Sticky topbar with breadcrumb and 8 progress dots (active = green, completed = faded green, unvisited = grey)
- Thin green scroll-progress bar fixed at top of viewport
- Lesson header with number badge, duration, "✓ Completed" pill on revisit
- Sections render with callout boxes and inline checkpoints
- Green "Key takeaways" panel at bottom of content
- **"Mark as complete & next lesson →"** primary CTA — writes to `lesson_completions`, navigates to next lesson
- Shows "✓ You've completed this lesson" on revisit
- Prev/next nav for skipping around without marking complete
- Last lesson CTA: "Complete course →" → navigates back to course overview

### Course overview (authenticated)

`app/dashboard/courses/investing-from-scratch/page.tsx` — client component that:
- Loads `lesson_completions` for this course on mount
- Shows real `X / 8 lessons` count and progress bar fill
- Button adapts: **Start course** (0 done) → **Continue course** (in progress, links to first incomplete lesson) → **Retake course** (all 8 done, deletes completions + redirects to lesson 1)
- Curriculum list: completed lesson rows show green filled number with ✓, muted title, "Review" label

---

## Dashboard

`app/dashboard/page.tsx` — loads three data sources in parallel on mount:
1. `profiles` — user name
2. `virtual_portfolios` + `holdings` — portfolio total (computed with cached stock prices)
3. `lesson_completions` — all completions across all courses

Cards:

**Continue Learning** — shows Investing from Scratch progress. Adapts label: "Start course" / "Resume lesson" (links to correct next lesson) / "View course" (all done).

**Your Progress** stats:
- *Lessons done* — total row count from `lesson_completions`
- *Day streak* — consecutive calendar days (UK timezone / `Europe/London`) ending today or yesterday where ≥1 lesson was completed
- *Points earned* — placeholder (0), not yet implemented

**Portfolio Simulator** — shows live total value, polls every 30s.

**Recommended** — static links to specific lessons and courses.

---

## Simulator

All shared types and formatting utilities are in `lib/simulator.ts`:
- Types: `SimPortfolio`, `SimHolding`, `SimStock`, `PriceData`, `SimTransaction`
- Utils: `formatPrice`, `formatPnl`, `formatChangePct`
- Constant: `STARTING_CASH = 10_000`

Price fetching: `supabase.functions.invoke('get-prices', { body: { tickers } })`. Cached in `stock_prices` for 30s. Simulator pages poll every 30s via `setInterval`.

Dashboard portfolio preview reads directly from `stock_prices` (no edge function call) to avoid unnecessary Finnhub usage.

---

## What's Built

- Full marketing site (landing, how-it-works, tools, course previews, privacy policy)
- Auth (signup, login, "remember me", session guard on all dashboard pages)
- Dashboard with live portfolio value and real learning stats
- Virtual portfolio simulator (buy/sell, holdings, performance chart, history)
- Financial tools (compound calculator, ISA tracker, LISA calculator, risk profiler) — public + dashboard versions
- **Investing from Scratch** — fully built:
  - 8 lessons with complete written content
  - 15 inline checkpoints (quiz, confidence, reflection) across all 8 lessons
  - Lesson progress tracking via `lesson_completions`
  - Course overview with real progress bar, smart CTA, completed lesson indicators
  - Dashboard wired to real completion count + streak

---

## What's Next

- Progress tracking for the other 3 courses (ISAs, Stocks/ETFs, Pensions) — content needs writing, lesson pages need creating, same pattern as IFS
- Points / gamification system
- Streak notifications or reminders
- Course completion certificate or badge
- Dashboard "Recommended" section personalised to actual progress
- Public course preview pages showing lesson 1 as a free preview (already set up with `free: true` flag, but the public lesson page doesn't exist yet)
