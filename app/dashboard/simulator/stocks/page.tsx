'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatPrice, formatChangePct, type SimStock, type PriceData } from '@/lib/simulator'

type Prices = Record<string, PriceData>

const ALL = 'All'
const EXCHANGES = [ALL, 'LSE', 'NASDAQ', 'NYSE']
const SECTORS   = [ALL, 'Technology', 'Financials', 'Healthcare', 'Energy', 'Consumer',
                   'Mining', 'Telecom', 'Utilities', 'Media', 'Automotive', 'ETF']

export default function StockBrowserPage() {
  const router = useRouter()
  const [stocks, setStocks]     = useState<SimStock[]>([])
  const [prices, setPrices]     = useState<Prices>({})
  const [search, setSearch]     = useState('')
  const [exchange, setExchange] = useState(ALL)
  const [sector, setSector]     = useState(ALL)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })

    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { router.replace('/login'); return }

      const { data } = await supabase
        .from('stocks')
        .select('ticker, name, exchange, currency, sector, flag, is_active')
        .eq('is_active', true)
        .order('exchange')
        .order('name')

      if (!data) return
      setStocks(data as SimStock[])
      setLoading(false)

      // Fetch all prices in one call
      const { data: pd } = await supabase.functions.invoke('get-prices', {
        body: { tickers: data.map(s => s.ticker) },
      })
      if (pd?.prices) setPrices(pd.prices)
    }

    load()
    return () => subscription.unsubscribe()
  }, [router])

  // Refresh prices every 30 s
  useEffect(() => {
    if (stocks.length === 0) return
    const id = setInterval(async () => {
      const { data } = await supabase.functions.invoke('get-prices', {
        body: { tickers: stocks.map(s => s.ticker) },
      })
      if (data?.prices) setPrices(data.prices)
    }, 30_000)
    return () => clearInterval(id)
  }, [stocks])

  if (loading) {
    return <div className="dashboard-loading"><span className="auth-spinner" /></div>
  }

  const filtered = stocks.filter(s => {
    const q = search.toLowerCase()
    const matchSearch   = !q || s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q)
    const matchExchange = exchange === ALL || s.exchange === exchange
    const matchSector   = sector === ALL  || s.sector   === sector
    return matchSearch && matchExchange && matchSector
  })

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <Link href="/dashboard/simulator" className="sim-back">← Portfolio</Link>
          <h1 className="dashboard__greeting">Browse stocks</h1>
          <p className="dashboard__sub">{stocks.length} stocks & ETFs · prices refresh every 30 s</p>
        </div>
      </header>

      {/* ── Search & filters ── */}
      <div className="sim-controls">
        <input
          className="sim-search"
          type="text"
          placeholder="Search by name or ticker…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="sim-filters">
          {EXCHANGES.map(ex => (
            <button
              key={ex}
              className={`sim-filter-btn ${exchange === ex ? 'sim-filter-btn--active' : ''}`}
              onClick={() => setExchange(ex)}
            >
              {ex}
            </button>
          ))}
        </div>
        <div className="sim-filters">
          {SECTORS.map(sec => (
            <button
              key={sec}
              className={`sim-filter-btn ${sector === sec ? 'sim-filter-btn--active' : ''}`}
              onClick={() => setSector(sec)}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stock list ── */}
      {filtered.length === 0 ? (
        <p className="sim-muted" style={{ marginTop: 24 }}>No stocks match your filters.</p>
      ) : (
        <div className="sim-table-wrap">
          <table className="sim-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Exchange</th>
                <th>Sector</th>
                <th className="sim-col-r">Price</th>
                <th className="sim-col-r">Today</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const p = prices[s.ticker]
                return (
                  <tr key={s.ticker}>
                    <td className="sim-stock-cell">
                      <span className="sim-flag">{s.flag}</span>
                      <span>
                        <span className="sim-stock-name">{s.name}</span>
                        <span className="sim-ticker">{s.ticker}</span>
                      </span>
                    </td>
                    <td><span className="sim-badge">{s.exchange}</span></td>
                    <td className="sim-muted">{s.sector}</td>
                    <td className="sim-col-r">
                      {p
                        ? formatPrice(p.price, s.currency)
                        : <span className="sim-muted">—</span>}
                    </td>
                    <td className={`sim-col-r ${p ? (p.change_pct >= 0 ? 'sim-pos' : 'sim-neg') : ''}`}>
                      {p
                        ? <>{p.change_pct >= 0 ? '+' : ''}{formatPrice(Math.abs(p.change), s.currency)} ({formatChangePct(p.change_pct)})</>
                        : <span className="sim-muted">—</span>}
                    </td>
                    <td>
                      <Link
                        href={`/dashboard/simulator/stocks/${encodeURIComponent(s.ticker)}`}
                        className="btn btn--outline btn--sm"
                      >
                        Trade →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="sim-disclaimer">
        US stock prices shown in USD · UK stock prices shown in GBP · Virtual portfolio only — no real money
      </p>
    </div>
  )
}
