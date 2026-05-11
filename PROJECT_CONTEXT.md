# Flourish

Flourish is a UK-focused financial literacy and investing platform designed for university students and young adults.

The goal is to make financial education:
- approachable
- interactive
- practical
- modern
- non-intimidating

The platform combines:
- structured courses
- interactive simulations
- financial tools
- student resources
- personalized dashboards

---

# Tech Stack

Frontend:
- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui

Backend:
- Supabase
- PostgreSQL
- Supabase Auth

Deployment:
- Vercel

---

# Design Style

The UI should feel:
- calm
- modern
- premium
- student-friendly
- trustworthy
- minimalist

Design inspirations:
- Monzo
- Notion
- Linear
- Headspace
- Duolingo

Avoid:
- crypto aesthetics
- cluttered dashboards
- aggressive fintech styling
- corporate banking visuals

Primary brand color:
- muted/sage green

Typography:
- modern sans-serif UI
- elegant serif headings

---

# Product Structure

Public pages:
- Landing page
- Resources
- Tools/calculators
- Course previews
- Financial guides

Authenticated pages:
- Dashboard
- Full courses
- Lesson progress
- Portfolio simulator
- Saved resources
- Personalized recommendations

---

# Current Features

Implemented:
- Landing page
- Navbar/footer
- Login/signup UI
- Responsive frontend
- Vercel deployment
- Supabase connection

In progress:
- Authentication flow
- Dashboard
- User persistence

Planned:
- Investing simulator
- Progress tracking
- Course engine
- Portfolio tracking
- Quizzes
- Streaks
- Gamification

---

# Current Priorities

1. Complete authentication
2. Redirect users to dashboard after login
3. Create protected dashboard routes
4. Store user profiles
5. Build dashboard MVP
6. Add lesson progress tracking
7. Build investing simulator MVP

---

# Dashboard Vision

The dashboard should feel:
- motivating
- clean
- calm
- progress-oriented

NOT like:
- a trading terminal
- Bloomberg
- a crypto exchange

The dashboard should include:
- Continue learning
- Progress overview
- Portfolio preview
- Recommended lessons
- Goals/streaks

---

# Backend Structure

Planned database tables:

profiles
- id
- email
- first_name
- created_at

user_progress
- user_id
- lesson_id
- progress_percent
- completed

virtual_portfolios
- user_id
- cash_balance
- total_value

holdings
- portfolio_id
- ticker
- shares
- average_price

---

# Coding Rules

- Use TypeScript everywhere
- Prefer reusable components
- Keep files modular and clean
- Avoid giant page files
- Use responsive design
- Use server components where appropriate
- Keep UI minimal and modern

---

# Brand Positioning

Flourish is NOT:
- a trading platform
- a crypto app
- a finance bro product
- a platform that provides financial advice

Flourish IS:
- a financial confidence platform
- a student financial toolkit
- an interactive learning experience

Core emotional goal:
Help students feel more confident about money and investing early in life.