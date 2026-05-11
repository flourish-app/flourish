'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { supabase } from '@/lib/supabase'
import {
  STARTING_CASH,
  formatPrice,
  formatChangePct,
  formatPnl,
  type SimPortfolio,
  type PriceData,
} from '@/lib/simulator'

type StockMeta = { name: string; flag: string; currency: string; exchange: string; sector: string }
type HoldingRow = {
  id: string
  ticker: string
  shares: number
  avg_cost: number
  stocks: StockMeta
}
type Prices = Record<string, PriceData>

const SECTOR_COLORS: Record<string, string> = {
  'Financials':        '#6b9e78',
  'Energy':            '#e8a87c',
  'Healthcare':        '#7eb8d4',
  'Consumer Staples':  '#c49bbf',
  'Consumer Discretionary': '#f0c97a',
  'Technology':        '#8ea5c4',
  'Materials':         '#a8c4a2',
  'Industrials':       '#b8b4d4',
  'Utilities':         '#d4a574',
  'Telecommunication': '#7abfbf',
  'Real Estate':       '#d4897a',
  'Other':             '#b0b8c4',
}
const CASH_COLOR = '#c8ced8'

function AllocTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{name}</p>
      <p>£{value.toFixed(2)}</p>
    </div>
  )
}

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

  // ── Derived values ─────────────────────────────────────────────────────────
  let holdingsValue = 0
  const rows = holdings.map(h => {
    const p       = prices[h.ticker]
    const value   = p ? h.shares * p.price : null
    const cost    = h.shares * h.avg_cost
    const pnl     = value !== null ? value - cost : null
    const pnlPct  = pnl !== null && cost > 0 ? (pnl / cost) * 100 : null
    if (value !== null) holdingsValue += value
    return { ...h, price: p ?? null, value, pnl, pnlPct }
  })

  const cash       = portfolio?.cash_balance ?? 0
  const totalValue = cash + holdingsValue
  const totalPnl   = totalValue - STARTING_CASH
  const totalPct   = (totalPnl / STARTING_CASH) * 100

  // ── Allocation pie data ────────────────────────────────────────────────────
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

      {/* ── Header ── */}
      <header className="sim-page-header">
        <div>
          <h1 className="dashboard__greeting">Portfolio</h1>
          <p className={`sim-alltime ${totalPnl >= 0 ? 'sim-pos' : 'sim-neg'}`}>
            {formatPnl(totalPnl)} ({totalPnl >= 0 ? '+' : ''}{totalPct.toFixed(2)}%) all time
          </p>
        </div>
        <Link href="/dashboard/simulator/stocks" className="btn btn--green btn--sm">
          Browse stocks →
        </Link>
      </header>

      {/* ── Summary stats ── */}
      <div className="sim-stats">
        <div className="sim-stat">
          <span className="sim-stat__label">Total value</span>
          <span className="sim-stat__value">£{totalValue.toFixed(2)}</span>
        </div>
        <div className="sim-stat">
          <span className="sim-stat__label">Cash</span>
          <span className="sim-stat__value">£{cash.toFixed(2)}</span>
        </div>
        <div className="sim-stat">
          <span className="sim-stat__label">Invested</span>
          <span className="sim-stat__value">£{holdingsValue.toFixed(2)}</span>
        </div>
        <div className="sim-stat">
          <span className="sim-stat__label">Positions</span>
          <span className="sim-stat__value">{holdings.length}</span>
        </div>
      </div>

      {/* ── Holdings ── */}
      <section className="sim-section">
        <div className="sim-section__header">
          <h2 className="sim-section__title">Holdings</h2>
          {holdings.length > 0 && (
            <Link href="/dashboard/simulator/history" className="sim-section__link">
              Transaction history →
            </Link>
          )}
        </div>

        {rows.length === 0 ? (
          <div className="sim-empty">
            <p className="sim-empty__heading">No positions yet</p>
            <p className="sim-empty__sub">
              You have £{STARTING_CASH.toLocaleString()} virtual cash ready to invest.
            </p>
            <Link href="/dashboard/simulator/stocks" className="btn btn--primary">
              Browse stocks
            </Link>
          </div>
        ) : (
          <div className="sim-table-wrap">
            <table className="sim-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th className="sim-col-r">Shares</th>
                  <th className="sim-col-r">Avg cost</th>
                  <th className="sim-col-r">Price</th>
                  <th className="sim-col-r">Value</th>
                  <th className="sim-col-r">P&amp;L</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.ticker}>
                    <td className="sim-stock-cell">
                      <span className="sim-flag">{row.stocks.flag}</span>
                      <span>
                        <span className="sim-stock-name">{row.stocks.name}</span>
                        <span className="sim-ticker">{row.ticker}</span>
                      </span>
                    </td>
                    <td className="sim-col-r">
                      {Number.isInteger(row.shares) ? row.shares : row.shares.toFixed(2)}
                    </td>
                    <td className="sim-col-r">
                      {formatPrice(row.avg_cost, row.stocks.currency)}
                    </td>
                    <td className="sim-col-r">
                      {row.price
                        ? <span>
                            {formatPrice(row.price.price, row.stocks.currency)}
                            <span className={`sim-change ${row.price.change_pct >= 0 ? 'sim-pos' : 'sim-neg'}`}>
                              {' '}{formatChangePct(row.price.change_pct)}
                            </span>
                          </span>
                        : <span className="sim-muted">—</span>}
                    </td>
                    <td className="sim-col-r">
                      {row.value !== null
                        ? `£${row.value.toFixed(2)}`
                        : <span className="sim-muted">—</span>}
                    </td>
                    <td className={`sim-col-r ${row.pnl !== null ? (row.pnl >= 0 ? 'sim-pos' : 'sim-neg') : ''}`}>
                      {row.pnl !== null
                        ? <>{formatPnl(row.pnl)} <span className="sim-pct">({row.pnlPct !== null ? `${row.pnlPct >= 0 ? '+' : ''}${row.pnlPct.toFixed(1)}%` : ''})</span></>
                        : <span className="sim-muted">—</span>}
                    </td>
                    <td>
                      <Link
                        href={`/dashboard/simulator/stocks/${encodeURIComponent(row.ticker)}`}
                        className="btn btn--outline btn--sm"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Allocation breakdown ── */}
      {pieData.length > 0 && (
        <section className="sim-section">
          <div className="sim-section__header">
            <h2 className="sim-section__title">Allocation</h2>
          </div>
          <div className="sim-alloc-card">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<AllocTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '0.78rem', color: 'var(--grey-4)' }}
                  formatter={(value, entry: any) => (
                    <span style={{ color: 'var(--grey-4)' }}>
                      {value} · {((entry.payload.value / totalValue) * 100).toFixed(1)}%
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* ── Reset portfolio ── */}
      <div className="sim-reset-zone">
        <button className="sim-reset-btn" onClick={() => setShowReset(true)}>
          Reset portfolio
        </button>
      </div>

      {/* ── Reset confirm modal ── */}
      {showReset && (
        <div className="sim-modal-overlay" onClick={() => !resetting && setShowReset(false)}>
          <div className="sim-modal" onClick={e => e.stopPropagation()}>
            <h2 className="sim-modal__title">Reset portfolio?</h2>
            <p className="sim-modal__body">
              This will clear all your holdings and restore your cash to £10,000.
              Your transaction history will be kept.
            </p>
            <div className="sim-modal__actions">
              <button
                className="btn btn--outline"
                onClick={() => setShowReset(false)}
                disabled={resetting}
              >
                Cancel
              </button>
              <button
                className="btn btn--danger"
                onClick={confirmReset}
                disabled={resetting}
              >
                {resetting ? 'Resetting…' : 'Yes, reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
