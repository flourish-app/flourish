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
              <li><a href="#">Investing basics</a></li>
              <li><a href="#">ISAs explained</a></li>
              <li><a href="#">Stocks &amp; ETFs</a></li>
              <li><a href="#">Pensions</a></li>
              <li><a href="#">Budgeting</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Tools</div>
            <ul>
              <li><a href="#">Compound calculator</a></li>
              <li><a href="#">ISA tracker</a></li>
              <li><a href="#">Risk profiler</a></li>
              <li><a href="#">LISA calculator</a></li>
              <li><a href="#">Budget planner</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Simulate</div>
            <ul>
              <li><a href="#">Paper trading</a></li>
              <li><a href="#">Leaderboards</a></li>
              <li><a href="#">Weekly challenges</a></li>
              <li><a href="#">Portfolio builder</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Company</div>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="/privacy-policy">Privacy policy</a></li>
              <li><a href="#">Terms of use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div>© 2026 Flourish. All rights reserved.</div>
          <div className="footer__disclaimer">
            Flourish is an educational platform only. We do not provide financial advice. No real money is involved in simulations. All investment decisions should be made based on your own research or advice from a qualified FCA-regulated adviser. Capital at risk.
          </div>
        </div>
      </div>
    </footer>
  )
}
