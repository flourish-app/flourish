import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import CtaBanner from '@/components/Marketing/CtaBanner'

export const metadata: Metadata = {
  title: 'Plans — Flourish',
  description: 'Start free with full access to courses and tools. Upgrade to Pro when you\'re ready to go further.',
}

const FREE_FEATURES = [
  'All beginner and intermediate courses',
  'Stock market simulator with £10,000 virtual cash',
  'Compound interest, ISA, and LISA calculators',
  'Progress tracking across every lesson',
  'New free content as it launches',
]

const PRO_FEATURES = [
  'Advanced investing courses',
  'Offline lesson downloads',
  'Priority access to new tools',
  'Ad-free experience',
  'Early access to upcoming features',
  'Direct support from the Flourish team',
]

export default function PlansPage() {
  return (
    <>
      <ScrollAnimations />

      <section className="plans-hero">
        <div className="container">
          <div className="section-tag fade-up">Pricing</div>
          <h1 className="plans-hero__headline fade-up">
            Start free. <em>Grow</em> at your pace.
          </h1>
          <p className="plans-hero__sub fade-up">
            Every plan includes the simulator, calculators, and core courses.
            Pro unlocks everything we&apos;re building for serious learners.
          </p>
        </div>
      </section>

      <section className="plans-section">
        <div className="container">
          <div className="plans-grid fade-up">

            {/* Free */}
            <div className="plan-card plan-card--free">
              <div className="plan-card__header">
                <span className="plan-card__badge plan-card__badge--neutral">Free forever</span>
                <h2 className="plan-card__name">Free</h2>
                <p className="plan-card__desc">
                  No card, no commitment. Everything you need to go from zero to your
                  first confident trade.
                </p>
              </div>
              <div className="plan-card__pricing">
                <div className="plan-card__price-row">
                  <span className="plan-card__price-num">£0</span>
                  <span className="plan-card__price-period">always</span>
                </div>
              </div>
              <Link href="/start-learning" className="btn btn--outline plan-card__cta">
                Get started free
              </Link>
              <div className="plan-card__divider" />
              <p className="plan-card__features-label">What&apos;s included</p>
              <ul className="plan-card__list">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="plan-card__item">
                    <span className="plan-card__check" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Monthly — featured */}
            <div className="plan-card plan-card--monthly">
              <div className="plan-card__header">
                <span className="plan-card__badge plan-card__badge--featured">Most popular</span>
                <h2 className="plan-card__name plan-card__name--light">Flourish Pro</h2>
                <p className="plan-card__desc plan-card__desc--light">
                  For students ready to go further. The full toolkit with nothing
                  held back, month by month.
                </p>
              </div>
              <div className="plan-card__pricing">
                <div className="plan-card__price-row">
                  <span className="plan-card__price-num plan-card__price-num--green">£4.49</span>
                  <span className="plan-card__price-period plan-card__price-period--light">/month</span>
                </div>
              </div>
              <Link href="/start-learning" className="btn btn--green btn--lg plan-card__cta">
                Start Pro now
              </Link>
              <p className="plan-card__billing-note">Plan renews automatically for £4.49/month at the end of the 7-day trial period. Cancel any time.</p>
              <div className="plan-card__divider plan-card__divider--dark" />
              <p className="plan-card__features-label plan-card__features-label--light">Everything in Free, plus</p>
              <ul className="plan-card__list">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="plan-card__item plan-card__item--light">
                    <span className="plan-card__check plan-card__check--green-dark" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Annual */}
            <div className="plan-card plan-card--annual">
              <div className="plan-card__header">
                <span className="plan-card__badge plan-card__badge--pro">Save 26% annually</span>
                <h2 className="plan-card__name">Flourish Pro</h2>
                <p className="plan-card__desc">
                  Lock in a full year and save. The same Pro experience with
                  the commitment that compounds.
                </p>
              </div>
              <div className="plan-card__pricing">
                <div className="plan-card__price-row">
                  <span className="plan-card__price-num">£39.99</span>
                  <span className="plan-card__price-period">/year</span>
                </div>
                <p className="plan-card__equiv">Roughly £3.33/month, billed once. Plan renews automatically for £39.99/year at the end of the 7-day trial period.</p>
              </div>
              <Link href="/start-learning" className="btn btn--primary plan-card__cta">
                Start annual
              </Link>
              <div className="plan-card__divider" />
              <p className="plan-card__features-label">Everything in Free, plus</p>
              <ul className="plan-card__list">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="plan-card__item">
                    <span className="plan-card__check plan-card__check--green" aria-hidden="true" />
                    {f}
                  </li>
                ))}
                <li className="plan-card__item">
                  <span className="plan-card__check plan-card__check--green" aria-hidden="true" />
                  Biggest saving across any plan
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <CtaBanner
        headline="Not sure yet? Start free today"
        sub="You can upgrade to Pro any time. The free plan never expires."
      >
        <Link href="/start-learning" className="btn btn--white btn--lg">Get started free</Link>
        <Link href="/courses" className="btn btn--ghost-white btn--lg">Browse courses</Link>
      </CtaBanner>
    </>
  )
}
