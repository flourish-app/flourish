import StatNumber from './StatNumber'

export default function HomeStats() {
  return (
    <section className="stats">
      {/* Decorative background lines */}
      <svg className="stats__bg" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 160 C200 80, 400 240, 600 160 S1000 80, 1200 160 S1400 240, 1440 160" stroke="#2e7d5e" strokeWidth="1" fill="none" opacity="0.25" />
        <path d="M0 200 C300 120, 500 280, 700 200 S1100 120, 1300 200 S1420 280, 1440 200" stroke="#2e7d5e" strokeWidth="0.75" fill="none" opacity="0.15" />
        <path d="M0 120 C150 60, 350 180, 550 120 S900 60, 1100 120 S1380 180, 1440 120" stroke="#2e7d5e" strokeWidth="0.5" fill="none" opacity="0.12" />
      </svg>

      <div className="container">
        <div className="stats__header">
          <div className="stats__badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Why it matters
          </div>
          <h2 className="stats__headline">Financial education <em>changes lives</em></h2>
          <p className="stats__sub">The numbers show the cost of not learning about money</p>
        </div>

        <div className="stats__inner">
          <div className="stats__item">
            <div className="stats__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <StatNumber value={73} suffix="%" />
              <div className="stat__label">of adults in the UK did not receive any form of financial education at school</div>
            </div>
          </div>

          <div className="stats__divider" aria-hidden="true" />

          <div className="stats__item">
            <div className="stats__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              </svg>
            </div>
            <div>
              <StatNumber prefix="£" value={50} displaySuffix="k" />
              <div className="stat__label">potential lifetime loss from starting investing just 10 years late</div>
            </div>
          </div>

          <div className="stats__divider" aria-hidden="true" />

          <div className="stats__item">
            <div className="stats__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><circle cx="9" cy="12" r="1"/><line x1="12" y1="5" x2="12" y2="3"/>
              </svg>
            </div>
            <div>
              <StatNumber prefix="£" value={0} />
              <div className="stat__label">cost – completely free to access every lesson and tool</div>
            </div>
          </div>
        </div>

        <div className="stats__callout">
          <strong><span aria-hidden="true">🌱</span> Better knowledge today. Better decisions tomorrow.</strong>
        </div>
      </div>
    </section>
  )
}
