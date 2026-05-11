import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ISAs & Tax-Free Saving — Flourish',
}

const lessons = [
  { num: 1, title: 'What is an ISA and why does it matter?',              duration: '6 min'  },
  { num: 2, title: 'Cash ISA vs Stocks & Shares ISA',                     duration: '8 min'  },
  { num: 3, title: 'The Lifetime ISA — the 25% government bonus',          duration: '10 min' },
  { num: 4, title: 'Your £20,000 annual allowance explained',              duration: '7 min'  },
  { num: 5, title: 'How to choose the right ISA for your situation',       duration: '9 min'  },
  { num: 6, title: 'Opening your first ISA — a step-by-step walkthrough',  duration: '12 min' },
]

const outcomes = [
  'Understand what an ISA is and why it beats a standard savings account',
  'Know the difference between a Cash ISA, Stocks & Shares ISA, and Lifetime ISA',
  'Make the most of your £20,000 annual tax-free allowance',
  'Understand how the LISA government bonus works for first-time buyers',
  'Choose the right ISA for your age, income, and goals',
  'Open your first ISA with confidence on an FCA-regulated platform',
]

export default function IsasDashboardPage() {
  return (
    <div className="course-page">

      {/* ── Hero ── */}
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag">Essentials</span>
                <span className="course-meta-item">📚 6 lessons</span>
                <span className="course-meta-item">⏱ ~90 min</span>
                <span className="course-meta-item">🎯 Beginner</span>
              </div>

              <h1 className="course-hero__headline">ISAs &amp; Tax-Free Saving</h1>
              <p className="course-hero__sub">
                The UK gives every adult a £20,000 tax-free investing allowance every year. Most students have never heard of it. This course changes that — and shows you exactly how to use it.
              </p>

              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">No prior knowledge needed</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
              </div>
            </div>

            {/* Progress card */}
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">🏦</div>
              <div className="course-signup-card__progress">
                <div className="course-signup-card__progress-label">
                  <span>Your progress</span>
                  <span>0 / 6 lessons</span>
                </div>
                <div className="course-signup-card__progress-bar">
                  <div className="course-signup-card__progress-fill" />
                </div>
              </div>
              <button className="btn btn--primary btn--lg course-signup-card__cta">
                Start course
              </button>
              <ul className="course-signup-card__perks">
                <li>✓ All lessons unlocked</li>
                <li>✓ Learn at your own pace</li>
                <li>✓ Progress saved automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">
        <div className="course-body">
          <div className="course-body__main">

            {/* What you'll learn */}
            <div className="course-section">
              <h2 className="course-section__title">What you&apos;ll learn</h2>
              <ul className="course-outcomes">
                {outcomes.map((o) => (
                  <li key={o} className="course-outcome">
                    <span className="course-outcome__tick">✓</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div className="course-section">
              <h2 className="course-section__title">Who this is for</h2>
              <div className="course-for-grid">
                {[
                  { icon: '🎓', title: 'University students', body: 'You\'re earning or receiving a student loan and want to start putting money to work — even if it\'s just £20 a month.' },
                  { icon: '🏠', title: 'First-time buyers', body: 'You\'re saving for a property and want to understand the Lifetime ISA\'s 25% government bonus before you miss out.' },
                  { icon: '🧩', title: 'Complete beginners', body: 'You\'ve heard the word "ISA" but have no idea what it actually means. This course starts from absolute zero.' },
                ].map((c) => (
                  <div className="course-for-card" key={c.title}>
                    <div className="course-for-card__icon">{c.icon}</div>
                    <div className="course-for-card__title">{c.title}</div>
                    <p className="course-for-card__body">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="course-section">
              <h2 className="course-section__title">Course curriculum</h2>
              <p className="course-section__sub">6 lessons · all unlocked</p>
              <div className="course-curriculum">
                {lessons.map((lesson) => (
                  <div key={lesson.num} className="course-lesson course-lesson--free">
                    <div className="course-lesson__num">{lesson.num}</div>
                    <div className="course-lesson__info">
                      <div className="course-lesson__title">{lesson.title}</div>
                      <div className="course-lesson__duration">{lesson.duration} read</div>
                    </div>
                    <div className="course-lesson__status">
                      <span className="course-lesson__preview">Start</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related courses */}
            <div className="course-section">
              <h2 className="course-section__title">Related courses</h2>
              <div className="course-related">
                <Link href="/dashboard/courses/investing-from-scratch" className="course-related-card">
                  <div className="course-related-card__emoji">🚀</div>
                  <div>
                    <div className="course-related-card__tag">Beginner · 8 lessons</div>
                    <div className="course-related-card__title">Investing from Scratch</div>
                    <p className="course-related-card__body">New to investing? Start here before this course — covers the core concepts you&apos;ll need.</p>
                  </div>
                  <div className="course-related-card__arrow">→</div>
                </Link>
                <Link href="/dashboard/courses/stocks-etfs-and-funds" className="course-related-card">
                  <div className="course-related-card__emoji">📊</div>
                  <div>
                    <div className="course-related-card__tag">Intermediate · 10 lessons</div>
                    <div className="course-related-card__title">Stocks, ETFs &amp; Funds</div>
                    <p className="course-related-card__body">Know the tax wrapper — now learn what to put inside it.</p>
                  </div>
                  <div className="course-related-card__arrow">→</div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
