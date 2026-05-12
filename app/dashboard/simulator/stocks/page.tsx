'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { type SimStock, type PriceData } from '@/lib/simulator'
import StockFilters from '@/components/SimulatorStocks/StockFilters'
import StockTable   from '@/components/SimulatorStocks/StockTable'

type Prices = Record<string, PriceData>
const ALL = 'All'

export default function StockBrowserPage() {
  const router = useRouter()
  const [stocks,   setStocks]   = useState<SimStock[]>([])
  const [prices,   setPrices]   = useState<Prices>({})
  const [flash,    setFlash]    = useState<Record<string, 'up' | 'down'>>({})
  const prevPricesRef           = useRef<Prices>({})
  const [search,   setSearch]   = useState('')
  const [exchange, setExchange] = useState(ALL)
  const [sector,   setSector]   = useState(ALL)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { router.replace('/login'); return }
      const { data } = await supabase.from('stocks').select('ticker, name, exchange, currency, sector, flag, is_active').eq('is_active', true).order('exchange').order('name')
      if (!data) return
      setStocks(data as SimStock[])
      setLoading(false)
      const { data: pd } = await supabase.functions.invoke('get-prices', { body: { tickers: data.map(s => s.ticker) } })
      if (pd?.prices) { prevPricesRef.current = pd.prices; setPrices(pd.prices) }
    }
    load()
    return () => subscription.unsubscribe()
  }, [router])

  const applyPrices = (next: Prices) => {
    const prev = prevPricesRef.current
    const newFlash: Record<string, 'up' | 'down'> = {}
    for (const t of Object.keys(next)) {
      if (prev[t] && next[t].price !== prev[t].price) newFlash[t] = next[t].price > prev[t].price ? 'up' : 'down'
    }
    prevPricesRef.current = next
    setPrices(next)
    if (Object.keys(newFlash).length) { setFlash(newFlash); setTimeout(() => setFlash({}), 950) }
  }

  useEffect(() => {
    if (stocks.length === 0) return
    const id = setInterval(async () => {
      const { data } = await supabase.functions.invoke('get-prices', { body: { tickers: stocks.map(s => s.ticker) } })
      if (data?.prices) applyPrices(data.prices)
    }, 30_000)
    return () => clearInterval(id)
  }, [stocks])

  if (loading) return <div className="dashboard-loading"><span className="auth-spinner" /></div>

  const filtered = stocks.filter(s => {
    const q = search.toLowerCase()
    return (!q || s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q))
      && (exchange === ALL || s.exchange === exchange)
      && (sector   === ALL || s.sector   === sector)
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
      <StockFilters
        search={search}   onSearch={setSearch}
        exchange={exchange} onExchange={setExchange}
        sector={sector}   onSector={setSector}
        totalStocks={stocks.length}
      />
      <StockTable stocks={filtered} prices={prices} flash={flash} />
      <p className="sim-disclaimer">
        US stock prices shown in USD · UK stock prices shown in GBP · Virtual portfolio only — no real money
      </p>
    </div>
  )
}
