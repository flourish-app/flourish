'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { STARTING_CASH } from '@/lib/simulator'
import PerformanceStats from '@/components/SimulatorPerformance/PerformanceStats'
import PerformanceChart from '@/components/SimulatorPerformance/PerformanceChart'

type Snapshot   = { snapshot_date: string; total_value: number; ftse_close: number | null }
type ChartPoint = { date: string; label: string; portfolio: number; ftse: number | null }

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function PerformancePage() {
  const router = useRouter()
  const [snapshots,  setSnapshots]  = useState<Snapshot[]>([])
  const [liveValue,  setLiveValue]  = useState<number | null>(null)
  const [loading,    setLoading]    = useState(true)

  const loadData = useCallback(async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) { router.replace('/login'); return }

    let { data: port } = await supabase.from('virtual_portfolios').select('id, cash_balance').eq('user_id', session.user.id).maybeSingle()
    if (!port) {
      const { data: fresh } = await supabase.from('virtual_portfolios').insert({ user_id: session.user.id }).select('id, cash_balance').single()
      port = fresh
    }
    if (!port) { setLoading(false); return }

    const { data: snaps } = await supabase
      .from('portfolio_snapshots')
      .select('snapshot_date, total_value, ftse_close')
      .eq('portfolio_id', port.id)
      .order('snapshot_date', { ascending: true })
    setSnapshots(snaps ?? [])

    const { data: holdings } = await supabase.from('holdings').select('ticker, shares').eq('portfolio_id', port.id)
    if (holdings && holdings.length > 0) {
      const { data: priceData } = await supabase.functions.invoke('get-prices', { body: { tickers: holdings.map(h => h.ticker) } })
      if (priceData?.prices) {
        const hv = holdings.reduce((sum, h) => sum + h.shares * (priceData.prices[h.ticker]?.price ?? 0), 0)
        setLiveValue(+(port.cash_balance + hv).toFixed(2))
      } else {
        setLiveValue(port.cash_balance)
      }
    } else {
      setLiveValue(port.cash_balance)
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(e => {
      if (e === 'SIGNED_OUT') router.replace('/login')
    })
    loadData()
    return () => subscription.unsubscribe()
  }, [router, loadData])

  if (loading) return <div className="dashboard-loading"><span className="auth-spinner" /></div>

  const firstFtse = snapshots.find(s => s.ftse_close !== null)?.ftse_close ?? null
  const chartData: ChartPoint[] = snapshots.map(s => ({
    date:      s.snapshot_date,
    label:     shortDate(s.snapshot_date),
    portfolio: +((s.total_value / STARTING_CASH) * 100).toFixed(2),
    ftse:      firstFtse && s.ftse_close ? +((s.ftse_close / firstFtse) * 100).toFixed(2) : null,
  }))

  const today    = new Date().toISOString().split('T')[0]
  const hasToday = snapshots.some(s => s.snapshot_date === today)
  if (liveValue !== null && !hasToday) {
    chartData.push({ date: today, label: 'Today', portfolio: +((liveValue / STARTING_CASH) * 100).toFixed(2), ftse: null })
  }

  const currentValue = liveValue ?? STARTING_CASH
  const totalReturn  = ((currentValue - STARTING_CASH) / STARTING_CASH) * 100
  const latestFtse   = snapshots.filter(s => s.ftse_close !== null).at(-1)?.ftse_close ?? null
  const ftseReturn   = firstFtse && latestFtse ? ((latestFtse - firstFtse) / firstFtse) * 100 : null
  const beating      = ftseReturn !== null ? totalReturn > ftseReturn : null

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <Link href="/dashboard/simulator" className="sim-back">← Portfolio</Link>
          <h1 className="dashboard__greeting">Performance</h1>
          <p className="dashboard__sub">Your portfolio vs the FTSE 100</p>
        </div>
      </header>
      <PerformanceStats
        currentValue={currentValue}
        totalReturn={totalReturn}
        ftseReturn={ftseReturn}
        latestFtse={latestFtse}
        beating={beating}
      />
      <PerformanceChart chartData={chartData} />
      <p className="sim-disclaimer">
        Chart indexed to 100 at portfolio start · FTSE 100 updated daily at market close · Virtual portfolio only
      </p>
    </div>
  )
}
