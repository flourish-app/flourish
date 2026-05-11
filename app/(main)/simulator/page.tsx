import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio Simulator - Flourish',
  description: 'Practice investing with £10,000 of virtual money. Real stocks, real prices, zero risk. The investing simulator built for UK students.',
}

const features = [
  {
    icon: '💷',
    title: '£10,000 virtual cash to start',
    body: 'Every account starts with £10,000 of virtual money. No top-ups, no tricks — just a realistic pot to learn with.',
  },
  {
    icon: '📡',
    title: 'Real stocks & ETF prices',
    body: 'Buy and sell from a curated list of real UK and global stocks — Shell, Apple, Vanguard ETFs and more — at live market prices.',
  },
  {
    icon: '📊',
    title: 'Benchmark vs FTSE 100',
    body: 'See exactly how your portfolio performs against the FTSE 100. Are you beating the market — or learning why it\'s so hard?',
  },
  {
    icon: '🛡️',
    title: 'No real money, ever',
    body: 'Everything is virtual. Make bold bets, panic sell, buy the dip — all the real emotions, none of the real consequences.',
  },
  {
    icon: '📈',
    title: 'Track every trade',
    body: 'A full transaction history, P&L per holding, and portfolio value over time — so you can actually learn from what you did.',
  },
  {
    icon: '🏆',
    title: 'Weekly challenges',
    body: 'Compete with other students on themed weekly challenges. Build the best portfolio, climb the leaderboard.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Create your free account',
    body: 'Sign up in under a minute. Your virtual portfolio is created instantly — no card, no deposit, nothing.',
    color: '--green',
  },
  {
    num: '2',
    title: 'Get £10,000 virtual cash',
    body: 'Your portfolio starts with £10,000 ready to invest. It\'s not real money — but it feels like it.',
    color: '--black',
  },
  {
    num: '3',
    title: 'Buy real stocks & ETFs',
    body: 'Browse UK and global stocks, index funds, and ETFs. Buy at real market prices, in real time.',
    color: '--green',
  },
  {
    num: '4',
    title: 'Track, learn, improve',
    body: 'Watch your portfolio move with the market. See what\'s working, what\'s not, and why — then apply it for real.',
    color: '--black',
  },
]

const leaderboard = [
  { rank: 1, name: 'Sophie T.', value: '£18,340', return: '+83.4%', badge: '🥇' },
  { rank: 2, name: 'Marcus O.', value: '£16,920', return: '+69.2%', badge: '🥈' },
  { rank: 3, name: 'Priya K.',  value: '£15,610', return: '+56.1%', badge: '🥉' },
  { rank: 4, name: 'James R.',  value: '£14,280', return: '+42.8%', badge: null },
  { rank: 5, name: 'Aisha M.',  value: '£13,940', return: '+39.4%', badge: null },
]

