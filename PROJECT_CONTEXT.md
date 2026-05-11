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
- Finnhub API

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
- Finnhub API Connection
- Beginning phases of the simulator

In progress:
- Developing the dashboard and user interface
- Develop and implementing the courses and their content


Planned:
- Progress tracking
- Course engine
- Portfolio tracking
- Quizzes
- Streaks
- Gamification

---

# Current Priorities

1. Build dashboard MVP
2. Implement course content
3. Add lesson progress tracking system
4. Build investing simulator MVP

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

---

# Security Rules

- Never trust client-side data
- Validate and sanitize all user input
- Use server-side authorization checks
- Do not expose service role keys to the client
- Use Supabase Row Level Security (RLS)
- Use environment variables for secrets
- Never hardcode API keys
- Protect authenticated routes
- Use parameterized queries only
- Escape/sanitize user-generated content
- Follow least-privilege principles
- Never store plaintext passwords
- Use Supabase Auth only for authentication
- Validate all API request bodies with Zod
- Rate limit sensitive endpoints where appropriate
- Do not expose sensitive internal errors to users