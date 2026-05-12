'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { STARTING_CASH, type SimPortfolio } from '@/lib/simulator'
import {
  type HoldingRow,
  type Prices,
  type DerivedRow,
  SECTOR_COLORS,
  CASH_COLOR,
} from '@/components/DashboardSimulator/types'
import PortfolioHeader from '@/components/DashboardSimulator/PortfolioHeader'
import SummaryStats    from '@/components/DashboardSimulator/SummaryStats'
import HoldingsTable   from '@/components/DashboardSimulator/HoldingsTable'
import AllocationChart from '@/components/DashboardSimulator/AllocationChart'
import ResetModal      from '@/components/DashboardSimulator/ResetModal'

export default function SimulatorOverviewPage() {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<SimPortfolio | null>(null)
  const [holdings, setHoldings]   = useState<HoldingRow[]>([])
  const [prices, setPrices]       = useState<Prices>({})
  const [loading, setLoading]     = useState(true)
  const [showReset, setShowReset] = useState(false)
  const [resetting, setResetting] = useState(false)

  const refreshPrices = useCallback(async (tickers: string[]) => {
    if (tickers.length === 0) return
    const { data } = await supabase.functions.invoke('get-prices', { body: { tickers } })
    if (data?.prices) setPrices(data.prices)
  }, [])

  const init = useCallback(async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) {
      await supabase.auth.signOut()
      router.replace('/login')
      return
    }

    let { data: port } = await supabase
      .from('virtual_portfolios')
      .select('id, cash_balance, created_at')
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (!port) {
      const { data: fresh } = await supabase
        .from('virtual_portfolios')
        .insert({ user_id: session.user.id })
        .select('id, cash_balance, created_at')
        .single()
      port = fresh
    }
    if (!port) return

    setPortfolio(port)

    const { data: h } = await supabase
      .from('holdings')
      .select('id, ticker, shares, avg_cost, stocks(name, flag, currency, exchange, sector)')
      .eq('portfolio_id', port.id)

    const rows = (h ?? []) as unknown as HoldingRow[]
    setHoldings(rows)
    setLoading(false)

    if (rows.length > 0) refreshPrices(rows.map(r => r.ticker))
  }, [router, refreshPrices])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    init()
    return () => subscription.unsubscribe()
  }, [router, init])

  useEffect(() => {
    if (holdings.length === 0) return
    const tickers = holdings.map(h => h.ticker)
    const id = setInterval(() => refreshPrices(tickers), 30_000)
    return () => clearInterval(id)
  }, [holdings, refreshPrices])

  const confirmReset = async () => {
    setResetting(true)
    const { error } = await supabase.rpc('reset_portfolio')
    setResetting(false)
    setShowReset(false)
    if (!error) {
      setHoldings([])
      setPrices({})
      setPortfolio(p => p ? { ...p, cash_balance: STARTING_CASH } : p)
    }
  }

  if (loading) {
    return <div className="dashboard-loading"><span className="auth-spinner" /></div>
  }

  // ── Derived values ──────────────────────────────────────────────────────────
  let holdingsValue = 0
  const rows: DerivedRow[] = holdings.map(h => {
    const p      = prices[h.ticker]
    const value  = p ? h.shares * p.price : null
    const cost   = h.shares * h.avg_cost
    const pnl    = value !== null ? value - cost : null
    const pnlPct = pnl !== null && cost > 0 ? (pnl / cost) * 100 : null
    if (value !== null) holdingsValue += value
    return { ...h, price: p ?? null, value, pnl, pnlPct }
  })

  const cash       = portfolio?.cash_balance ?? 0
  const totalValue = cash + holdingsValue
  const totalPnl   = totalValue - STARTING_CASH
  const totalPct   = (totalPnl / STARTING_CASH) * 100

  // ── Allocation pie data ─────────────────────────────────────────────────────
  const sectorMap = new Map<string, number>()
  for (const row of rows) {
    if (row.value === null) continue
    const sector = row.stocks.sector || 'Other'
    sectorMap.set(sector, (sectorMap.get(sector) ?? 0) + row.value)
  }
  const pieData: { name: string; value: number; color: string }[] = []
  sectorMap.forEach((value, name) => {
    pieData.push({ name, value: +value.toFixed(2), color: SECTOR_COLORS[name] ?? '#b0b8c4' })
  })
  if (cash > 0) pieData.push({ name: 'Cash', value: +cash.toFixed(2), color: CASH_COLOR })

  return (
    <div className="dashboard">
      <PortfolioHeader totalPnl={totalPnl} totalPct={totalPct} />
      <SummaryStats
        totalValue={totalValue}
        cash={cash}
        holdingsValue={holdingsValue}
        positionCount={holdings.length}
      />
      <HoldingsTable rows={rows} hasHoldings={holdings.length > 0} />
      <AllocationChart pieData={pieData} totalValue={totalValue} />
      <ResetModal
        show={showReset}
        resetting={resetting}
        onOpen={() => setShowReset(true)}
        onClose={() => setShowReset(false)}
        onConfirm={confirmReset}
      />
    </div>
  )
}
