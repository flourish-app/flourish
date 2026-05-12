'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'
import { lessons as ifsLessons } from '@/lib/lessons/investing-from-scratch'
import { computeLevel } from '@/lib/xp'
import { type PortfolioPreview, type CompletionRow } from '@/components/Dashboard/types'
import { computeStreak } from '@/components/Dashboard/utils'
import DashboardHeader       from '@/components/Dashboard/DashboardHeader'
import ContinueLearningCard  from '@/components/Dashboard/ContinueLearningCard'
import ProgressStatsCard     from '@/components/Dashboard/ProgressStatsCard'
import PortfolioPreviewCard  from '@/components/Dashboard/PortfolioPreviewCard'
import RecommendedCard       from '@/components/Dashboard/RecommendedCard'

const IFS_SLUG  = 'investing-from-scratch'
const IFS_TOTAL = ifsLessons.length

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
  const [profile, setProfile]               = useState<Profile | null>(null)
  const [hasPortfolio, setHasPortfolio]     = useState(false)
  const [portfolioTotal, setPortfolioTotal] = useState<number | null>(null)
  const [loading, setLoading]               = useState(true)
  const [completions, setCompletions]       = useState<CompletionRow[]>([])
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

      const noRemember      = localStorage.getItem('fl_remember') === '0'
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
    return <div className="dashboard-loading"><span className="auth-spinner" /></div>
  }

  // ── Derived values ──────────────────────────────────────────────────────────
  const firstName  = profile?.first_name ?? 'there'
  const totalXp    = profile?.total_xp ?? 0
  const levelInfo  = computeLevel(totalXp)
  const streak     = computeStreak(completions)

  const ifsCompletedSlugs = new Set(
    completions.filter(c => c.course_slug === IFS_SLUG).map(c => c.lesson_slug)
  )
  const ifsCount      = ifsCompletedSlugs.size
  const ifsPct        = Math.round((ifsCount / IFS_TOTAL) * 100)
  const ifsAllDone    = ifsCount === IFS_TOTAL
  const ifsNextLesson = ifsLessons.find(l => !ifsCompletedSlugs.has(l.slug)) ?? ifsLessons[0]
  const ifsCtaHref    = `/dashboard/courses/${IFS_SLUG}/${ifsNextLesson.slug}`

  return (
    <div className="dashboard">
      <DashboardHeader
        firstName={firstName}
        level={levelInfo.level}
        levelTitle={levelInfo.title}
      />
      <div className="dashboard__grid">
        <ContinueLearningCard
          nextLesson={ifsNextLesson}
          completedCount={ifsCount}
          totalLessons={IFS_TOTAL}
          pct={ifsPct}
          allDone={ifsAllDone}
          ctaHref={ifsCtaHref}
          courseSlug={IFS_SLUG}
        />
        <ProgressStatsCard
          totalLessonsDone={completions.length}
          streak={streak}
          totalXp={totalXp}
          level={levelInfo.level}
          levelTitle={levelInfo.title}
          nextLevelXp={levelInfo.nextLevelXp}
          progressPct={levelInfo.progressPct}
        />
        <PortfolioPreviewCard
          portfolioTotal={portfolioTotal}
          hasPortfolio={hasPortfolio}
        />
        <RecommendedCard />
      </div>
    </div>
  )
}
