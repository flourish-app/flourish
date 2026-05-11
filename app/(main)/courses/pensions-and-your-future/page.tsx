import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pensions & Your Future - Flourish',
  description: 'Why pensions matter at 19, how auto-enrolment works, what a SIPP is, and how much you actually need to retire. Free for UK students.',
}

const lessons = [
  { num: 1, title: 'Why pensions matter even at 19',                                duration: '8 min',  free: true  },
  { num: 2, title: 'Workplace pensions and auto-enrolment — the free money explained', duration: '12 min', free: false },
  { num: 3, title: 'What is a SIPP? Taking control of your own pension',            duration: '11 min', free: false },
  { num: 4, title: 'The Lifetime ISA — a pension alternative for first-time buyers', duration: '9 min',  free: false },
  { num: 5, title: 'How much do you actually need to retire?',                       duration: '14 min', free: false },
]

const outcomes = [
  'Understand what a pension actually is and how it grows tax-free over time',
  'See exactly why starting at 20 beats starting at 35 — in real numbers',
  'Know how workplace auto-enrolment works and why it\'s free money you shouldn\'t leave behind',
  'Understand what a SIPP is and when it might be the right choice for you',
  'Know whether a Lifetime ISA could work alongside or instead of a pension',
  'Have a realistic, grounded idea of how much you\'ll need to retire comfortably',
]

const faqs = [
  {
    q: 'I\'m a student — do I really need to think about this now?',
    a: 'Yes — and this course will show you exactly why. A student who puts £50/month into a pension from age 20 will retire with significantly more than someone who puts in £500/month starting at 40. Time is the variable that matters most, and you have more of it than anyone.',
  },
  {
    q: 'What is auto-enrolment and does it apply to me?',
    a: 'Auto-enrolment is a UK law that requires employers to automatically enrol eligible workers into a workplace pension. If you\'re 22 or over, earning more than £10,000/year, and working in the UK, your employer must contribute too. That\'s free money — Lesson 2 covers it in full.',
  },
  {
    q: 'Can I have an ISA and a pension at the same time?',
    a: 'Absolutely — and for most young people, doing both is the smart approach. ISAs are flexible and accessible at any age. Pensions are locked in until retirement but come with tax relief. Lesson 4 explains how to think about balancing the two.',
  },
  {
    q: 'What\'s the difference between a workplace pension and a SIPP?',
    a: 'A workplace pension is set up by your employer and they contribute alongside you. A SIPP (Self-Invested Personal Pension) is one you open yourself — more control, more investment choices, but no employer contributions. Lesson 3 covers when each makes sense.',
  },
]

const statCards = [
  { num: '£', big: '240k', label: 'extra retirement pot from starting at 20 vs 30, investing just £100/month' },
  { num: '',  big: '8%',   label: 'of your salary your employer must contribute under auto-enrolment — on top of yours' },
  { num: '',  big: '25%',  label: 'tax relief on every pension contribution — the government tops up what you put in' },
]

export default function PensionsCoursePage() {
  return (
    <div className="course-page">

      {/* ── Hero ── */}
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag">Long-term</span>
                <span className="course-meta-item">📚 5 lessons</span>
                <span className="course-meta-item">⏱ ~55 mins</span>
                <span className="course-meta-item">🎯 All levels</span>
              </div>

              <h1 className="course-hero__headline">Pensions &amp; Your Future</h1>
              <p className="course-hero__sub">
                Pensions feel like something to think about at 40. They&apos;re not. Every year you delay is money you can never get back. This course explains why — and makes it simple to do something about it now.
              </p>

              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
                <span className="course-badge course-badge--grey">No prior knowledge needed</span>
              </div>
            </div>

            {/* Sign-up card */}
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">🔮</div>
              <div className="course-signup-card__progress">
                <div className="course-signup-card__progress-label">
                  <span>Your progress</span>
                  <span>0 / 5 lessons</span>
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

            {/* Impact stats */}
            <div className="course-section">
              <h2 className="course-section__title">The numbers that should get your attention</h2>
              <div className="course-stat-grid">
                {statCards.map((s) => (
                  <div className="course-stat-card" key={s.label}>
                    <div className="course-stat-card__num">
                      {s.num}<span>{s.big}</span>
                    </div>
                    <p className="course-stat-card__label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

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
                    title: 'Students approaching graduation',
                    body: 'You\'re about to start your first job. Before you opt out of auto-enrolment or ignore your workplace pension, take this course — it\'s an hour that could be worth hundreds of thousands.',
                  },
                  {
                    icon: '💼',
                    title: 'New to the workforce',
                    body: 'You\'ve just started working and your employer is asking about your pension. This course explains exactly what you\'re signing up for — and why you should stay enrolled.',
                  },
                  {
                    icon: '🤔',
                    title: 'Anyone who\'s been putting it off',
                    body: '"I\'ll think about retirement when I\'m older." This course is specifically for you. It will show you, in actual numbers, what that delay costs.',
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
                Lesson 1 is free to preview. Create a free account to unlock all 5 lessons.
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
                    An hour now could be worth £240,000 later.
                  </h3>
                  <p className="course-cta-block__sub">
                    That&apos;s not an exaggeration — it&apos;s compound interest. Five lessons, sixty minutes, and you&apos;ll understand your pension better than most adults twice your age.
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
                    <div className="course-related-card__tag">Beginner · 8 lessons</div>
                    <div className="course-related-card__title">Investing from Scratch</div>
                    <p className="course-related-card__body">New to investing? Start here — covers the foundational concepts that underpin everything in this course.</p>
                  </div>
                  <div className="course-related-card__arrow">→</div>
                </Link>
                <Link href="/courses/isas-and-tax-free-saving" className="course-related-card">
                  <div className="course-related-card__emoji">🏦</div>
                  <div>
                    <div className="course-related-card__tag">Essentials · 6 lessons</div>
                    <div className="course-related-card__title">ISAs &amp; Tax-Free Saving</div>
                    <p className="course-related-card__body">Learn how ISAs and the Lifetime ISA work alongside your pension for a complete tax-efficient strategy.</p>
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
