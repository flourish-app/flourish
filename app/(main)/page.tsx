import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import { StartLearningCTA } from '@/components/StartLearningCTA'

export default function Home() {
  return (
    <>
      <ScrollAnimations />

      {/* Hero */}
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

          {/* Phone mockup */}
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

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats__inner">
            <div className="fade-up">
              <div className="stat__num"><span>73</span>%</div>
              <div className="stat__label">of adults in the UK did not receive any form of financial education at school</div>
            </div>
            <div className="fade-up">
              <div className="stat__num">£<span>50k</span></div>
              <div className="stat__label">potential lifetime loss from starting investing just 10 years late</div>
            </div>
            <div className="fade-up">
              <div className="stat__num">£<span>0</span></div>
              <div className="stat__label">cost - completely free to access every lesson and tool</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-tag fade-up">Why it works</div>
          <h2 className="section-headline fade-up">
            You&apos;re not bad with money.<br />Nobody ever taught you.
          </h2>
          <p className="section-sub fade-up">
            Schools skip it. Most finance content talks down to you or assumes you already know the basics. Flourish starts from zero - no judgement, no jargon, no pressure.
          </p>
          <div className="how__grid">
            <div className="how-card fade-up">
              <div className="how-card__thought">&quot;This stuff always goes over my head&quot;</div>
              <div className="how-card__icon">🧩</div>
              <div className="how-card__title">10-minute lessons that actually land</div>
              <p className="how-card__body">No textbooks. No hour-long lectures. Each lesson is short, plain-English, and designed so you leave actually understanding something.</p>
            </div>
            <div className="how-card fade-up">
              <div className="how-card__thought">&quot;What if I make the wrong decision?&quot;</div>
              <div className="how-card__icon">🛡️</div>
              <div className="how-card__title">Make every mistake before it matters</div>
              <p className="how-card__body">Practice with a virtual £10,000 in real markets before you touch a penny of your own. There&apos;s nothing to lose, and that&apos;s exactly the point.</p>
            </div>
            <div className="how-card fade-up">
              <div className="how-card__thought">&quot;I&apos;ll sort my finances when I&apos;m older&quot;</div>
              <div className="how-card__icon">⏳</div>
              <div className="how-card__title">Starting now beats starting big later</div>
              <p className="how-card__body">£20 a month from age 20 is worth more than £200 a month from age 35. Flourish makes it easy to start small, today, because waiting is the only real mistake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <section className="paths" id="learn">
        <div className="container">
          <div className="section-tag fade-up">Courses</div>
          <h2 className="section-headline fade-up">Everything they didn&apos;t teach you</h2>
          <p className="section-sub fade-up">
            Structured modules built around what UK students actually need to know - from opening your first ISA to understanding global markets.
          </p>
          <div className="paths__grid">
            <Link href="/courses/investing-from-scratch" className="path-card fade-up path-card--featured">
              <div className="path-card__tag" style={{ background: 'rgba(76,175,130,0.2)', color: '#4caf82' }}>Most popular</div>
              <div className="path-card__emoji">🚀</div>
              <div className="path-card__title">Investing from scratch</div>
              <p className="path-card__body">The complete beginner&apos;s guide. What investing actually is, why it beats savings accounts, and how to start with as little as £1.</p>
              <div className="path-card__meta">
                <span>📚 8 lessons</span>
                <span>⏱ ~65 mins</span>
              </div>
            </Link>
            <Link href="/courses/isas-and-tax-free-saving" className="path-card fade-up">
              <div className="path-card__tag">Essentials</div>
              <div className="path-card__emoji">🏦</div>
              <div className="path-card__title">ISAs &amp; Tax-free saving</div>
              <p className="path-card__body">Cash ISA, Stocks &amp; Shares ISA, Lifetime ISA - know the difference and use your £20k annual allowance wisely.</p>
              <div className="path-card__meta">
                <span>📚 6 lessons</span>
                <span>⏱ ~50 mins</span>
              </div>
            </Link>
            <Link href="/courses/stocks-etfs-and-funds" className="path-card fade-up">
              <div className="path-card__tag">Intermediate</div>
              <div className="path-card__emoji">📊</div>
              <div className="path-card__title">Stocks, ETFs &amp; Funds</div>
              <p className="path-card__body">Understand the difference between individual stocks, index funds, and ETFs - and which strategy is right for a student budget.</p>
              <div className="path-card__meta">
                <span>📚 10 lessons</span>
                <span>⏱ ~90 mins</span>
              </div>
            </Link>
            <Link href="/courses/pensions-and-your-future" className="path-card fade-up">
              <div className="path-card__tag">Long-term</div>
              <div className="path-card__emoji">🔮</div>
              <div className="path-card__title">Pensions &amp; your future</div>
              <p className="path-card__body">Why pensions matter even at 19, how workplace auto-enrolment works, and why time is your greatest financial asset.</p>
              <div className="path-card__meta">
                <span>📚 5 lessons</span>
                <span>⏱ ~55 mins</span>
              </div>
            </Link>
            <Link href="/courses" className="path-card fade-up">
              <div className="path-card__tag">Practical</div>
              <div className="path-card__emoji">🧮</div>
              <div className="path-card__title">Budgeting on a student income</div>
              <p className="path-card__body">Turn your maintenance loan into a foundation. Saving strategies that actually work when you&apos;re living off £800 a month.</p>
              <div className="path-card__meta">
                <span>📚 7 lessons</span>
                <span>⏱ ~2 hrs</span>
              </div>
            </Link>
            <Link href="/courses" className="path-card fade-up">
              <div className="path-card__tag">Advanced</div>
              <div className="path-card__emoji">🌍</div>
              <div className="path-card__title">Understanding markets</div>
              <p className="path-card__body">How global markets move, what inflation means for your money, and how to think about economic cycles without panicking.</p>
              <div className="path-card__meta">
                <span>📚 9 lessons</span>
                <span>⏱ ~2.5 hrs</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="tools" id="tools">
        <div className="container">
          <div className="section-tag fade-up">Free Tools</div>
          <h2 className="section-headline fade-up">Built for your situation</h2>
          <p className="section-sub fade-up">
            Practical calculators and trackers designed specifically for UK students - no finance degree required.
          </p>
          <div className="tools__grid">
            {[
              { icon: '📈', title: 'Compound interest calculator', body: 'See how £50/month grows over 10, 20, 40 years - the numbers will surprise you.',                                                      href: '/tools/compound-calculator' },
              { icon: '🏦', title: 'ISA allowance tracker',         body: 'Track your £20,000 annual ISA allowance across different account types in real time.',                                                href: '/tools/isa-tracker' },
              { icon: '⚖️', title: 'Risk profiler',                 body: 'Answer 5 quick questions to understand what investment risk level suits your goals and timeline.',                                    href: '/tools/risk-profiler' },
              { icon: '🎯', title: 'Savings goal planner',          body: 'Set a target - house deposit, travel fund, emergency pot - and build a weekly plan to get there.',                                    href: '/tools' },
              { icon: '💸', title: 'Fees comparison tool',          body: 'Compare the real long-term cost of platform fees across popular UK investment apps.',                                                  href: '/tools' },
              { icon: '🧾', title: 'Student budget template',       body: "A simple monthly budget built around a student's income sources - loan, part-time work, and parental support.",                       href: '/tools' },
              { icon: '🏠', title: 'LISA calculator',               body: 'Work out how the Lifetime ISA 25% government bonus helps you buy your first home faster.',                                            href: '/tools/lisa-calculator' },
              { icon: '📅', title: 'Pension projection tool',       body: 'Enter your age and monthly contribution to see your projected pension pot at retirement.',                                             href: '/tools' },
            ].map((tool) => (
              <Link className="tool-card fade-up" key={tool.title} href={tool.href}>
                <div className="tool-card__icon">{tool.icon}</div>
                <div>
                  <div className="tool-card__title">{tool.title}</div>
                  <p className="tool-card__body">{tool.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator teaser */}
      <section className="sim" id="simulate">
        <div className="container">
          <div className="sim__inner">
            <div>
              <div className="section-tag fade-up" style={{ color: 'var(--green-mid)' }}>Paper trading</div>
              <h2 className="section-headline fade-up" style={{ color: 'var(--white)' }}>
                Practice with a<br />virtual portfolio
              </h2>
              <p className="section-sub fade-up">
                Get £10,000 in virtual money and invest it in real stocks and ETFs with live market data. Make mistakes without losing a penny - and learn faster than any textbook.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }} className="fade-up">
                {[
                  'Live market prices from real UK & global stocks',
                  'Compare your performance against the FTSE 100',
                  'Weekly challenges with leaderboards',
                  'No real money, no risk - just learning',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                    <span style={{ color: 'var(--green-mid)', fontSize: '1.1rem' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/simulator" className="btn btn--green btn--lg fade-up">Try the simulator</Link>
            </div>
            <div className="sim__card fade-up">
              <div className="sim__card-header">
                <div className="sim__card-label">Virtual Portfolio</div>
                <div className="sim__card-badge">LIVE DATA</div>
              </div>
              <div className="sim__balance">£10,847.32</div>
              <div className="sim__change">▲ +£847.32 (+8.47%) all time</div>
              <div className="sim__chart">
                <svg viewBox="0 0 300 80" preserveAspectRatio="none" fill="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4caf82" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4caf82" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,65 C20,60 40,58 60,52 C80,46 100,50 120,42 C140,34 160,38 180,28 C200,18 220,22 240,15 C260,8 280,12 300,5" stroke="#4caf82" strokeWidth="2.5" fill="none" />
                  <path d="M0,65 C20,60 40,58 60,52 C80,46 100,50 120,42 C140,34 160,38 180,28 C200,18 220,22 240,15 C260,8 280,12 300,5 L300,80 L0,80 Z" fill="url(#chartGrad)" />
                </svg>
              </div>
              <div className="sim__holdings">
                {[
                  { color: '#4caf82', name: 'Vanguard S&P 500 ETF', val: '£4,230', chg: '+12.4%', pos: true },
                  { color: '#60a5fa', name: 'iShares FTSE 100',     val: '£3,180', chg: '+5.2%',  pos: true },
                  { color: '#f59e0b', name: 'Apple Inc.',            val: '£1,950', chg: '-2.1%',  pos: false },
                  { color: '#a78bfa', name: 'Cash (£ GBP)',          val: '£1,487', chg: '-',      pos: null },
                ].map((h) => (
                  <div className="holding" key={h.name}>
                    <div className="holding__dot" style={{ background: h.color }} />
                    <div className="holding__name">{h.name}</div>
                    <div className="holding__val">{h.val}</div>
                    <div
                      className={h.pos === true ? 'holding__chg holding__chg--pos' : h.pos === false ? 'holding__chg holding__chg--neg' : 'holding__chg'}
                      style={h.pos === null ? { color: 'rgba(255,255,255,0.3)' } : undefined}
                    >
                      {h.chg}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-tag fade-up">Student stories</div>
          <h2 className="section-headline fade-up">Real students, real results</h2>
          <div className="testimonials__grid">
            {[
              { initials: 'JM', bg: '#2e7d5e', quote: "I opened my first Stocks & Shares ISA the week after finishing the ISA module. I'd been putting it off for two years because it seemed complicated. It's not.", name: 'Jamie M.', meta: 'Economics, University of Leeds' },
              { initials: 'PK', bg: '#1e3a8a', quote: "The simulator is addictive. I've been competing with my flatmates for the top return each week - and we've all accidentally learned a ton about portfolio diversification.", name: 'Priya K.', meta: 'Computer Science, UCL' },
              { initials: 'TC', bg: '#92400e', quote: "I came in knowing nothing. Now I actually understand what my mum is talking about when she mentions her pension. The compound interest calculator broke my brain in the best way.", name: 'Tom C.', meta: 'History, University of Edinburgh' },
            ].map((t) => (
              <div className="testi-card fade-up" key={t.name}>
                <div className="testi-card__stars">★★★★★</div>
                <p className="testi-card__quote">&quot;{t.quote}&quot;</p>
                <div className="testi-card__author">
                  <div className="testi-card__avatar" style={{ background: t.bg }}>{t.initials}</div>
                  <div>
                    <div className="testi-card__name">{t.name}</div>
                    <div className="testi-card__meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__headline fade-up">Your future self will thank you for starting today</h2>
          <p className="cta-banner__sub fade-up">
            Every year you wait costs you more than you think. It takes 20 minutes to learn something that could change your financial life.
          </p>
          <div className="cta-banner__actions fade-up">
            <StartLearningCTA className="btn btn--white btn--lg" />
            <Link href="/courses" className="btn btn--ghost-white btn--lg">Browse courses</Link>
          </div>
        </div>
      </section>
    </>
  )
}
