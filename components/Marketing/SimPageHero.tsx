import Link from 'next/link'

const holdings = [
  { dot: '#4caf82', ticker: 'AAPL', name: 'Apple Inc.',         value: '£3,240', ret: '+12.4%', pos: true  as boolean | null },
  { dot: '#f59e0b', ticker: 'SHEL', name: 'Shell plc',          value: '£2,180', ret: '+8.1%',  pos: true  as boolean | null },
  { dot: '#60a5fa', ticker: 'VWRL', name: 'Vanguard All-World', value: '£4,100', ret: '+5.2%',  pos: true  as boolean | null },
  { dot: '#6b7280', ticker: 'CASH', name: 'Cash',               value: '£3,327', ret: '—',      pos: null  as boolean | null },
]

export default function SimPageHero() {
  return (
    <section className="simpage-hero">
      <div className="container">
        <div className="simpage-hero__inner">
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
              <Link href="/start-learning" className="btn btn--green btn--lg">Start trading free</Link>
              <a href="#how-it-works" className="btn btn--ghost-white btn--lg">How it works</a>
            </div>
            <p className="simpage-hero__disclaimer">Free forever · No real money · No card required</p>
          </div>

          <div className="simpage-dashboard">
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

            <div className="simpage-db__chart">
              <svg viewBox="0 0 320 90" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2e7d5e" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2e7d5e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,76 C20,72 35,80 55,64 C70,54 85,68 105,56 C120,46 135,60 155,46 C168,38 182,52 200,40 C215,32 230,44 250,32 C268,24 285,36 320,26 L320,90 L0,90 Z" fill="url(#portGrad)" />
                <path d="M0,76 C30,74 70,78 110,74 C145,70 180,76 220,72 C255,68 285,72 320,68" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M0,76 C20,72 35,80 55,64 C70,54 85,68 105,56 C120,46 135,60 155,46 C168,38 182,52 200,40 C215,32 230,44 250,32 C268,24 285,36 320,26" fill="none" stroke="#4caf82" strokeWidth="2" />
                <circle cx="320" cy="26" r="3.5" fill="#4caf82" />
              </svg>
              <div className="simpage-db__chart-legend">
                <span><span className="simpage-db__legend-line simpage-db__legend-line--port" />Your portfolio</span>
                <span><span className="simpage-db__legend-line simpage-db__legend-line--ftse" />FTSE 100</span>
              </div>
            </div>

            <div className="simpage-db__holdings">
              <div className="simpage-db__holdings-header">
                <span>Holding</span><span>Value</span><span>Return</span>
              </div>
              {holdings.map(h => (
                <div key={h.ticker} className="simpage-db__holding">
                  <div className="simpage-db__holding-left">
                    <span className="simpage-db__holding-dot" style={{ background: h.dot }} />
                    <span className="simpage-db__holding-ticker">{h.ticker}</span>
                    <span className="simpage-db__holding-name">{h.name}</span>
                  </div>
                  <span className="simpage-db__holding-value">{h.value}</span>
                  <span className="simpage-db__holding-ret" style={{ color: h.pos === true ? '#4caf82' : h.pos === false ? '#f87171' : 'rgba(255,255,255,0.3)' }}>{h.ret}</span>
                </div>
              ))}
            </div>

            <div className="simpage-db__buybar">
              <div className="simpage-db__search">🔍 &nbsp;Search stocks &amp; ETFs...</div>
              <button className="simpage-db__buy-btn">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
