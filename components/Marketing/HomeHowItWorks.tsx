export default function HomeHowItWorks() {
  return (
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
  )
}
