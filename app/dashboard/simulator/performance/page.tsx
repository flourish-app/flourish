'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { supabase } from '@/lib/supabase'
import { STARTING_CASH } from '@/lib/simulator'

type Snapshot = {
  snapshot_date: string
  total_value:   number
  ftse_close:    number | null
}

type ChartPoint = {
  date:      string
  label:     string
  portfolio: number
  ftse:      number | null
}

function shortDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toFixed(1)}
          <span className="sim-chart-tooltip__pct"> ({entry.value >= 100 ? '+' : ''}{(entry.value - 100).toFixed(1)}%)</span>
        </p>
      ))}
    </div>
  )
}

export default function PerformancePage() {
  const router = useRouter()

  const [snapshots,  setSnapshots]  = useState<Snapshot[]>([])
  const [liveValue,  setLiveValue]  = useState<number | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [portfolioId, setPortfolioId] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) { router.replace('/login'); return }

    // Get portfolio
    let { data: port } = await supabase
      .from('virtual_portfolios')
      .select('id, cash_balance')
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (!port) {
      const { data: fresh } = await supabase
        .from('virtual_portfolios')
        .insert({ user_id: session.user.id })
        .select('id, cash_balance')
        .single()
      port = fresh
    }
    if (!port) { setLoading(false); return }
    setPortfolioId(port.id)

    // Historical snapshots
    const { data: snaps } = await supabase
      .from('portfolio_snapshots')
      .select('snapshot_date, total_value, ftse_close')
      .eq('portfolio_id', port.id)
      .order('snapshot_date', { ascending: true })

    setSnapshots(snaps ?? [])

    // Live portfolio value (holdings + cash)
    const { data: holdings } = await supabase
      .from('holdings')
      .select('ticker, shares')
      .eq('portfolio_id', port.id)

    if (holdings && holdings.length > 0) {
      const { data: priceData } = await supabase.functions.invoke('get-prices', {
        body: { tickers: holdings.map(h => h.ticker) },
      })
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

  // ── Build chart data ──────────────────────────────────────────────────────
  // Find first FTSE reference point for normalisation
  const firstFtse = snapshots.find(s => s.ftse_close !== null)?.ftse_close ?? null

  const chartData: ChartPoint[] = snapshots.map(s => ({
    date:      s.snapshot_date,
    label:     shortDate(s.snapshot_date),
    portfolio: +((s.total_value / STARTING_CASH) * 100).toFixed(2),
    ftse:      firstFtse && s.ftse_close
      ? +((s.ftse_close / firstFtse) * 100).toFixed(2)
      : null,
  }))

  // Append today's live point if it's not already in snapshots
  const today     = new Date().toISOString().split('T')[0]
  const hasToday  = snapshots.some(s => s.snapshot_date === today)
  if (liveValue !== null && !hasToday) {
    chartData.push({
      date:      today,
      label:     'Today',
      portfolio: +((liveValue / STARTING_CASH) * 100).toFixed(2),
      ftse:      null, // live FTSE not available without a separate fetch
    })
  }

  // ── Summary stats ─────────────────────────────────────────────────────────
  const currentValue    = liveValue ?? STARTING_CASH
  const totalReturn     = ((currentValue - STARTING_CASH) / STARTING_CASH) * 100
  const latestFtse      = snapshots.filter(s => s.ftse_close !== null).at(-1)?.ftse_close ?? null
  const ftseReturn      = firstFtse && latestFtse
    ? ((latestFtse - firstFtse) / firstFtse) * 100
    : null
  const beating         = ftseReturn !== null ? totalReturn > ftseReturn : null

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <Link href="/dashboard/simulator" className="sim-back">← Portfolio</Link>
          <h1 className="dashboard__greeting">Performance</h1>
          <p className="dashboard__sub">Your portfolio vs the FTSE 100</p>
        </div>
      </header>

      {/* ── Summary stats ── */}
      <div className="sim-perf-stats">
        <div className="sim-perf-stat">
          <p className="sim-perf-stat__label">Portfolio value</p>
          <p className="sim-perf-stat__value">£{currentValue.toFixed(2)}</p>
          <p className={`sim-perf-stat__return ${totalReturn >= 0 ? 'sim-pos' : 'sim-neg'}`}>
            {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}% since inception
          </p>
        </div>

        <div className={`sim-perf-vs ${beating === true ? 'sim-perf-vs--beating' : beating === false ? 'sim-perf-vs--lagging' : ''}`}>
          {beating === true && <><span>📈</span> Beating the market</>}
          {beating === false && <><span>📉</span> Behind the market</>}
          {beating === null && <><span>📊</span> Insufficient data</>}
        </div>

        <div className="sim-perf-stat">
          <p className="sim-perf-stat__label">FTSE 100</p>
          {ftseReturn !== null
            ? <>
                <p className="sim-perf-stat__value" style={{ color: 'var(--grey-4)' }}>
                  {latestFtse?.toFixed(0)}
                </p>
                <p className={`sim-perf-stat__return ${ftseReturn >= 0 ? 'sim-pos' : 'sim-neg'}`}>
                  {ftseReturn >= 0 ? '+' : ''}{ftseReturn.toFixed(2)}% same period
                </p>
              </>
            : <p className="sim-muted" style={{ marginTop: 8 }}>Available from first snapshot</p>
          }
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="sim-chart-card">
        {chartData.length < 2 ? (
          <div className="sim-chart-empty">
            <p className="sim-chart-empty__heading">Not enough data yet</p>
            <p className="sim-chart-empty__sub">
              Your portfolio vs FTSE 100 chart builds up over time.
              The first snapshot is taken automatically at 5pm on trading days.
              Come back tomorrow to see your first data point.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grey-2)" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: 'var(--grey-3)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 11, fill: 'var(--grey-3)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${v.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px', color: 'var(--grey-4)' }}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                name="Your portfolio"
                stroke="var(--green)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="ftse"
                name="FTSE 100"
                stroke="var(--grey-3)"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={false}
                activeDot={{ r: 3 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="sim-disclaimer">
        Chart indexed to 100 at portfolio start · FTSE 100 updated daily at market close · Virtual portfolio only
      </p>
    </div>
  )
}
