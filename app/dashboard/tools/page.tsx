'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Category = 'all' | 'calculator' | 'tracker' | 'profiler'
type SortBy   = 'popular' | 'a-z' | 'newest'
type ViewMode = 'grid' | 'list'

const TOOLS = [
  {
    id: 'compound-calculator',
    category: 'calculator' as const,
    emoji: '📈',
    title: 'Compound interest calculator',
    desc: 'See exactly how your money grows over time. Adjust your starting amount, monthly contributions, and expected return to understand the real power of starting early.',
    href: '/dashboard/tools/compound-calculator',
    popular: true,
    uses: '9.2K',
    order: 1,
  },
  {
    id: 'isa-tracker',
    category: 'tracker' as const,
    emoji: '💰',
    title: 'ISA allowance tracker',
    desc: "Track how much of your £20,000 annual ISA allowance you've used across each ISA type — Cash, Stocks & Shares, LISA, and Innovative Finance — and see what's left before April.",
    href: '/dashboard/tools/isa-tracker',
    popular: false,
    uses: '6.8K',
    order: 2,
  },
  {
    id: 'risk-profiler',
    category: 'profiler' as const,
    emoji: '⚖️',
    title: 'Risk profiler',
    desc: 'Five questions. Two minutes. Find out what kind of investor you are — conservative, cautious, balanced, or adventurous — and what that means for how you should invest.',
    href: '/dashboard/tools/risk-profiler',
    popular: false,
    uses: '4.3K',
    order: 3,
  },
  {
    id: 'lisa-calculator',
    category: 'calculator' as const,
    emoji: '🏠',
    title: 'LISA calculator',
    desc: "Model your Lifetime ISA savings with the 25% government bonus included. See how your pot grows towards a first home or retirement and exactly how much free money you'll earn.",
    href: '/dashboard/tools/lisa-calculator',
    popular: false,
    uses: '2.1K',
    order: 4,
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  calculator: 'Calculator',
  tracker:    'Tracker',
  profiler:   'Profiler',
}

const STATS = [
  { value: '4',    label: 'Tools',    sub: 'Available' },
  { value: '£0',   label: 'Cost',     sub: 'Always free' },
  { value: '0',    label: 'Sign-up',  sub: 'Required' },
  { value: '10K+', label: 'Students', sub: 'Using our tools' },
]

const BADGES = [
  { icon: '🛡️', title: '100% free',         sub: 'Always will be' },
  { icon: '💡', title: 'Helpful insights',   sub: 'Visualise your money' },
  { icon: '🎓', title: 'Built for students', sub: 'Simple, clear, helpful' },
]

const TIPS = [
  {
    icon: '📊',
    iconBg: '#fef2f2',
    title: 'Why compound interest is your greatest ally',
    time: '3 min',
    href: '/dashboard/courses/investing-from-scratch',
  },
  {
    icon: '🐷',
    iconBg: '#fdf4ff',
    title: 'How to make the most of your ISA allowance',
    time: '4 min',
    href: '/dashboard/courses/isas-and-tax-free-saving',
  },
  {
    icon: '🎯',
    iconBg: '#f0f9f4',
    title: 'Choosing the right risk level for you',
    time: '4 min',
    href: '/dashboard/courses/stocks-etfs-and-funds',
  },
]

function MiniChart() {
  return (
    <div className="ttools-featured__chart-wrap">
      <div className="ttools-featured__chart-badge">
        Future value<br /><strong>£47,316</strong>
      </div>
      <svg viewBox="0 0 200 82" xmlns="http://www.w3.org/2000/svg" className="ttools-featured__chart-svg">
        {/* Shaded area */}
        <path d="M10,72 C60,72 110,42 190,8 L190,82 L10,82 Z" fill="#d4ece0" opacity="0.6" />
        {/* Curve */}
        <path d="M10,72 C60,72 110,42 190,8" stroke="#2e7d5e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Dots */}
        <circle cx="10"  cy="72" r="3.2" fill="#2e7d5e" />
        <circle cx="75"  cy="60" r="3.2" fill="#2e7d5e" />
        <circle cx="138" cy="35" r="3.2" fill="#2e7d5e" />
        <circle cx="190" cy="8"  r="3.2" fill="#2e7d5e" />
        {/* Dashed horizontal from third dot */}
        <line x1="138" y1="35" x2="190" y2="35" stroke="#2e7d5e" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
      </svg>
      <div className="ttools-featured__chart-labels">
        <span>Today</span>
        <span>20 years</span>
      </div>
    </div>
  )
}

export default function ToolsDirectoryPage() {
  const router   = useRouter()
  const [ready,    setReady]    = useState(false)
  const [category, setCategory] = useState<Category>('all')
  const [search,   setSearch]   = useState('')
  const [sortBy,   setSortBy]   = useState<SortBy>('popular')
  const [view,     setView]     = useState<ViewMode>('grid')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { supabase.auth.signOut(); router.replace('/login') }
      else setReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    return () => subscription.unsubscribe()
  }, [router])

  const filtered = useMemo(() => {
    let tools = [...TOOLS]
    if (category !== 'all') tools = tools.filter(t => t.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      tools = tools.filter(t =>
        t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'a-z')    tools.sort((a, b) => a.title.localeCompare(b.title))
    if (sortBy === 'popular') tools.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    if (sortBy === 'newest')  tools.sort((a, b) => b.order - a.order)
    return tools
  }, [category, search, sortBy])

  if (!ready) return null

  const popularTools = [...TOOLS].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)).slice(0, 3)

  return (
    <div className="tools-page">

      {/* ── Main column ──────────────────────────────────────── */}
      <div className="tools-page__main">

        {/* Hero */}
        <div className="tools-page__hero">
          <div className="tools-page__hero-left">
            <p className="tools-page__eyebrow">ALL TOOLS</p>
            <h1 className="tools-page__headline">
              Understand your money<br />
              <em className="tools-page__headline-em">in minutes</em> 🌱
            </h1>
            <p className="tools-page__sub">
              Free calculators, trackers and profilers built for UK students.<br />
              No account needed — just open and use.
            </p>
            <div className="tools-page__badges">
              {BADGES.map(b => (
                <div key={b.title} className="tools-page__badge">
                  <span className="tools-page__badge-icon">{b.icon}</span>
                  <div>
                    <span className="tools-page__badge-title">{b.title}</span>
                    <span className="tools-page__badge-sub">{b.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tools-page__stats-box">
            {STATS.map(s => (
              <div key={s.label} className="tools-page__stat">
                <span className="tools-page__stat-value">{s.value}</span>
                <span className="tools-page__stat-label">{s.label}</span>
                <span className="tools-page__stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="tools-page__controls">
          <div className="tools-page__tabs">
            {(['all', 'calculator', 'tracker', 'profiler'] as Category[]).map(c => (
              <button
                key={c}
                className={`tools-page__tab${category === c ? ' tools-page__tab--active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c === 'all' ? 'All tools' : CATEGORY_LABELS[c] + 's'}
              </button>
            ))}
          </div>

          <div className="tools-page__right-controls">
            <div className="tools-page__search-wrap">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                className="tools-page__search"
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              className="tools-page__sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortBy)}
            >
              <option value="popular">Most Popular</option>
              <option value="a-z">A–Z</option>
              <option value="newest">Newest</option>
            </select>

            <div className="tools-page__view-toggle">
              <button
                className={`tools-page__view-btn${view === 'grid' ? ' tools-page__view-btn--active' : ''}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
                </svg>
              </button>
              <button
                className={`tools-page__view-btn${view === 'list' ? ' tools-page__view-btn--active' : ''}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2"    width="14" height="2.5" rx="1.25" fill="currentColor" />
                  <rect x="1" y="6.75" width="14" height="2.5" rx="1.25" fill="currentColor" />
                  <rect x="1" y="11.5" width="14" height="2.5" rx="1.25" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tool cards */}
        <div className={view === 'grid' ? 'tools-page__grid' : 'tools-page__list'}>
          {filtered.length === 0 && (
            <p className="tools-page__empty">No tools match your search.</p>
          )}
          {filtered.map(tool => (
            <Link
              key={tool.id}
              href={tool.href}
              className={`dtool-card${view === 'list' ? ' dtool-card--list' : ''}`}
            >
              <div className="dtool-card__badges">
                <span className="dtool-card__category">{CATEGORY_LABELS[tool.category]}</span>
                {tool.popular && <span className="dtool-card__popular">Most popular</span>}
              </div>
              <div className="dtool-card__body">
                <div className="dtool-card__icon">{tool.emoji}</div>
                <div>
                  <h3 className="dtool-card__title">{tool.title}</h3>
                  <p className="dtool-card__desc">{tool.desc}</p>
                </div>
              </div>
              <div className="dtool-card__footer">
                <span className="dtool-card__meta">Free · No account needed</span>
                <span className="dtool-card__cta">Open tool →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Right aside ──────────────────────────────────────── */}
      <aside className="tools-page__aside">

        {/* Featured tool */}
        <div className="ttools-featured">
          <p className="ttools-section-label">
            <span className="ttools-section-label__dot" />
            Featured tool
          </p>
          <h3 className="ttools-featured__title">Compound interest calculator</h3>
          <p className="ttools-featured__desc">
            See how small, consistent contributions can grow into something big over time.
          </p>
          <MiniChart />
          <Link href="/dashboard/tools/compound-calculator" className="btn btn--green btn--sm ttools-featured__btn">
            Try it now →
          </Link>
        </div>

        {/* Popular right now */}
        <div className="ttools-popular">
          <p className="ttools-section-label">
            <span className="ttools-section-label__dot" />
            Popular right now
          </p>
          <ol className="ttools-popular__list">
            {popularTools.map((tool, i) => (
              <li key={tool.id} className="ttools-popular__item">
                <Link href={tool.href} className="ttools-popular__link">
                  <span className="ttools-popular__rank">{i + 1}</span>
                  <span className="ttools-popular__name">{tool.title}</span>
                  <span className={`ttools-popular__badge ttools-popular__badge--${tool.category}`}>
                    {CATEGORY_LABELS[tool.category]}
                  </span>
                  <span className="ttools-popular__uses">{tool.uses} uses</span>
                  <span className="ttools-popular__chevron">›</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips & learning */}
        <div className="ttools-tips">
          <div className="ttools-tips__header">
            <p className="ttools-section-label" style={{ margin: 0 }}>
              <span className="ttools-section-label__dot" />
              Tips &amp; learning
            </p>
            <Link href="/dashboard/courses" className="ttools-tips__view-all">View all →</Link>
          </div>
          <ul className="ttools-tips__list">
            {TIPS.map(tip => (
              <li key={tip.title}>
                <Link href={tip.href} className="ttools-tips__item">
                  <div className="ttools-tips__icon" style={{ background: tip.iconBg }}>{tip.icon}</div>
                  <div className="ttools-tips__text">
                    <span className="ttools-tips__title">{tip.title}</span>
                    <span className="ttools-tips__meta">Read time · {tip.time}</span>
                  </div>
                  <span className="ttools-tips__chevron">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Need help */}
        <div className="ttools-help">
          <div className="ttools-help__icon">🎧</div>
          <div className="ttools-help__text">
            <p className="ttools-help__title">Need help?</p>
            <p className="ttools-help__sub">Check out our FAQ or contact the team.</p>
          </div>
          <Link href="/dashboard" className="ttools-help__btn">Visit help centre →</Link>
        </div>

      </aside>
    </div>
  )
}
