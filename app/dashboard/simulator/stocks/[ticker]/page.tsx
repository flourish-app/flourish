'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { type SimStock, type SimPortfolio, type PriceData } from '@/lib/simulator'
import StockHeader  from '@/components/SimulatorTrade/StockHeader'
import PriceChart   from '@/components/SimulatorTrade/PriceChart'
import TradeForm    from '@/components/SimulatorTrade/TradeForm'
import PositionCard from '@/components/SimulatorTrade/PositionCard'
import type { Holding, TradeMode, TradeResult, Candle } from '@/components/SimulatorTrade/types'

function shortDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function TradePage() {
  const { ticker: rawTicker } = useParams() as { ticker: string }
  const ticker = decodeURIComponent(rawTicker)
  const router = useRouter()

  const [stock,     setStock]     = useState<SimStock | null>(null)
  const [portfolio, setPortfolio] = useState<SimPortfolio | null>(null)
  const [holding,   setHolding]   = useState<Holding>(null)
  const [price,     setPrice]     = useState<PriceData | null>(null)
  const [candles,   setCandles]   = useState<Candle[]>([])

  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null)
  const prevPriceRef                = useRef<number | null>(null)

  const [mode,    setMode]    = useState<TradeMode>('BUY')
  const [shares,  setShares]  = useState('')
  const [trading, setTrading] = useState(false)
  const [result,  setResult]  = useState<TradeResult>(null)
  const [loading, setLoading] = useState(true)

  const fetchPrice = useCallback(async () => {
    const { data } = await supabase.functions.invoke('get-prices', { body: { tickers: [ticker] } })
    if (data?.prices?.[ticker]) {
      const next = data.prices[ticker] as PriceData
      const prev = prevPriceRef.current
      if (prev !== null && next.price !== prev) {
        const dir = next.price > prev ? 'up' : 'down'
        setPriceFlash(dir)
        setTimeout(() => setPriceFlash(null), 950)
      }
      prevPriceRef.current = next.price
      setPrice(next)
    }
  }, [ticker])

  const fetchHolding = useCallback(async (portfolioId: string) => {
    const { data } = await supabase
      .from('holdings')
      .select('shares, avg_cost')
      .eq('portfolio_id', portfolioId)
      .eq('ticker', ticker)
      .maybeSingle()
    setHolding(data)
  }, [ticker])

  const fetchCandles = useCallback(async () => {
    try {
      const res  = await fetch(`/api/stocks/${encodeURIComponent(ticker)}/candles?days=30`)
      const data = await res.json() as { candles: Candle[] }
      if (data.candles?.length) setCandles(data.candles)
    } catch { /* chart stays hidden */ }
  }, [ticker])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { router.replace('/login'); return }

      const { data: s } = await supabase.from('stocks').select('*').eq('ticker', ticker).eq('is_active', true).maybeSingle()
      if (!s) { router.replace('/dashboard/simulator/stocks'); return }
      setStock(s as SimStock)

      let { data: port } = await supabase.from('virtual_portfolios').select('id, cash_balance, created_at').eq('user_id', session.user.id).maybeSingle()
      if (!port) {
        const { data: fresh } = await supabase.from('virtual_portfolios').insert({ user_id: session.user.id }).select('id, cash_balance, created_at').single()
        port = fresh
      }
      if (port) { setPortfolio(port as SimPortfolio); await fetchHolding(port.id) }
      await Promise.all([fetchPrice(), fetchCandles()])
      setLoading(false)
    }
    load()
    const priceInterval = setInterval(fetchPrice, 30_000)
    return () => { subscription.unsubscribe(); clearInterval(priceInterval) }
  }, [router, ticker, fetchPrice, fetchHolding, fetchCandles])

  const executeTrade = async () => {
    const sharesNum = parseFloat(shares)
    if (!sharesNum || sharesNum <= 0) return
    setTrading(true)
    setResult(null)
    const { data, error } = await supabase.rpc('execute_trade', { p_ticker: ticker, p_type: mode, p_shares: sharesNum })
    setTrading(false)
    if (error || data?.error) {
      setResult({ ok: false, msg: data?.error ?? error?.message ?? 'Trade failed. Please try again.' })
      return
    }
    if (data?.cash_after !== undefined) setPortfolio(p => p ? { ...p, cash_balance: data.cash_after } : p)
    if (portfolio) await fetchHolding(portfolio.id)
    const desc = `${mode === 'BUY' ? 'Bought' : 'Sold'} ${sharesNum} share${sharesNum !== 1 ? 's' : ''} at £${(data.price as number).toFixed(2)} · total £${(data.total as number).toFixed(2)}`
    setResult({ ok: true, msg: desc })
    setShares('')
  }

  if (loading) return <div className="dashboard-loading"><span className="auth-spinner" /></div>
  if (!stock)  return null

  const sharesNum     = parseFloat(shares) || 0
  const estimatedAmt  = price ? sharesNum * price.price : null
  const currentValue  = holding && price ? holding.shares * price.price : null
  const unrealisedPnl = holding && price ? (price.price - holding.avg_cost) * holding.shares : null
  const maxBuy        = price && portfolio ? Math.floor(portfolio.cash_balance / price.price) : 0
  const maxSell       = holding ? holding.shares : 0
  const canTrade      = sharesNum > 0 && (
    mode === 'BUY'
      ? (estimatedAmt !== null && estimatedAmt <= (portfolio?.cash_balance ?? 0))
      : sharesNum <= maxSell
  )

  const chartData = candles.map((c, i) => ({
    ...c,
    label: i === 0 || i === candles.length - 1 || i % 5 === 0 ? shortDate(c.date) : '',
  }))
  const chartMin    = candles.length ? Math.min(...candles.map(c => c.close)) * 0.995 : undefined
  const chartMax    = candles.length ? Math.max(...candles.map(c => c.close)) * 1.005 : undefined
  const firstClose  = candles[0]?.close
  const lastClose   = candles[candles.length - 1]?.close
  const chartTrend  = firstClose && lastClose ? lastClose >= firstClose : true

  return (
    <div className="dashboard">
      <Link href="/dashboard/simulator/stocks" className="sim-back">← All stocks</Link>
      <StockHeader stock={stock} price={price} priceFlash={priceFlash} />
      <PriceChart
        chartData={chartData}
        currency={stock.currency}
        chartMin={chartMin}
        chartMax={chartMax}
        firstClose={firstClose}
        chartTrend={chartTrend}
      />
      <div className="sim-trade-layout">
        <TradeForm
          mode={mode}
          onModeChange={m => { setMode(m); setResult(null) }}
          shares={shares}
          onShares={v => { setShares(v); setResult(null) }}
          trading={trading}
          result={result}
          onExecute={executeTrade}
          price={price}
          portfolio={portfolio}
          holding={holding}
          stock={stock}
          maxBuy={maxBuy}
          maxSell={maxSell}
          canTrade={canTrade}
          estimatedAmt={estimatedAmt}
        />
        <PositionCard
          holding={holding}
          stock={stock}
          price={price}
          currentValue={currentValue}
          unrealisedPnl={unrealisedPnl}
        />
      </div>
    </div>
  )
}
