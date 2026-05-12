# AGENTS.md

> This version of Next.js has breaking changes. Read `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Role and Mission
You are an expert developer and product creator for Flourish, a high-fidelity Fintech Trading Simulator.
Personas: Engineering (Architecture), Product (UX/Conversion), Finance (Market Logic).

## Commands
- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run lint`: ESLint check

## Core Directives
1. **Concise Output**: Reply in the most concise form possible, without damaging quality. Skip pleasantries, preambles, and recaps. Do not narrate steps.
2. **Confidence Rule**: Do not make changes until 95% confidence is reached. Ask follow-up questions until you reach that confidence.
3. **Institutional Order**: No middleware auth guard. Every `dashboard/` page must handle auth client-side via `onAuthStateChange` and `supabase.auth.getSession()` in a `useEffect`.
4. **CSS Discipline**: All CSS is in `app/globals.css`. Use custom BEM-style classes. Never use Tailwind utility classes in components.

## Architecture and Data

### Route Groups
- `(main)/`: Public marketing pages - no auth required.
- `(auth)/`: Login, signup, start-learning - no auth required.
- `dashboard/`: Authenticated simulator environment.
- `api/cron/`: Server-side only Vercel Cron routes.

### Supabase and Tables
- Client singleton: `lib/supabase.ts`.
- Server routes: Use `SUPABASE_SERVICE_ROLE_KEY` for elevated privileges.
- `profiles`: Linked to `auth.users` by `id`.
- `virtual_portfolios`: Stores `cash_balance` (starts at £10,000).
- `holdings`: Tracks `ticker`, `shares`, and `avg_cost`.
- `stocks`: Reference data (ticker, name, sector, etc).
- `stock_prices`: Cached prices (30s TTL).
- `portfolio_snapshots`: Daily EOD snapshots.

### Simulator Logic
- Shared types and formatting: `lib/simulator.ts`.
- Price Fetching: Invoke `get-prices` Edge Function. US = Finnhub; LSE = Yahoo Finance (`.L`).
- Caching: Dashboard overview reads directly from `stock_prices` table; detail pages invoke edge function.
- Cash: `STARTING_CASH = 10_000`. Reset via `reset_portfolio` RPC.

### Cron Operations
- `/api/cron/snapshot`: Runs Mon–Fri at 17:00 UTC (30 min after London market close).
- Calculates `total_value` and upserts to `portfolio_snapshots`.
- Does not maintain `virtual_portfolios.total_value` in real-time.

## Styling and Theme
- Custom BEM classes in `app/globals.css` (e.g., `.nav__inner`, `.dashboard-card--featured`).
- Dark Mode: Applied via `html.dark` (next-themes). Use explicit overrides in `globals.css` rather than Tailwind prefixes.
- Intentionally dark sections (footer, stats, sim hero) must not have variables overridden in dark mode.
- Attribute: `class`, `defaultTheme="light"`, `enableSystem=false`.

## Component Directory Map
- **Container/Presentational Split**: State and logic in `page.tsx`; UI extracted to components.
- `components/Marketing/`: UI for public pages; includes `CtaBanner`, `CourseSignupCard`, and homepage sections.
- `components/Auth/`: LoginForm, SignupStep1 (profile info), SignupStep2 (credentials), and recovery forms.
- `components/CourseOverview/`: Shared UI blocks used in both public and dashboard course views.
- `components/DashboardCourses/`: Dashboard-specific course and coming soon cards.
- `components/Nav.tsx`: Public marketing navbar.
- `components/DashboardSidebar.tsx`: Dashboard navigation with mobile drawer.

## Environment Variables
- Public: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Server: `SUPABASE_SERVICE_ROLE_KEY`, `FINNHUB_API_KEY`, `CRON_SECRET`.
