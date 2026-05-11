'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'

type PortfolioPreview = {
  id: string
  cash_balance: number
  tickers: string[]
}

async function computeTotal(preview: PortfolioPreview): Promise<number> {
  const { tickers, cash_balance } = preview
  if (tickers.length === 0) return cash_balance

  const { data: holdings } = await supabase
    .from('holdings')
    .select('ticker, shares')
    .eq('portfolio_id', preview.id)

  const { data: prices } = await supabase
    .from('stock_prices')
    .select('ticker, price')
    .in('ticker', tickers)

  const priceMap = Object.fromEntries((prices ?? []).map(p => [p.ticker, p.price as number]))
  const holdingsValue = (holdings ?? []).reduce(
    (sum, h) => sum + h.shares * (priceMap[h.ticker] ?? 0),
    0
  )
  return cash_balance + holdingsValue
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [hasPortfolio, setHasPortfolio] = useState(false)
  const [portfolioTotal, setPortfolioTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const previewRef = useRef<PortfolioPreview | null>(null)

  const refreshTotal = useCallback(async () => {
    if (!previewRef.current) return
    const total = await computeTotal(previewRef.current)
    setPortfolioTotal(total)
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/login')
      }
    })

    const init = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }
      // Enforce "remember me = off": if user unchecked it, only allow access
      // while the browser session cookie is present (cleared on browser close)
      const noRemember = localStorage.getItem('fl_remember') === '0'
      const hasSessionCookie = document.cookie.split(';').some(c => c.trim().startsWith('fl_sess='))
      if (noRemember && !hasSessionCookie) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }

      const [{ data: profileData }, { data: portfolioData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', session.user.id).single(),
        supabase.from('virtual_portfolios').select('id, cash_balance').eq('user_id', session.user.id).maybeSingle(),
      ])
      setProfile(profileData)

      if (portfolioData) {
        setHasPortfolio(true)
        const { data: holdingRows } = await supabase
          .from('holdings')
          .select('ticker')
          .eq('portfolio_id', portfolioData.id)

        const tickers = (holdingRows ?? []).map(h => h.ticker)
        const preview: PortfolioPreview = { id: portfolioData.id, cash_balance: portfolioData.cash_balance, tickers }
        previewRef.current = preview
        const total = await computeTotal(preview)
        setPortfolioTotal(total)
      }

      setLoading(false)
    }
    init()

    return () => subscription.unsubscribe()
  }, [router])

  // Refresh total every 30s when there are holdings
  useEffect(() => {
    if (!previewRef.current || previewRef.current.tickers.length === 0) return
    const id = setInterval(refreshTotal, 30_000)
    return () => clearInterval(id)
  }, [hasPortfolio, refreshTotal])

  if (loading) {
    return (
      <div className="dashboard-loading">
        <span className="auth-spinner" />
      </div>
    )
  }

  const firstName = profile?.first_name ?? 'there'

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__greeting">Hey, {firstName} 👋</h1>
          <p className="dashboard__sub">Welcome back to Flourish. Keep up the great work.</p>
        </div>
      </header>

      <div className="dashboard__grid">

        {/* Continue Learning */}
        <section className="dashboard-card dashboard-card--featured">
          <p className="dashboard-card__eyebrow">Continue learning</p>
          <h2 className="dashboard-card__title">Introduction to Investing</h2>
          <p className="dashboard-card__desc">Lesson 3 of 8 · Stocks and shares explained</p>
          <div className="dashboard-progress">
            <div className="dashboard-progress__bar" style={{ width: '37%' }} />
          </div>
          <span className="dashboard-progress__label">37% complete</span>
          <button className="btn btn--green btn--sm" style={{ marginTop: '16px' }}>
            Resume lesson
          </button>
        </section>

        {/* Stats */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Your progress</p>
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Lessons done</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Day streak</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Points earned</span>
            </div>
          </div>
        </section>

        {/* Portfolio preview */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Portfolio simulator</p>
          <h2 className="dashboard-card__title">
            {portfolioTotal !== null ? `£${portfolioTotal.toFixed(2)}` : '£—'}
          </h2>
          <p className="dashboard-card__desc">
            {hasPortfolio
              ? 'Continue trading your virtual portfolio and practise investing risk-free.'
              : 'Start your virtual portfolio to practise investing risk-free.'}
          </p>
          <Link href="/dashboard/simulator" className="btn btn--outline btn--sm" style={{ marginTop: '16px' }}>
            {hasPortfolio ? 'Continue trading' : 'Get started'}
          </Link>
        </section>

        {/* Recommended */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Recommended for you</p>
          <ul className="dashboard-lessons">
            {[
              { title: 'What is compound interest?',    href: '/dashboard/courses/investing-from-scratch' },
              { title: 'ISAs explained for students',   href: '/dashboard/courses/isas-and-tax-free-saving' },
              { title: 'How the stock market works',    href: '/dashboard/courses/stocks-etfs-and-funds' },
            ].map(({ title, href }) => (
              <li key={title} className="dashboard-lesson">
                <span className="dashboard-lesson__dot" />
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
