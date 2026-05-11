'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'
import { lessons as ifsLessons } from '@/lib/lessons/investing-from-scratch'
import { computeLevel } from '@/lib/xp'

const IFS_SLUG = 'investing-from-scratch'
const IFS_TOTAL = ifsLessons.length

type PortfolioPreview = {
  id: string
  cash_balance: number
  tickers: string[]
}

type CompletionRow = {
  lesson_slug: string
  course_slug: string
  completed_at: string
}

function toDateKey(iso: string) {
  return new Date(iso).toLocaleDateString('sv-SE', { timeZone: 'Europe/London' })
}

function computeStreak(completions: CompletionRow[]): number {
  if (completions.length === 0) return 0

  const dateSet = new Set(completions.map(c => toDateKey(c.completed_at)))

  const todayKey = toDateKey(new Date().toISOString())
  const yesterdayKey = toDateKey(new Date(Date.now() - 86_400_000).toISOString())

  const startKey = dateSet.has(todayKey) ? todayKey
    : dateSet.has(yesterdayKey) ? yesterdayKey
    : null
  if (!startKey) return 0

  let streak = 0
  let cursor = new Date(startKey)
  while (dateSet.has(cursor.toLocaleDateString('sv-SE', { timeZone: 'Europe/London' }))) {
    streak++
    cursor = new Date(cursor.getTime() - 86_400_000)
  }
  return streak
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
  return cash_balance + (holdings ?? []).reduce(
    (sum, h) => sum + h.shares * (priceMap[h.ticker] ?? 0), 0
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [hasPortfolio, setHasPortfolio] = useState(false)
  const [portfolioTotal, setPortfolioTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [completions, setCompletions] = useState<CompletionRow[]>([])
  const previewRef = useRef<PortfolioPreview | null>(null)

  const refreshTotal = useCallback(async () => {
    if (!previewRef.current) return
    setPortfolioTotal(await computeTotal(previewRef.current))
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })

    const init = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }

      const noRemember = localStorage.getItem('fl_remember') === '0'
      const hasSessionCookie = document.cookie.split(';').some(c => c.trim().startsWith('fl_sess='))
      if (noRemember && !hasSessionCookie) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }

      const [{ data: profileData }, { data: portfolioData }, { data: completionData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', session.user.id).single(),
        supabase.from('virtual_portfolios').select('id, cash_balance').eq('user_id', session.user.id).maybeSingle(),
        supabase.from('lesson_completions').select('lesson_slug, course_slug, completed_at'),
      ])

      setProfile(profileData)
      setCompletions(completionData ?? [])

      if (portfolioData) {
        setHasPortfolio(true)
        const { data: holdingRows } = await supabase
          .from('holdings').select('ticker').eq('portfolio_id', portfolioData.id)
        const tickers = (holdingRows ?? []).map(h => h.ticker)
        const preview: PortfolioPreview = { id: portfolioData.id, cash_balance: portfolioData.cash_balance, tickers }
        previewRef.current = preview
        setPortfolioTotal(await computeTotal(preview))
      }

      setLoading(false)
    }
    init()

    return () => subscription.unsubscribe()
  }, [router])

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
  const totalXp = profile?.total_xp ?? 0
  const levelInfo = computeLevel(totalXp)

  const totalLessonsDone = completions.length
  const streak = computeStreak(completions)

  const ifsCompletedSlugs = new Set(
    completions.filter(c => c.course_slug === IFS_SLUG).map(c => c.lesson_slug)
  )
  const ifsCount = ifsCompletedSlugs.size
  const ifsPct = Math.round((ifsCount / IFS_TOTAL) * 100)
  const ifsAllDone = ifsCount === IFS_TOTAL
  const ifsNextLesson = ifsLessons.find(l => !ifsCompletedSlugs.has(l.slug)) ?? ifsLessons[0]
  const ifsCtaHref = `/dashboard/courses/${IFS_SLUG}/${ifsNextLesson.slug}`

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__greeting">Hey, {firstName} 👋</h1>
          <p className="dashboard__sub">Welcome back to Flourish. Keep up the great work 🌱.</p>
        </div>
        <div className="dashboard__level-badge">
          <span className="level-badge">Lv.{levelInfo.level}</span>
          <span className="level-badge__title">{levelInfo.title}</span>
        </div>
      </header>

      <div className="dashboard__grid">

        {/* Continue Learning */}
        <section className="dashboard-card dashboard-card--featured cl-card">
          {/* Course header */}
          <div className="cl-card__header">
            <div className="cl-card__thumb">📈</div>
            <div className="cl-card__head-text">
              <h2 className="cl-card__course-name">Investing from Scratch</h2>
              <p className="cl-card__lesson-line">
                {ifsAllDone
                  ? `All ${IFS_TOTAL} lessons complete`
                  : ifsCount > 0
                    ? `Lesson ${ifsNextLesson.num} of ${IFS_TOTAL} · ${ifsNextLesson.title}`
                    : `${IFS_TOTAL} lessons · start when you're ready`}
              </p>
            </div>
          </div>

          {/* Meta chips */}
          {!ifsAllDone && (
            <div className="cl-card__chips">
              <span className="cl-card__chip">⏱ {ifsNextLesson.duration} read</span>
              <span className="cl-card__chip-dot" />
              <span className="cl-card__chip cl-card__chip--xp">⭐ +20 XP</span>
              <span className="cl-card__chip-dot" />
              <span className="cl-card__chip cl-card__chip--level">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"/>
                  <rect x="4.5" y="4" width="3" height="8" rx="1" fill="currentColor"/>
                  <rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor"/>
                </svg>
                Beginner
              </span>
            </div>
          )}

          {/* Lesson description */}
          {!ifsAllDone && (
            <p className="cl-card__desc">{ifsNextLesson.intro}</p>
          )}
          {ifsAllDone && (
            <p className="cl-card__desc">You&apos;ve finished every lesson. Well done — keep your streak going with another course.</p>
          )}

          {/* Progress */}
          <div className="cl-card__progress-row">
            <span className="cl-card__progress-count">
              <strong>{ifsCount} of {IFS_TOTAL}</strong> lessons completed
            </span>
            <span className="cl-card__progress-pct">{ifsPct}% complete</span>
          </div>
          <div className="dashboard-progress" style={{ marginTop: '8px' }}>
            <div className="dashboard-progress__bar" style={{ width: `${ifsPct}%` }} />
          </div>

          {/* Next reward */}
          {!ifsAllDone && (
            <div className="cl-card__reward">
              <div className="cl-card__reward-badge">XP</div>
              <div className="cl-card__reward-text">
                <strong>Next reward</strong>
                <span>Complete this lesson to earn <span className="cl-card__reward-xp">+20 XP</span></span>
              </div>
              <span className="cl-card__reward-arrow">›</span>
            </div>
          )}

          {/* CTA */}
          {ifsAllDone ? (
            <Link href={`/dashboard/courses/${IFS_SLUG}`} className="cl-card__cta">
              <span className="cl-card__cta-play">🏆</span>
              View completed course
              <span className="cl-card__cta-arrow">›</span>
            </Link>
          ) : (
            <Link href={ifsCtaHref} className="cl-card__cta">
              <span className="cl-card__cta-play">▶</span>
              {ifsCount > 0 ? 'Continue learning' : 'Start learning'}
              <span className="cl-card__cta-arrow">›</span>
            </Link>
          )}

          {/* Footer stats */}
          <div className="cl-card__footer">
            <div className="cl-card__footer-chip">
              <span className="cl-card__footer-icon cl-card__footer-icon--trophy">🏆</span>
              <div>
                <strong>Finish this course to unlock</strong>
                <span>Investor badge 🛡️</span>
              </div>
            </div>
            <div className="cl-card__footer-chip">
              <span className="cl-card__footer-icon cl-card__footer-icon--xp">XP</span>
              <div>
                <strong>+100 XP</strong>
                <span>Course completion bonus</span>
              </div>
            </div>
            <div className="cl-card__footer-chip">
              <span className="cl-card__footer-icon cl-card__footer-icon--arrow">↗</span>
              <div>
                <strong>You&apos;re ahead of</strong>
                <span>72% of learners</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Your progress</p>
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">{totalLessonsDone}</span>
              <span className="dashboard-stat__label">Lessons done</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">{streak}</span>
              <span className="dashboard-stat__label">Day streak</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">{totalXp}</span>
              <span className="dashboard-stat__label">XP earned</span>
            </div>
          </div>
          <div className="xp-bar-wrap">
            <div className="xp-bar-wrap__labels">
              <span>Level {levelInfo.level} · {levelInfo.title}</span>
              {levelInfo.nextLevelXp !== null && (
                <span>{totalXp} / {levelInfo.nextLevelXp} XP</span>
              )}
            </div>
            <div className="xp-bar">
              <div className="xp-bar__fill" style={{ width: `${levelInfo.progressPct}%` }} />
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
              { title: 'What is compound interest?',  href: `/dashboard/courses/${IFS_SLUG}/lesson-4` },
              { title: 'ISAs explained for students', href: '/dashboard/courses/isas-and-tax-free-saving' },
              { title: 'How the stock market works',  href: '/dashboard/courses/stocks-etfs-and-funds' },
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
