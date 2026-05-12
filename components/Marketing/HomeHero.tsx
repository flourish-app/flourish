import Link from 'next/link'
import { StartLearningCTA } from '@/components/StartLearningCTA'

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Built for UK students
          </div>
          <h1 className="hero__headline">
            Investing skills <em>schools</em> forgot to teach you
          </h1>
          <p className="hero__sub">
            Learn ISAs, ETFs, index funds and more through bite-sized lessons, live simulations and real tools - completely free.
          </p>
          <div className="hero__cta">
            <StartLearningCTA className="btn btn--primary btn--lg" />
            <a href="#learn" className="btn btn--outline btn--lg">Browse courses</a>
          </div>
          <p className="hero__disclaimer">
            <strong>For education only.</strong> No real money involved. Simulated portfolios are for learning purposes.
          </p>
        </div>

        <div className="hero__phone-wrap">
          <div className="hero__phone">
            <div className="hero__phone-notch" />
            <div className="hero__phone-screen">
              <div className="phone__status">
                <span>9:41</span>
                <span>●●● WiFi ■■■</span>
              </div>
              <div className="phone__greeting">Good morning, Alex 👋</div>
              <div className="phone__title">Your learning path</div>
              <div className="phone__progress-label">
                <span>Module 3 of 8</span>
                <span>35% complete</span>
              </div>
              <div className="phone__progress-bar">
                <div className="phone__progress-fill" />
              </div>
              <div className="phone__cards">
                <div className="phone__card">
                  <div className="phone__card-icon phone__card-icon--green">📈</div>
                  <div>
                    <div className="phone__card-text">What is a Stocks &amp; Shares ISA?</div>
                    <div className="phone__card-sub">5 min read · Beginner</div>
                  </div>
                  <div className="phone__card-badge">Next up</div>
                </div>
                <div className="phone__card">
                  <div className="phone__card-icon phone__card-icon--blue">🏦</div>
                  <div>
                    <div className="phone__card-text">Index funds explained</div>
                    <div className="phone__card-sub">8 min read · Beginner</div>
                  </div>
                  <div className="phone__card-badge phone__card-badge--grey">Locked</div>
                </div>
                <div className="phone__card">
                  <div className="phone__card-icon phone__card-icon--amber">🎯</div>
                  <div>
                    <div className="phone__card-text">Build your first portfolio</div>
                    <div className="phone__card-sub">Interactive · 10 min</div>
                  </div>
                  <div className="phone__card-badge phone__card-badge--grey">Locked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
