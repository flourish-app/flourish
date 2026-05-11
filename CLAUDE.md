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

### Environment variables

Public (client-safe): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
Server-only: `SUPABASE_SERVICE_ROLE_KEY`, `FINNHUB_API_KEY`, `CRON_SECRET`
