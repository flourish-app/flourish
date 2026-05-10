import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tools - Flourish',
  description: 'Free investing tools for UK students. Compound interest calculator, ISA tracker, risk profiler, LISA calculator and more — no account needed.',
}

const tools = [
  {
    emoji: '📈',
    tag: 'Calculator',
    title: 'Compound interest calculator',
    body: 'See exactly how your money grows over time. Adjust your starting amount, monthly contributions, and expected return to understand the real power of starting early.',
    badge: 'Most popular',
    href: '/tools/compound-calculator',
  },
  {
    emoji: '🏦',
    tag: 'Tracker',
    title: 'ISA allowance tracker',
    body: 'Track how much of your £20,000 annual ISA allowance you\'ve used across each ISA type — Cash, Stocks & Shares, LISA, and Innovative Finance — and see what\'s left before April.',
    badge: null,
    href: '/tools/isa-tracker',
  },
  {
    emoji: '⚖️',
    tag: 'Profiler',
    title: 'Risk profiler',
    body: 'Five questions. Two minutes. Find out what kind of investor you are — conservative, cautious, balanced, or adventurous — and what that means for how you should invest.',
    badge: null,
    href: '/tools/risk-profiler',
  },
  {
    emoji: '🏠',
    tag: 'Calculator',
    title: 'LISA calculator',
    body: 'Model your Lifetime ISA savings with the 25% government bonus included. See how your pot grows toward a first home or retirement — and exactly how much free money you\'ll earn.',
    badge: null,
    href: '/tools/lisa-calculator',
  },
]

const comingSoon = [
  {
    emoji: '🎮',
    tag: 'Simulator',
    title: 'Portfolio simulator',
    body: 'Practice investing with a virtual £10,000 in real markets. Build a portfolio, watch it move, and learn from your decisions — before any real money is involved.',
  },
]

export default function AllToolsPage() {
  return (
    <div className="all-courses-page">

      {/* ── Hero ── */}
      <div className="all-courses-hero">
        <div className="container">
          <div className="all-courses-hero__inner">
            <div>
              <div className="section-tag">All tools</div>
              <h1 className="all-courses-hero__headline">
                Understand your money in minutes
              </h1>
              <p className="all-courses-hero__sub">
                Free calculators, trackers, and profilers built for UK students. No account needed — just open and use.
              </p>
            </div>
            <div className="all-courses-hero__stats">
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">{tools.length}</div>
                <div className="all-courses-stat__label">Tools</div>
              </div>
              <div className="all-courses-stat__divider" />
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">£0</div>
                <div className="all-courses-stat__label">Cost</div>
              </div>
              <div className="all-courses-stat__divider" />
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">0</div>
                <div className="all-courses-stat__label">Sign-up required</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="all-courses-body">

          {/* ── Available now ── */}
          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Available now</h2>
              <span className="all-courses-section__count">{tools.length} tools</span>
            </div>
            <div className="all-courses-grid">
              {tools.map(tool => (
                <Link key={tool.href} href={tool.href} className="course-card">
                  <div className="course-card__top">
                    <div className="course-card__emoji">{tool.emoji}</div>
                    <div className="course-card__tags">
                      <span className="course-tag">{tool.tag}</span>
                      {tool.badge && (
                        <span className="course-card__badge">{tool.badge}</span>
                      )}
                    </div>
                  </div>
                  <div className="course-card__title">{tool.title}</div>
                  <p className="course-card__body">{tool.body}</p>
                  <div className="course-card__footer">
                    <span className="tool-free-badge" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                      Free · No account needed
                    </span>
                    <span className="course-card__arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Coming soon ── */}
          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Coming soon</h2>
              <span className="all-courses-section__count">{comingSoon.length} tool</span>
            </div>
            <div className="all-courses-grid">
              {comingSoon.map(tool => (
                <div key={tool.title} className="course-card course-card--soon">
                  <div className="course-card__top">
                    <div className="course-card__emoji">{tool.emoji}</div>
                    <div className="course-card__tags">
                      <span className="course-tag">{tool.tag}</span>
                      <span className="course-card__soon-badge">Coming soon</span>
                    </div>
                  </div>
                  <div className="course-card__title">{tool.title}</div>
                  <p className="course-card__body">{tool.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="all-courses-cta">
            <div className="all-courses-cta__inner">
              <div>
                <h3 className="all-courses-cta__headline">Tools are just the start</h3>
                <p className="all-courses-cta__sub">
                  Create a free account to unlock all courses, save your progress, and get the knowledge to act on what the tools show you.
                </p>
              </div>
              <div className="all-courses-cta__actions">
                <Link href="/start-learning" className="btn btn--white btn--lg">
                  Start learning free
                </Link>
                <Link href="/login" className="btn btn--ghost-white btn--lg">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
