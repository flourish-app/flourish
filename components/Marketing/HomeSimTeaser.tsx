import Link from 'next/link'

const features = [
  'Live market prices from real UK & global stocks',
  'Compare your performance against the FTSE 100',
  'Weekly challenges with leaderboards',
  'No real money, no risk - just learning',
]

const holdings = [
  { color: '#4caf82', name: 'Vanguard S&P 500 ETF', val: '£4,230', chg: '+12.4%', pos: true  as boolean | null },
  { color: '#60a5fa', name: 'iShares FTSE 100',     val: '£3,180', chg: '+5.2%',  pos: true  as boolean | null },
  { color: '#f59e0b', name: 'Apple Inc.',            val: '£1,950', chg: '-2.1%',  pos: false as boolean | null },
  { color: '#a78bfa', name: 'Cash (£ GBP)',          val: '£1,487', chg: '-',      pos: null  as boolean | null },
]

export default function HomeSimTeaser() {
  return (
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
              {features.map((item) => (
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
              {holdings.map((h) => (
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
  )
}
