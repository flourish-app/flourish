import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'How it works - Flourish',
  description: 'Learn how Flourish helps UK students go from zero financial knowledge to confident investors - through short lessons, real tools, and risk-free practice.',
}

export default function HowItWorks() {
  return (
    <>
      <ScrollAnimations />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-tag fade-up">The Flourish approach</div>
          <h1 className="page-hero__headline fade-up">
            Finance that finally <em>makes sense</em>
          </h1>
          <p className="page-hero__sub fade-up">
            Not another boring course. Not another app that assumes you already know what you&apos;re doing. Just honest, clear education - built for students in the UK, from the ground up.
          </p>
          <div className="page-hero__cta fade-up">
            <Link href="/start-learning" className="btn btn--primary btn--lg">Start learning free</Link>
            <a href="#journey" className="btn btn--outline btn--lg">See the journey</a>
          </div>
        </div>
      </section>

      {/* The gap */}
      <section className="gap-section">
        <div className="container">
          <div className="gap-section__inner">
            <div className="gap-section__stat fade-up">
              <div className="gap-section__stat-num"><span>73</span>%</div>
              <div className="gap-section__stat-label">of UK adults received no financial education at school whatsoever</div>
            </div>
            <div className="fade-up">
              <div className="section-tag">The problem</div>
              <h2 className="section-headline">The system left you out</h2>
              <p className="section-sub" style={{ marginBottom: '32px' }}>
                Financial education isn&apos;t in the national curriculum. Most young people reach adulthood with no idea how savings accounts work, let alone investing. That&apos;s not a personal failing - it&apos;s a gap in the system.
              </p>
              <div className="gap-section__points">
                {[
                  { icon: '🏫', title: "Schools don't cover it", body: "Personal finance is absent from most UK school curricula. You might leave with A-levels in economics and still not know what an ISA is." },
                  { icon: '📰', title: "Existing content isn't built for you", body: "Most finance content is aimed at people who already have disposable income and a basic understanding. It skips the fundamentals and talks down to beginners." },
                  { icon: '⏰', title: "Every year you wait is costly", body: "Compound interest means time is your biggest financial asset. A student who starts at 20 needs to invest far less than someone who starts at 30 to reach the same outcome." },
                ].map((p) => (
                  <div className="gap-point" key={p.title}>
                    <div className="gap-point__icon">{p.icon}</div>
                    <div>
                      <div className="gap-point__title">{p.title}</div>
                      <p className="gap-point__body">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barriers */}
      <section className="barriers">
        <div className="container">
          <div className="section-tag fade-up">Why it works</div>
          <h2 className="section-headline fade-up">We know what&apos;s holding you back</h2>
          <p className="section-sub fade-up">
            Every lesson and tool on Flourish is designed around the real reasons students avoid finance - not the reasons textbooks assume.
          </p>
          <div className="barriers__grid">
            <div className="barrier-card fade-up">
              <div className="barrier-card__thought">&quot;This stuff always goes over my head&quot;</div>
              <div className="barrier-card__icon">🧩</div>
              <div className="barrier-card__title">10-minute lessons that actually land</div>
              <p className="barrier-card__body">No textbooks. No hour-long lectures. Each lesson is short, plain-English, and designed so you leave actually understanding something - not just feeling like you should.</p>
            </div>
            <div className="barrier-card fade-up">
              <div className="barrier-card__thought">&quot;What if I make the wrong decision?&quot;</div>
              <div className="barrier-card__icon">🛡️</div>
              <div className="barrier-card__title">Make every mistake before it matters</div>
              <p className="barrier-card__body">Practice with a virtual £10,000 in real markets before you touch a penny of your own. There&apos;s nothing to lose here - and that freedom is exactly what makes learning stick.</p>
            </div>
            <div className="barrier-card fade-up">
              <div className="barrier-card__thought">&quot;I&apos;ll sort my finances when I&apos;m older&quot;</div>
              <div className="barrier-card__icon">⏳</div>
              <div className="barrier-card__title">Starting now beats starting big later</div>
              <p className="barrier-card__body">£20 a month from age 20 is worth more than £200 a month from age 35. Flourish makes it easy to start small, today - because waiting is the only real mistake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="journey" id="journey">
        <div className="container">
          <div className="section-tag fade-up">Your path</div>
          <h2 className="section-headline fade-up">From zero to confident investor</h2>
          <p className="section-sub fade-up">
            Flourish moves you through four phases - each one building on the last. There&apos;s no rush, no deadlines, and no pressure. Just progress at your own pace.
          </p>
          <div className="journey__phases">
            {[
              {
                num: '1', cls: 'journey__phase-num--1', tag: 'Phase one', title: 'Understand the basics',
                body: "Start from zero - no assumptions, no jargon. You'll learn what money actually does when it sits in different places, why inflation quietly erodes savings, and what investing actually means in plain terms.",
                items: ['What is investing, and why does it matter?', 'Savings accounts vs. investing - the real difference', 'Risk, return, and why they\'re linked', 'How compound interest works (and why it changes everything)'],
              },
              {
                num: '2', cls: 'journey__phase-num--2', tag: 'Phase two', title: "Learn what's available to you",
                body: "The UK has some of the best tax-free investing wrappers in the world - and most students have never heard of them. You'll learn exactly what's available, how to use it, and why it matters for someone your age.",
                items: ['Stocks & Shares ISA - your £20,000 annual tax-free allowance', 'Lifetime ISA - the 25% government bonus for first-time buyers', 'ETFs and index funds - the smart, low-cost way to invest', 'How to choose a platform as a UK student'],
              },
              {
                num: '3', cls: 'journey__phase-num--3', tag: 'Phase three', title: 'Practice with no pressure',
                body: "Before you touch real money, build and manage a virtual portfolio using live market data. Buy stocks, hold ETFs, watch your decisions play out - and understand why they did, without any real consequence.",
                items: ['Virtual £10,000 to invest however you choose', 'Live market prices from UK and global exchanges', 'Weekly challenges to test specific skills', 'Performance tracking against the FTSE 100'],
              },
              {
                num: '4', cls: 'journey__phase-num--4', tag: 'Phase four', title: 'Invest for real, with confidence',
                body: "When you're ready, we'll point you to the best FCA-regulated platforms for UK students - with honest, unbiased guidance on which suits your situation. No affiliate bias. No hidden agenda. Just the facts.",
                items: ['Honest comparison of student-friendly UK platforms', 'Step-by-step guide to opening your first ISA', 'How to invest your first £100 (or £10)', 'Ongoing learning as markets and products evolve'],
              },
            ].map((phase) => (
              <div className="journey__phase fade-up" key={phase.num}>
                <div className="journey__phase-left">
                  <div className={`journey__phase-num ${phase.cls}`}>{phase.num}</div>
                  <div className="journey__phase-line" />
                </div>
                <div className="journey__phase-content">
                  <div className="journey__phase-tag">{phase.tag}</div>
                  <div className="journey__phase-title">{phase.title}</div>
                  <p className="journey__phase-body">{phase.body}</p>
                  <div className="journey__phase-items">
                    {phase.items.map((item) => (
                      <div className="journey__phase-item" key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-tag fade-up">FAQ</div>
          <h2 className="section-headline fade-up">Questions we get asked a lot</h2>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__headline fade-up">Ready to actually learn this?</h2>
          <p className="cta-banner__sub fade-up">Free, no sign-up required to start. Just pick a course and go.</p>
          <div className="cta-banner__actions fade-up">
            <Link href="/start-learning" className="btn btn--white btn--lg">Start learning free</Link>
            <a href="/" className="btn btn--ghost-white btn--lg">Back to home</a>
          </div>
        </div>
      </section>
    </>
  )
}
