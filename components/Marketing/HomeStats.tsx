export default function HomeStats() {
  return (
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
  )
}
