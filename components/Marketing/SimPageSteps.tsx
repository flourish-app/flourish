const steps = [
  { num: '1', title: 'Create your free account',    body: 'Sign up in under a minute. Your virtual portfolio is created instantly — no card, no deposit, nothing.',                                          color: '--green' },
  { num: '2', title: 'Get £10,000 virtual cash',    body: "Your portfolio starts with £10,000 ready to invest. It's not real money — but it feels like it.",                                               color: '--black' },
  { num: '3', title: 'Buy real stocks & ETFs',      body: 'Browse UK and global stocks, index funds, and ETFs. Buy at real market prices, in real time.',                                                    color: '--green' },
  { num: '4', title: 'Track, learn, improve',       body: "Watch your portfolio move with the market. See what's working, what's not, and why — then apply it for real.",                                   color: '--black' },
]

export default function SimPageSteps() {
  return (
    <section id="how-it-works" className="simpage-how">
      <div className="container">
        <div className="simpage-section-head">
          <div className="section-tag">How it works</div>
          <h2 className="simpage-section-headline">From zero to your first portfolio in minutes</h2>
        </div>
        <div className="simpage-steps">
          {steps.map((s, i) => (
            <div key={i} className="simpage-step">
              <div className="simpage-step__num" style={{ background: `var(${s.color})`, color: 'var(--white)' }}>
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
  )
}
