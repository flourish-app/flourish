import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          <img src="/logo.PNG" alt="Flourish" style={{ height: '28px', width: 'auto' }} />
        </div>
        <p className="footer__tagline">
          Free investing education for UK students. No real money, no hidden costs, no jargon.
        </p>
        <div className="footer__cols">
          <div className="footer__col">
            <div className="footer__col-title">Learn</div>
            <ul>
              <li><Link href="/courses">All courses</Link></li>
              <li><Link href="/courses/investing-from-scratch">Investing basics</Link></li>
              <li><Link href="/courses/isas-and-tax-free-saving">ISAs explained</Link></li>
              <li><Link href="/courses/stocks-etfs-and-funds">Stocks &amp; ETFs</Link></li>
              <li><Link href="/courses/pensions-and-your-future">Pensions</Link></li>
              <li><span style={{ opacity: 0.45 }}>Budgeting</span></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Tools</div>
            <ul>
              <li><Link href="/tools">All tools</Link></li>
              <li><Link href="/tools/compound-calculator">Compound calculator</Link></li>
              <li><Link href="/tools/isa-tracker">ISA tracker</Link></li>
              <li><Link href="/tools/risk-profiler">Risk profiler</Link></li>
              <li><Link href="/tools/lisa-calculator">LISA calculator</Link></li>
              <li><span style={{ opacity: 0.45 }}>Budget planner</span></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Simulate</div>
            <ul>
              <li><Link href="/simulator">Paper trading</Link></li>
              <li><span style={{ opacity: 0.45 }}>Leaderboards</span></li>
              <li><span style={{ opacity: 0.45 }}>Weekly challenges</span></li>
              <li><Link href="/simulator">Portfolio builder</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Company</div>
            <ul>
              <li><span style={{ opacity: 0.45 }}>About</span></li>
              <li><span style={{ opacity: 0.45 }}>Contact</span></li>
              <li><Link href="/privacy-policy">Privacy policy</Link></li>
              <li><span style={{ opacity: 0.45 }}>Cookie policy</span></li>
              <li><span style={{ opacity: 0.45 }}>Terms of service</span></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>© 2026 Flourish Interactive Limited, doing business as "Flourish". All rights reserved.</div>
          <div className="footer__disclaimer">
            Flourish is an educational platform only. We do not provide financial advice. No real money is involved in simulations. All investment decisions should be made based on your own research or advice from a qualified FCA-regulated adviser. Capital at risk.
          </div>
        </div>
      </div>
    </footer>
  )
}
