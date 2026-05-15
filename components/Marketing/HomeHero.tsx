import Image from 'next/image'
import { StartLearningCTA } from '@/components/StartLearningCTA'

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="hero__layout">

        {/* Left column — desktop only */}
        <div className="hero__left">
          <div className="hero__portfolio-card">
            <div className="hero__portfolio-label">Portfolio value</div>
            <div className="hero__portfolio-value">£9,995.10</div>
            <div className="hero__portfolio-change">▲ £13.27 (0.13%) today</div>
            <div className="hero__portfolio-chart">
              <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2e7d5e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2e7d5e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 52 L25 46 L50 38 L70 32 L90 24 L110 18 L130 12 L155 7 L175 4 L200 2" stroke="#2e7d5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M0 52 L25 46 L50 38 L70 32 L90 24 L110 18 L130 12 L155 7 L175 4 L200 2 L200 60 L0 60 Z" fill="url(#sparkGrad)" />
              </svg>
            </div>
            <div className="hero__portfolio-tabs">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((t) => (
                <span key={t} className={`hero__portfolio-tab${t === '1M' ? ' hero__portfolio-tab--active' : ''}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="hero__float-card">
            <div className="hero__float-icon">🎓</div>
            <div>
              <div className="hero__float-title">Bite-sized lessons</div>
              <div className="hero__float-sub">Easy to follow, anywhere</div>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Built for UK students
          </div>
          <h1 className="hero__headline">
            Investing skills <em>schools</em> forgot to teach you
          </h1>
          <p className="hero__sub">
            Learn ISAs, ETFs, index funds and more through bite-sized lessons, live simulations and real tools – completely free.
          </p>
          <div className="hero__cta">
            <StartLearningCTA className="btn btn--primary btn--lg" />
            <a href="#learn" className="btn btn--outline btn--lg">Browse courses</a>
          </div>
          <div className="hero__social-proof">
            <div className="hero__avatars">
              <span className="hero__avatar hero__avatar--1">JM</span>
              <span className="hero__avatar hero__avatar--2">SR</span>
              <span className="hero__avatar hero__avatar--3">AL</span>
            </div>
            <div className="hero__stars">★★★★★</div>
            <p className="hero__proof-text">Join 3,000+ students building their financial future</p>
          </div>
        </div>

        {/* Right column — phone + float cards */}
        <div className="hero__right">
          <div className="hero__float-card hero__right-float">
            <div className="hero__float-dot" />
            <div>
              <div className="hero__float-title">Live market data</div>
              <div className="hero__float-sub">Real-time prices</div>
            </div>
          </div>

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

          <div className="hero__float-card hero__right-float">
            <div className="hero__float-icon">📊</div>
            <div>
              <div className="hero__float-title">Practice with confidence</div>
              <div className="hero__float-sub">Simulated, not real money</div>
            </div>
          </div>
        </div>

      </div>

      <Image src="/squiggle-line.png" width={170} height={170} className="hero__squiggle hero__squiggle--left" alt="" aria-hidden="true" />
      <Image src="/squiggle-line.png" width={170} height={170} className="hero__squiggle hero__squiggle--right" alt="" aria-hidden="true" />

      {/* Trust strip */}
      <div className="hero__trust">
        <div className="hero__trust-inner">
          <div className="hero__trust-item">
            <div className="hero__trust-icon">🎓</div>
            <div>
              <div className="hero__trust-title">100% Free</div>
              <div className="hero__trust-sub">No paywalls</div>
            </div>
          </div>
          <div className="hero__trust-item">
            <div className="hero__trust-icon">🛡️</div>
            <div>
              <div className="hero__trust-title">Risk-free</div>
              <div className="hero__trust-sub">Practice first</div>
            </div>
          </div>
          <div className="hero__trust-item">
            <div className="hero__trust-icon">✓</div>
            <div>
              <div className="hero__trust-title">Student focused</div>
              <div className="hero__trust-sub">Built for the UK</div>
            </div>
          </div>
          <div className="hero__trust-item">
            <div className="hero__trust-icon">📈</div>
            <div>
              <div className="hero__trust-title">Learn by doing</div>
              <div className="hero__trust-sub">Tools + real world</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
