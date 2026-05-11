import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Investing from Scratch — Flourish',
}

const lessons = [
  { num: 1,  title: 'What is investing — and what it isn\'t',                        duration: '5 min'  },
  { num: 2,  title: 'Why your money loses value sitting still',                        duration: '7 min'  },
  { num: 3,  title: 'Risk and return — the relationship that drives everything',       duration: '8 min'  },
  { num: 4,  title: 'Compound interest — and why starting early changes everything',   duration: '10 min' },
  { num: 5,  title: 'Saving vs investing — when to do which',                         duration: '6 min'  },
  { num: 6,  title: 'Stocks, bonds, funds and ETFs — what they actually are',          duration: '12 min' },
  { num: 7,  title: 'How to think about your first investment',                        duration: '9 min'  },
  { num: 8,  title: 'Your next steps — getting started in the UK',                    duration: '8 min'  },
]

const outcomes = [
  'Understand what investing actually is — in plain, jargon-free English',
  'Know why inflation means saving alone is not enough',
  'Understand the link between risk and return, and what it means for you',
  'See exactly how compound interest grows wealth over time',
  'Know the difference between stocks, bonds, funds and ETFs',
  'Feel genuinely ready to take your first real investing step',
]

const faqs = [
  {
    q: 'Do I need money to start this course?',
    a: 'No — this is an education course, not a platform to invest real money. You\'ll learn everything you need before you spend a single penny.',
  },
  {
    q: 'I failed maths at school. Is this going to go over my head?',
    a: 'Absolutely not. This course uses plain English throughout. The only number that matters is compound interest, and we explain it with real examples — not formulas.',
  },
  {
    q: 'How much money do I actually need to start investing?',
    a: 'Some UK platforms let you start with as little as £1. This course will help you understand what\'s right for your situation before you put any money in.',
  },
  {
    q: 'Is this course specific to the UK?',
    a: 'Yes. All examples, products, platforms and tax rules covered are UK-specific. We focus on ISAs, UK brokers and the UK market.',
  },
]

export default function InvestingFromScratchDashboardPage() {
  return (
    <div className="course-page">

      {/* ── Hero ── */}
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag course-tag--featured">Most popular</span>
                <span className="course-meta-item">📚 8 lessons</span>
                <span className="course-meta-item">⏱ ~2 hrs</span>
                <span className="course-meta-item">🎯 Beginner</span>
              </div>

              <h1 className="course-hero__headline">Investing from Scratch</h1>
              <p className="course-hero__sub">
                You don&apos;t need to understand finance to start this course. That&apos;s the whole point. We go from &quot;what even is investing?&quot; to &quot;I&apos;m ready to start&quot; — in eight short lessons.
              </p>

              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">Zero prior knowledge needed</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
              </div>
            </div>

            {/* Progress card */}
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">🚀</div>
              <div className="course-signup-card__progress">
                <div className="course-signup-card__progress-label">
                  <span>Your progress</span>
                  <span>0 / 8 lessons</span>
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
                  {
                    icon: '🧩',
                    title: 'Complete beginners',
                    body: 'You\'ve heard words like "stocks" and "ISA" but have no idea what they mean. This course is literally designed for you — no assumptions, no jargon.',
                  },
                  {
                    icon: '💰',
                    title: 'Students with savings',
                    body: 'You\'ve got money sitting in a current account and a vague sense that you should be doing something smarter with it. This course shows you what.',
                  },
                  {
                    icon: '⏰',
                    title: 'People who keep putting it off',
                    body: '"I\'ll sort my finances when I\'m older." Sound familiar? This course will show you exactly how much that delay costs — and make it easy to start today.',
                  },
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
              <p className="course-section__sub">8 lessons · all unlocked</p>
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

            {/* FAQ */}
            <div className="course-section">
              <h2 className="course-section__title">Common questions</h2>
              <div className="course-faq">
                {faqs.map((faq) => (
                  <div className="course-faq__item" key={faq.q}>
                    <div className="course-faq__q">{faq.q}</div>
                    <p className="course-faq__a">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related courses */}
            <div className="course-section">
              <h2 className="course-section__title">Up next after this course</h2>
              <div className="course-related">
                <Link href="/dashboard/courses/isas-and-tax-free-saving" className="course-related-card">
                  <div className="course-related-card__emoji">🏦</div>
                  <div>
                    <div className="course-related-card__tag">Essentials · 6 lessons</div>
                    <div className="course-related-card__title">ISAs &amp; Tax-Free Saving</div>
                    <p className="course-related-card__body">Put your knowledge to work — learn how to invest tax-free using your £20,000 annual allowance.</p>
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