export default function SimulatorPage() {
  return (
    <div className="simpage">

      {/* ── Hero ── */}
      <section className="simpage-hero">
        <div className="container">
          <div className="simpage-hero__inner">

            {/* Left: copy */}
            <div className="simpage-hero__copy">
              <div className="simpage-hero__badge">
                <span className="simpage-hero__badge-dot" />
                Now live — free to use
              </div>
              <h1 className="simpage-hero__headline">
                Invest without<br />the risk
              </h1>
              <p className="simpage-hero__sub">
                Practice with £10,000 of virtual money in real UK and global stocks.
                Make every mistake before it costs you anything.
              </p>
              <div className="simpage-hero__cta">
                <Link href="/start-learning" className="btn btn--green btn--lg">
                  Start trading free
                </Link>
                <a href="#how-it-works" className="btn btn--ghost-white btn--lg">
                  How it works
                </a>
              </div>
              <p className="simpage-hero__disclaimer">
                Free forever · No real money · No card required
              </p>
            </div>

            {/* Right: mock dashboard */}
            <div className="simpage-dashboard">

              {/* Dashboard header */}
              <div className="simpage-db__topbar">
                <div className="simpage-db__live">
                  <span className="simpage-db__live-dot" />
                  Live prices
                </div>
                <div className="simpage-db__tabs">
                  <span className="simpage-db__tab simpage-db__tab--active">Portfolio</span>
                  <span className="simpage-db__tab">Market</span>
                  <span className="simpage-db__tab">History</span>
                </div>
              </div>

              {/* Value + benchmark */}
              <div className="simpage-db__value-row">
                <div>
                  <div className="simpage-db__value-label">Portfolio value</div>
                  <div className="simpage-db__value">£12,847.50</div>
                  <div className="simpage-db__return">▲ +£2,847.50 &nbsp;·&nbsp; +28.5% all time</div>
                </div>
                <div className="simpage-db__bench">
                  <div className="simpage-db__bench-label">vs FTSE 100</div>
                  <div className="simpage-db__bench-you">You &nbsp;<strong>+28.5%</strong></div>
                  <div className="simpage-db__bench-ftse">FTSE &nbsp;<span>+4.2%</span></div>
                </div>
              </div>

              {/* Chart */}
              <div className="simpage-db__chart">
                <svg viewBox="0 0 320 90" preserveAspectRatio="none" aria-hidden="true">
                  {/* Gradient fill under portfolio line */}
                  <defs>
                    <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2e7d5e" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2e7d5e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Fill area */}
                  <path
                    d="M0,76 C20,72 35,80 55,64 C70,54 85,68 105,56 C120,46 135,60 155,46 C168,38 182,52 200,40 C215,32 230,44 250,32 C268,24 285,36 320,26 L320,90 L0,90 Z"
                    fill="url(#portGrad)"
                  />
                  {/* FTSE 100 comparison line */}
                  <path
                    d="M0,76 C30,74 70,78 110,74 C145,70 180,76 220,72 C255,68 285,72 320,68"
                    fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"
                  />
                  {/* Portfolio line */}
                  <path
                    d="M0,76 C20,72 35,80 55,64 C70,54 85,68 105,56 C120,46 135,60 155,46 C168,38 182,52 200,40 C215,32 230,44 250,32 C268,24 285,36 320,26"
                    fill="none" stroke="#4caf82" strokeWidth="2"
                  />
                  {/* End dot */}
                  <circle cx="320" cy="26" r="3.5" fill="#4caf82" />
                </svg>
                <div className="simpage-db__chart-legend">
                  <span><span className="simpage-db__legend-line simpage-db__legend-line--port" />Your portfolio</span>
                  <span><span className="simpage-db__legend-line simpage-db__legend-line--ftse" />FTSE 100</span>
                </div>
              </div>

              {/* Holdings */}
              <div className="simpage-db__holdings">
                <div className="simpage-db__holdings-header">
                  <span>Holding</span>
                  <span>Value</span>
                  <span>Return</span>
                </div>
                {[
                  { dot: '#4caf82', ticker: 'AAPL',  name: 'Apple Inc.',          value: '£3,240', ret: '+12.4%', pos: true },
                  { dot: '#f59e0b', ticker: 'SHEL',  name: 'Shell plc',           value: '£2,180', ret: '+8.1%',  pos: true },
                  { dot: '#60a5fa', ticker: 'VWRL',  name: 'Vanguard All-World',  value: '£4,100', ret: '+5.2%',  pos: true },
                  { dot: '#6b7280', ticker: 'CASH',  name: 'Cash',                value: '£3,327', ret: '—',      pos: null  },
                ].map(h => (
                  <div key={h.ticker} className="simpage-db__holding">
                    <div className="simpage-db__holding-left">
                      <span className="simpage-db__holding-dot" style={{ background: h.dot }} />
                      <span className="simpage-db__holding-ticker">{h.ticker}</span>
                      <span className="simpage-db__holding-name">{h.name}</span>
                    </div>
                    <span className="simpage-db__holding-value">{h.value}</span>
                    <span
                      className="simpage-db__holding-ret"
                      style={{ color: h.pos === true ? '#4caf82' : h.pos === false ? '#f87171' : 'rgba(255,255,255,0.3)' }}
                    >
                      {h.ret}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buy bar */}
              <div className="simpage-db__buybar">
                <div className="simpage-db__search">🔍 &nbsp;Search stocks &amp; ETFs...</div>
                <button className="simpage-db__buy-btn">Buy</button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="simpage-features">
        <div className="container">
          <div className="simpage-section-head">
            <div className="section-tag">What you get</div>
            <h2 className="simpage-section-headline">
              Everything you need to learn by doing
            </h2>
          </div>
          <div className="simpage-features__grid">
            {features.map(f => (
              <div key={f.title} className="simpage-feature-card">
                <div className="simpage-feature-card__icon">{f.icon}</div>
                <h3 className="simpage-feature-card__title">{f.title}</h3>
                <p className="simpage-feature-card__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="simpage-how">
        <div className="container">
          <div className="simpage-section-head">
            <div className="section-tag">How it works</div>
            <h2 className="simpage-section-headline">
              From zero to your first portfolio in minutes
            </h2>
          </div>
          <div className="simpage-steps">
            {steps.map((s, i) => (
              <div key={i} className="simpage-step">
                <div
                  className="simpage-step__num"
                  style={{ background: `var(${s.color})`, color: 'var(--white)' }}
                >
                  {s.num}
                </div>
                <div className="simpage-step__content">
                  <h3 className="simpage-step__title">{s.title}</h3>
                  <p className="simpage-step__body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leaderboard teaser ── */}
      <section className="simpage-coming">
        <div className="container">
          <div className="simpage-coming__inner">
            <div className="simpage-coming__copy">
              <div className="section-tag" style={{ color: 'var(--green-mid)' }}>Coming soon</div>
              <h2 className="simpage-coming__headline">
                Weekly challenges &amp; leaderboards
              </h2>
              <p className="simpage-coming__sub">
                Every week, a new challenge. A market event, a themed scenario, or a head-to-head
                competition. Build the best portfolio. Climb the board. Learn faster because it actually matters.
              </p>
              <div className="simpage-coming__pills">
                <span className="simpage-coming__pill">🎯 Weekly themes</span>
                <span className="simpage-coming__pill">🏆 Global leaderboard</span>
                <span className="simpage-coming__pill">⚡ Live rankings</span>
                <span className="simpage-coming__pill">🎖️ Badges & rewards</span>
              </div>
            </div>
            <div className="simpage-leaderboard">
              <div className="simpage-lb__header">
                <span className="simpage-lb__title">🏆 This week&apos;s challenge</span>
                <span className="simpage-lb__theme">Tech stocks only</span>
              </div>
              {leaderboard.map(row => (
                <div key={row.rank} className={`simpage-lb__row${row.rank === 1 ? ' simpage-lb__row--top' : ''}`}>
                  <span className="simpage-lb__rank">
                    {row.badge ?? `#${row.rank}`}
                  </span>
                  <span className="simpage-lb__name">{row.name}</span>
                  <span className="simpage-lb__value">{row.value}</span>
                  <span className="simpage-lb__return">{row.return}</span>
                </div>
              ))}
              <div className="simpage-lb__you">
                <span className="simpage-lb__rank">#—</span>
                <span className="simpage-lb__name">You</span>
                <span className="simpage-lb__value" style={{ color: 'rgba(255,255,255,0.3)' }}>Join to play</span>
                <span className="simpage-lb__return" style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <div className="cta-banner">
        <div className="container">
          <h2 className="cta-banner__headline">Start practising before it counts</h2>
          <p className="cta-banner__sub">
            Create a free account and start investing with £10,000 of virtual cash today.
          </p>
          <div className="cta-banner__actions">
            <Link href="/start-learning" className="btn btn--white btn--lg">
              Start trading free
            </Link>
            <Link href="/courses" className="btn btn--ghost-white btn--lg">
              Browse courses
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
