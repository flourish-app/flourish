'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import SoundToggle from '@/components/SoundToggle'

const NAV: { section?: string; items: { href: string; label: string }[] }[] = [
  {
    items: [
      { href: '/dashboard', label: 'Overview' },
      { href: '/dashboard/profile', label: 'Profile' },
    ],
  },
  {
    section: 'Simulator',
    items: [
      { href: '/dashboard/simulator', label: 'Portfolio' },
      { href: '/dashboard/simulator/stocks', label: 'Browse stocks' },
      { href: '/dashboard/simulator/performance', label: 'Performance' },
      { href: '/dashboard/simulator/history', label: 'History' },
    ],
  },
  {
    section: 'Courses',
    items: [
      { href: '/dashboard/courses', label: 'All courses' },
      { href: '/dashboard/courses/investing-from-scratch', label: 'Investing from scratch' },
      { href: '/dashboard/courses/isas-and-tax-free-saving', label: 'ISAs & tax-free saving' },
      { href: '/dashboard/courses/stocks-etfs-and-funds', label: 'Stocks, ETFs & funds' },
      { href: '/dashboard/courses/pensions-and-your-future', label: 'Pensions & your future' },
    ],
  },
  {
    section: 'Tools',
    items: [
      { href: '/dashboard/tools', label: 'All tools' },
      { href: '/dashboard/tools/compound-calculator', label: 'Compound calculator' },
      { href: '/dashboard/tools/isa-tracker', label: 'ISA tracker' },
      { href: '/dashboard/tools/risk-profiler', label: 'Risk profiler' },
      { href: '/dashboard/tools/lisa-calculator', label: 'LISA calculator' },
    ],
  },
]

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      <div className="sidebar__logo">
        <Link href="/" onClick={onNav}>
          <img src="/logo.PNG" alt="Flourish" style={{ height: '28px', width: 'auto' }} />
        </Link>
      </div>

      <nav className="sidebar__nav" aria-label="Dashboard navigation">
        {NAV.map((group, i) => (
          <div key={i} className="sidebar__group">
            {group.section && (
              <p className="sidebar__section-label">{group.section}</p>
            )}
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar__link${pathname === item.href ? ' sidebar__link--active' : ''}`}
                onClick={onNav}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {pathname === '/dashboard/tools' && (
        <div className="sidebar__promo-card">
          <p className="sidebar__promo-label">Understand your money</p>
          <p className="sidebar__promo-title">All tools are 100% free</p>
          <p className="sidebar__promo-sub">Open, use and learn.</p>
          <div className="sidebar__promo-graphic" aria-hidden="true">
            <span>🧮</span><span>📈</span>
          </div>
        </div>
      )}

      <div className="sidebar__footer">
        <div className="sidebar__footer-row">
          <div style={{ display: 'flex', gap: '8px' }}>
            <ThemeToggle />
            <SoundToggle />
          </div>
          <button className="sidebar__signout" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile topbar */}
      <div className="sidebar__topbar">
        <Link href="/dashboard">
          <img src="/logo.PNG" alt="Flourish" style={{ height: '26px', width: 'auto' }} />
        </Link>
        <button
          className="sidebar__hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sidebar sidebar--desktop">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="sidebar__backdrop" onClick={() => setOpen(false)} />
          <aside className="sidebar sidebar--mobile">
            <div className="sidebar__mobile-header">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <img src="/logo.PNG" alt="Flourish" style={{ height: '26px', width: 'auto' }} />
              </Link>
              <button
                className="sidebar__close"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>
            <SidebarContent onNav={() => setOpen(false)} />
          </aside>
        </>
      )}
    </>
  )
}
