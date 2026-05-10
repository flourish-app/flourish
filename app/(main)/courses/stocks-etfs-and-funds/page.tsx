import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stocks, ETFs & Funds - Flourish',
  description: 'Learn the difference between stocks, index funds and ETFs, how to assess costs, and how to build a simple low-cost portfolio. Free for UK students.',
}

const lessons = [
  { num: 1,  title: 'What is a stock? Owning a piece of a company',              duration: '6 min',  free: true  },
  { num: 2,  title: 'How stock markets work — buyers, sellers and prices',         duration: '8 min',  free: false },
  { num: 3,  title: 'What is a fund? Pooling money to spread risk',               duration: '7 min',  free: false },
  { num: 4,  title: 'Index funds — the simple, low-cost approach',                duration: '9 min',  free: false },
  { num: 5,  title: 'ETFs explained — funds you can trade like stocks',            duration: '8 min',  free: false },
  { num: 6,  title: 'Active vs passive investing — what the evidence says',        duration: '11 min', free: false },
  { num: 7,  title: 'Diversification — why spreading your bets matters',           duration: '8 min',  free: false },
  { num: 8,  title: 'How to read a fund factsheet — what to actually look for',   duration: '10 min', free: false },
  { num: 9,  title: 'Costs and fees — the silent killer of long-term returns',    duration: '9 min',  free: false },
  { num: 10, title: 'Building your first simple portfolio',                        duration: '14 min', free: false },
]

const outcomes = [
  'Understand what a stock is and how stock markets actually work',
  'Know the difference between stocks, funds, index funds and ETFs',
  'Understand active vs passive investing — and what decades of evidence shows',
  'Know how to assess a fund\'s costs and what numbers to look for',
  'Understand diversification and why it reduces your risk',
  'Be ready to build a simple, low-cost portfolio that suits your situation',
]

const faqs = [
  {
    q: 'Should I buy individual stocks or funds?',
    a: 'For most beginners, funds — especially index funds — are the smarter starting point. Picking individual stocks requires significant research and carries more risk. This course walks you through the evidence on both approaches so you can decide for yourself.',
  },
  {
    q: 'What\'s the difference between an ETF and an index fund?',
    a: 'They\'re closely related — most index funds are available as ETFs. The main difference is how you buy them: ETFs trade on the stock market like shares, while index funds are typically bought directly from a fund provider. Lesson 5 covers this in full.',
  },
  {
    q: 'Do I need to have completed "Investing from Scratch" first?',
    a: 'It\'s strongly recommended. This course is pitched at intermediate level and assumes you already understand basic concepts like risk, return and compound interest. If those terms are unfamiliar, start with Investing from Scratch first.',
  },
  {
    q: 'How do I actually choose which fund to invest in?',
    a: 'Lesson 8 and 9 cover exactly this — how to read a fund factsheet, what the key metrics mean, and how to compare costs. By the end of the course you\'ll know what to look for.',
  },
]

export default function StocksEtfsAndFundsPage() {
  return (
    <div className="course-page">

      {/* ── Hero ── */}
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag">Intermediate</span>
                <span className="course-meta-item">📚 10 lessons</span>
                <span className="course-meta-item">⏱ ~3 hrs</span>
                <span className="course-meta-item">📈 Some basics helpful</span>
              </div>

              <h1 className="course-hero__headline">Stocks, ETFs &amp; Funds</h1>
              <p className="course-hero__sub">
                Most people have heard of stocks and funds but couldn&apos;t tell you the difference. This course changes that — covering everything from how markets actually work to building your first real portfolio.
              </p>

              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
                <span className="course-badge course-badge--grey">Recommends: Investing from Scratch</span>
              </div>

              {/* Prerequisite notice */}
              <div className="course-prereq">
                <span className="course-prereq__icon">💡</span>
                <p>
                  New to investing? We recommend starting with{' '}
                  <Link href="/courses/investing-from-scratch">Investing from Scratch</Link>{' '}
                  before this course.
                </p>
              </div>
            </div>

            {/* Sign-up card */}
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">📊</div>
              <div className="course-signup-card__progress">
                <div className="course-signup-card__progress-label">
                  <span>Your progress</span>
                  <span>0 / 10 lessons</span>
                </div>
                <div className="course-signup-card__progress-bar">
                  <div className="course-signup-card__progress-fill" />
                </div>
              </div>
              <Link href="/start-learning" className="btn btn--primary btn--lg course-signup-card__cta">
                Start this course free
              </Link>
              <Link href="/login" className="course-signup-card__login">
                Already have an account? Sign in
              </Link>
              <ul className="course-signup-card__perks">
                <li>✓ Free — no card required</li>
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
                    icon: '🎓',
                    title: 'Post-beginner investors',
                    body: 'You understand the basics — compound interest, risk, ISAs — and are ready to go deeper into the actual investment vehicles available to you.',
                  },
                  {
                    icon: '🏦',
                    title: 'ISA holders unsure what to buy',
                    body: 'You\'ve opened a Stocks & Shares ISA but don\'t know what to actually put inside it. This course answers exactly that question.',
                  },
                  {
                    icon: '📰',
                    title: 'Curious about the news',
                    body: 'You hear terms like "the FTSE 100 fell today" or "index fund" and want to actually understand what they mean — not just nod along.',
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
              <p className="course-section__sub">
                Lesson 1 is free to preview. Create a free account to unlock all 10 lessons.
              </p>
              <div className="course-curriculum">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.num}
                    className={`course-lesson${lesson.free ? ' course-lesson--free' : ' course-lesson--locked'}`}
                  >
                    <div className="course-lesson__num">{lesson.num}</div>
                    <div className="course-lesson__info">
                      <div className="course-lesson__title">{lesson.title}</div>
                      <div className="course-lesson__duration">{lesson.duration} read</div>
                    </div>
                    <div className="course-lesson__status">
                      {lesson.free
                        ? <span className="course-lesson__preview">Preview</span>
                        : <span className="course-lesson__lock">🔒</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline CTA */}
            <div className="course-cta-block">
              <div className="course-cta-block__inner">
                <div className="course-cta-block__left">
                  <h3 className="course-cta-block__headline">
                    Stop guessing what stocks and funds actually are.
                  </h3>
                  <p className="course-cta-block__sub">
                    Ten lessons. Three hours. A genuine understanding of the building blocks of investing — free, and at your own pace.
                  </p>
                </div>
                <div className="course-cta-block__actions">
                  <Link href="/start-learning" className="btn btn--primary btn--lg">
                    Start learning free
                  </Link>
                  <Link href="/login" className="btn btn--outline btn--lg">
                    Sign in
                  </Link>
                </div>
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
              <h2 className="course-section__title">Related courses</h2>
              <div className="course-related">
                <Link href="/courses/investing-from-scratch" className="course-related-card">
                  <div className="course-related-card__emoji">🚀</div>
                  <div>
                    <div className="course-related-card__tag">Beginner · 8 lessons · Prerequisite</div>
                    <div className="course-related-card__title">Investing from Scratch</div>
                    <p className="course-related-card__body">New to investing? Start here before this course — covers the core concepts you&apos;ll need.</p>
                  </div>
                  <div className="course-related-card__arrow">→</div>
                </Link>
                <Link href="/courses/isas-and-tax-free-saving" className="course-related-card">
                  <div className="course-related-card__emoji">🏦</div>
                  <div>
                    <div className="course-related-card__tag">Essentials · 6 lessons</div>
                    <div className="course-related-card__title">ISAs &amp; Tax-Free Saving</div>
                    <p className="course-related-card__body">Know what to buy — now learn the best tax-efficient wrapper to put it in.</p>
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
