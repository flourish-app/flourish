'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { type SimTransaction } from '@/lib/simulator'

const ALL  = 'All'
const FILTERS = [ALL, 'BUY', 'SELL'] as const
type Filter = typeof FILTERS[number]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function HistoryPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<SimTransaction[]>([])
  const [filter, setFilter] = useState<Filter>(ALL)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(e => {
      if (e === 'SIGNED_OUT') router.replace('/login')
    })

    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { router.replace('/login'); return }

      const { data: port } = await supabase
        .from('virtual_portfolios')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle()

      if (!port) { setLoading(false); return }

      const { data: txns } = await supabase
        .from('transactions')
        .select('id, ticker, stock_name, type, shares, price, total, cash_after, executed_at')
        .eq('portfolio_id', port.id)
        .order('executed_at', { ascending: false })

      setTransactions((txns ?? []) as SimTransaction[])
      setLoading(false)
    }

    load()
    return () => subscription.unsubscribe()
  }, [router])

  if (loading) return <div className="dashboard-loading"><span className="auth-spinner" /></div>

  const visible = filter === ALL
    ? transactions
    : transactions.filter(t => t.type === filter)

  // ── Aggregate stats ───────────────────────────────────────────────────────
  const totalBuys  = transactions.filter(t => t.type === 'BUY').length
  const totalSells = transactions.filter(t => t.type === 'SELL').length
  const totalVolume = transactions.reduce((sum, t) => sum + t.total, 0)

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <Link href="/dashboard/simulator" className="sim-back">← Portfolio</Link>
          <h1 className="dashboard__greeting">Transaction history</h1>
          <p className="dashboard__sub">{transactions.length} trade{transactions.length !== 1 ? 's' : ''} · £{totalVolume.toFixed(2)} total volume</p>
        </div>
      </header>

      {transactions.length === 0 ? (
        <div className="sim-empty">
          <p className="sim-empty__heading">No trades yet</p>
          <p className="sim-empty__sub">Your full transaction history will appear here after your first trade.</p>
          <Link href="/dashboard/simulator/stocks" className="btn btn--primary">
            Browse stocks
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="sim-stats" style={{ marginBottom: 20 }}>
            <div className="sim-stat">
              <span className="sim-stat__label">Total trades</span>
              <span className="sim-stat__value">{transactions.length}</span>
            </div>
            <div className="sim-stat">
              <span className="sim-stat__label">Buys</span>
              <span className="sim-stat__value">{totalBuys}</span>
            </div>
            <div className="sim-stat">
              <span className="sim-stat__label">Sells</span>
              <span className="sim-stat__value">{totalSells}</span>
            </div>
            <div className="sim-stat">
              <span className="sim-stat__label">Total volume</span>
              <span className="sim-stat__value">£{totalVolume.toFixed(2)}</span>
            </div>
          </div>

          {/* Filter */}
          <div className="sim-filters" style={{ marginBottom: 16 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`sim-filter-btn ${filter === f ? 'sim-filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="sim-table-wrap">
            <table className="sim-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th className="sim-col-r">Shares</th>
                  <th className="sim-col-r">Price</th>
                  <th className="sim-col-r">Total</th>
                  <th className="sim-col-r">Cash after</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(t => (
                  <tr key={t.id}>
                    <td className="sim-muted" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                      {formatDate(t.executed_at)}
                    </td>
                    <td className="sim-stock-cell">
                      <span>
                        <span className="sim-stock-name">{t.stock_name}</span>
                        <span className="sim-ticker">{t.ticker}</span>
                      </span>
                    </td>
                    <td>
                      <span className={`sim-type-badge sim-type-badge--${t.type.toLowerCase()}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="sim-col-r">{t.shares}</td>
                    <td className="sim-col-r">£{t.price.toFixed(2)}</td>
                    <td className="sim-col-r">£{t.total.toFixed(2)}</td>
                    <td className="sim-col-r sim-muted">£{t.cash_after.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
