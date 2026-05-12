import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations      from '@/components/ScrollAnimations'
import FaqAccordion          from '@/components/FaqAccordion'
import HowItWorksGap         from '@/components/Marketing/HowItWorksGap'
import HowItWorksBarriers    from '@/components/Marketing/HowItWorksBarriers'
import HowItWorksJourney     from '@/components/Marketing/HowItWorksJourney'
import CtaBanner             from '@/components/Marketing/CtaBanner'

export const metadata: Metadata = {
  title: 'How it works - Flourish',
  description: 'Learn how Flourish helps UK students go from zero financial knowledge to confident investors - through short lessons, real tools, and risk-free practice.',
}

export default function HowItWorks() {
  return (
    <>
      <ScrollAnimations />

      <section className="page-hero">
        <div className="container">
          <div className="section-tag fade-up">The Flourish approach</div>
          <h1 className="page-hero__headline fade-up">Finance that finally <em>makes sense</em></h1>
          <p className="page-hero__sub fade-up">
            Not another boring course. Not another app that assumes you already know what you&apos;re doing. Just honest, clear education - built for students in the UK, from the ground up.
          </p>
          <div className="page-hero__cta fade-up">
            <Link href="/start-learning" className="btn btn--primary btn--lg">Start learning free</Link>
            <a href="#journey" className="btn btn--outline btn--lg">See the journey</a>
          </div>
        </div>
      </section>

      <HowItWorksGap />
      <HowItWorksBarriers />
      <HowItWorksJourney />

      <section className="faq">
        <div className="container">
          <div className="section-tag fade-up">FAQ</div>
          <h2 className="section-headline fade-up">Questions we get asked a lot</h2>
          <FaqAccordion />
        </div>
      </section>

      <CtaBanner
        headline="Ready to actually learn this?"
        sub="Free, no sign-up required to start. Just pick a course and go."
      >
        <Link href="/start-learning" className="btn btn--white btn--lg">Start learning free</Link>
        <a href="/" className="btn btn--ghost-white btn--lg">Back to home</a>
      </CtaBanner>
    </>
  )
}
