const features = [
  { icon: '💷', title: '£10,000 virtual cash to start',    body: "Every account starts with £10,000 of virtual money. No top-ups, no tricks — just a realistic pot to learn with." },
  { icon: '📡', title: 'Real stocks & ETF prices',         body: 'Buy and sell from a curated list of real UK and global stocks — Shell, Apple, Vanguard ETFs and more — at live market prices.' },
  { icon: '📊', title: 'Benchmark vs FTSE 100',            body: "See exactly how your portfolio performs against the FTSE 100. Are you beating the market — or learning why it's so hard?" },
  { icon: '🛡️', title: 'No real money, ever',             body: 'Everything is virtual. Make bold bets, panic sell, buy the dip — all the real emotions, none of the real consequences.' },
  { icon: '📈', title: 'Track every trade',                body: 'A full transaction history, P&L per holding, and portfolio value over time — so you can actually learn from what you did.' },
  { icon: '🏆', title: 'Weekly challenges',                body: 'Compete with other students on themed weekly challenges. Build the best portfolio, climb the leaderboard.' },
]

export default function SimPageFeatures() {
  return (
    <section className="simpage-features">
      <div className="container">
        <div className="simpage-section-head">
          <div className="section-tag">What you get</div>
          <h2 className="simpage-section-headline">Everything you need to learn by doing</h2>
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
  )
}
