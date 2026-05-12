const points = [
  { icon: '🏫', title: "Schools don't cover it",           body: "Personal finance is absent from most UK school curricula. You might leave with A-levels in economics and still not know what an ISA is." },
  { icon: '📰', title: "Existing content isn't built for you", body: "Most finance content is aimed at people who already have disposable income and a basic understanding. It skips the fundamentals and talks down to beginners." },
  { icon: '⏰', title: "Every year you wait is costly",    body: "Compound interest means time is your biggest financial asset. A student who starts at 20 needs to invest far less than someone who starts at 30 to reach the same outcome." },
]

export default function HowItWorksGap() {
  return (
    <section className="gap-section">
      <div className="container">
        <div className="gap-section__inner">
          <div className="gap-section__stat fade-up">
            <div className="gap-section__stat-num"><span>73</span>%</div>
            <div className="gap-section__stat-label">of UK adults received no financial education at school whatsoever</div>
          </div>
          <div className="fade-up">
            <div className="section-tag">The problem</div>
            <h2 className="section-headline">The system left you out</h2>
            <p className="section-sub" style={{ marginBottom: '32px' }}>
              Financial education isn&apos;t in the national curriculum. Most young people reach adulthood with no idea how savings accounts work, let alone investing. That&apos;s not a personal failing - it&apos;s a gap in the system.
            </p>
            <div className="gap-section__points">
              {points.map((p) => (
                <div className="gap-point" key={p.title}>
                  <div className="gap-point__icon">{p.icon}</div>
                  <div>
                    <div className="gap-point__title">{p.title}</div>
                    <p className="gap-point__body">{p.body}</p>
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
