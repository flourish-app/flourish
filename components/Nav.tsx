'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
          <span className="nav__logo-icon">F</span>
          Flourish
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav__links">
            <li>
              <Link href="/how-it-works" className={pathname === '/how-it-works' ? 'active' : ''}>
                How it works
              </Link>
            </li>
            <li className="nav__dropdown">
              <button>Courses <span className="nav__chevron">▾</span></button>
              <div className="nav__dropdown-menu">
                <div className="nav__dropdown-menu-inner">
                  <Link href="/courses/investing-from-scratch"><span>🚀</span> Investing from scratch</Link>
                  <Link href="/courses/isas-and-tax-free-saving"><span>🏦</span> ISAs &amp; tax-free saving</Link>
                  <Link href="/courses/stocks-etfs-and-funds"><span>📊</span> Stocks, ETFs &amp; funds</Link>
                  <Link href="/courses/pensions-and-your-future"><span>🔮</span> Pensions &amp; your future</Link>
                  <div className="nav__dropdown-divider" />
                  <Link href="/courses"><span>📚</span> All courses</Link>
                </div>
              </div>
            </li>
            <li className="nav__dropdown">
              <button>Tools <span className="nav__chevron">▾</span></button>
              <div className="nav__dropdown-menu">
                <div className="nav__dropdown-menu-inner">
                  <Link href="/tools/compound-calculator"><span>📈</span> Compound calculator</Link>
                  <Link href="/tools/isa-tracker"><span>🏦</span> ISA allowance tracker</Link>
                  <Link href="/tools/risk-profiler"><span>⚖️</span> Risk profiler</Link>
                  <Link href="/tools/lisa-calculator"><span>🏠</span> LISA calculator</Link>
                  <div className="nav__dropdown-divider" />
                  <Link href="/tools"><span>🧰</span> All tools</Link>
                </div>
              </div>
            </li>
            <li><Link href="/simulator">Simulator</Link></li>
          </ul>
        </nav>

        <div className="nav__actions">
          <Link href="/login" className="btn btn--outline">Log in</Link>
          <Link href="/start-learning" className="btn btn--primary">Start learning</Link>
          <button
            className="nav__hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`}>
        <Link href="/how-it-works" onClick={() => setMobileOpen(false)}>How it works</Link>
        <span className="nav__mobile-section">Courses</span>
        <Link href="/courses/investing-from-scratch" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>Investing from scratch</Link>
        <Link href="/courses/isas-and-tax-free-saving" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>ISAs &amp; tax-free saving</Link>
        <Link href="/courses/stocks-etfs-and-funds" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>Stocks, ETFs &amp; funds</Link>
        <Link href="/courses/pensions-and-your-future" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>Pensions &amp; your future</Link>
        <span className="nav__mobile-section">Tools</span>
        <Link href="/tools/compound-calculator" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>Compound calculator</Link>
        <Link href="/tools/isa-tracker" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>ISA allowance tracker</Link>
        <Link href="/tools/risk-profiler" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>Risk profiler</Link>
        <Link href="/tools/lisa-calculator" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>LISA calculator</Link>
        <Link href="/tools" style={{ paddingLeft: '12px' }} onClick={() => setMobileOpen(false)}>All tools</Link>
        <Link href="/courses" onClick={() => setMobileOpen(false)}>All courses</Link>
        <Link href="/simulator" onClick={() => setMobileOpen(false)}>Simulator</Link>
        <Link href="/login" className="btn btn--outline" onClick={() => setMobileOpen(false)}>Log in</Link>
        <Link href="/start-learning" className="btn btn--primary" onClick={() => setMobileOpen(false)}>Start learning free</Link>
      </div>
    </header>
  )
}
