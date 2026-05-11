'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, ReferenceLine,
} from 'recharts'
import { supabase } from '@/lib/supabase'
import {
  formatPrice,
  formatChangePct,
  formatPnl,
  type SimStock,
  type SimPortfolio,
  type PriceData,
} from '@/lib/simulator'

type Holding  = { shares: number; avg_cost: number } | null
type Candle   = { date: string; close: number }

function shortDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function CandleTooltip({ active, payload, label, currency }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{label}</p>
      <p style={{ color: 'var(--green)' }}>
        {formatPrice(payload[0].value, currency)}
      </p>
    </div>
  )
}

export default function TradePage() {
  const { ticker: rawTicker } = useParams() as { ticker: string }
  const ticker  = decodeURIComponent(rawTicker)
  const router  = useRouter()

  const [stock,     setStock]     = useState<SimStock | null>(null)
  const [portfolio, setPortfolio] = useState<SimPortfolio | null>(null)
  const [holding,   setHolding]   = useState<Holding>(null)
  const [price,     setPrice]     = useState<PriceData | null>(null)
  const [candles,   setCandles]   = useState<Candle[]>([])

  const [mode,    setMode]    = useState<'BUY' | 'SELL'>('BUY')
  const [shares,  setShares]  = useState('')
  const [trading, setTrading] = useState(false)
  const [result,  setResult]  = useState<{ ok: boolean; msg: string } | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPrice = useCallback(async () => {
    const { data } = await supabase.functions.invoke('get-prices', { body: { tickers: [ticker] } })
    if (data?.prices?.[ticker]) setPrice(data.prices[ticker])
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
    } catch {
      // chart just stays hidden
    }
  }, [ticker])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })

    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { router.replace('/login'); return }

      const { data: s } = await supabase
        .from('stocks')
        .select('*')
        .eq('ticker', ticker)
        .eq('is_active', true)
        .maybeSingle()

      if (!s) { router.replace('/dashboard/simulator/stocks'); return }
      setStock(s as SimStock)

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
      if (port) {
        setPortfolio(port as SimPortfolio)
        await fetchHolding(port.id)
      }

      await Promise.all([fetchPrice(), fetchCandles()])
      setLoading(false)
    }

    load()
    const priceInterval = setInterval(fetchPrice, 30_000)
    return () => {
      subscription.unsubscribe()
      clearInterval(priceInterval)
    }
  }, [router, ticker, fetchPrice, fetchHolding, fetchCandles])

  const executeTrade = async () => {
    const sharesNum = parseFloat(shares)
    if (!sharesNum || sharesNum <= 0) return

    setTrading(true)
    setResult(null)

    const { data, error } = await supabase.rpc('execute_trade', {
      p_ticker: ticker,
      p_type:   mode,
      p_shares: sharesNum,
    })

    setTrading(false)

    if (error || data?.error) {
      setResult({ ok: false, msg: data?.error ?? error?.message ?? 'Trade failed. Please try again.' })
      return
    }

    if (data?.cash_after !== undefined) {
      setPortfolio(p => p ? { ...p, cash_balance: data.cash_after } : p)
    }
    if (portfolio) await fetchHolding(portfolio.id)

    const desc = `${mode === 'BUY' ? 'Bought' : 'Sold'} ${sharesNum} share${sharesNum !== 1 ? 's' : ''} at £${(data.price as number).toFixed(2)} · total £${(data.total as number).toFixed(2)}`
    setResult({ ok: true, msg: desc })
    setShares('')
  }

  if (loading) {
    return <div className="dashboard-loading"><span className="auth-spinner" /></div>
  }
  if (!stock) return null

  const sharesNum     = parseFloat(shares) || 0
  const estimatedAmt  = price ? sharesNum * price.price : null
  const currentValue  = holding && price ? holding.shares * price.price : null
  const unrealisedPnl = holding && price
    ? (price.price - holding.avg_cost) * holding.shares
    : null
  const maxBuy  = price && portfolio ? Math.floor(portfolio.cash_balance / price.price) : 0
  const maxSell = holding ? holding.shares : 0

  const canTrade = sharesNum > 0 &&
    (mode === 'BUY'
      ? (estimatedAmt !== null && estimatedAmt <= (portfolio?.cash_balance ?? 0))
      : sharesNum <= maxSell)

  // Chart: label every ~5th point so x-axis isn't crowded
  const chartData = candles.map((c, i) => ({
    ...c,
    label: i === 0 || i === candles.length - 1 || i % 5 === 0 ? shortDate(c.date) : '',
  }))
  const chartMin = candles.length ? Math.min(...candles.map(c => c.close)) * 0.995 : undefined
  const chartMax = candles.length ? Math.max(...candles.map(c => c.close)) * 1.005 : undefined
  const firstClose = candles[0]?.close
  const lastClose  = candles[candles.length - 1]?.close
  const chartTrend = firstClose && lastClose ? lastClose >= firstClose : true

  return (
    <div className="dashboard">

      <Link href="/dashboard/simulator/stocks" className="sim-back">
        ← All stocks
      </Link>

      {/* ── Stock header ── */}
      <div className="sim-trade-header">
        <div className="sim-trade-hero">
          <span className="sim-trade-flag">{stock.flag}</span>
          <div>
            <h1 className="sim-trade-name">{stock.name}</h1>
            <p className="sim-trade-meta">{stock.ticker} · {stock.exchange} · {stock.sector}</p>
          </div>
        </div>

        {price ? (
          <div className="sim-trade-price">
            <span className="sim-trade-price__value">{formatPrice(price.price, stock.currency)}</span>
            <span className={`sim-trade-price__change ${price.change_pct >= 0 ? 'sim-pos' : 'sim-neg'}`}>
              {price.change >= 0 ? '+' : ''}{formatPrice(Math.abs(price.change), stock.currency)} ({formatChangePct(price.change_pct)}) today
            </span>
          </div>
        ) : (
          <p className="sim-muted">Loading price…</p>
        )}
      </div>

      {/* ── 30-day price chart ── */}
      {chartData.length >= 2 && (
        <div className="sim-mini-chart-card">
          <p className="sim-mini-chart-title">30-day price history</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: 'var(--grey-3)' }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                domain={[chartMin!, chartMax!]}
                tick={{ fontSize: 10, fill: 'var(--grey-3)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${stock.currency === 'USD' ? '$' : '£'}${v.toFixed(0)}`}
                width={52}
              />
              <Tooltip content={<CandleTooltip currency={stock.currency} />} />
              {firstClose && (
                <ReferenceLine
                  y={firstClose}
                  stroke="var(--grey-2)"
                  strokeDasharray="4 3"
                />
              )}
              <Line
                type="monotone"
                dataKey="close"
                stroke={chartTrend ? 'var(--green)' : '#c0392b'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="sim-trade-layout">

        {/* ── Trade form ── */}
        <div className="sim-trade-card">
          <div className="sim-trade-tabs">
            <button
              className={`sim-trade-tab ${mode === 'BUY' ? 'sim-trade-tab--active sim-trade-tab--buy' : ''}`}
              onClick={() => { setMode('BUY'); setShares(''); setResult(null) }}
            >
              Buy
            </button>
            <button
              className={`sim-trade-tab ${mode === 'SELL' ? 'sim-trade-tab--active sim-trade-tab--sell' : ''}`}
              onClick={() => { setMode('SELL'); setShares(''); setResult(null) }}
              disabled={!holding || holding.shares === 0}
            >
              Sell
            </button>
          </div>

          <div className="sim-trade-field">
            <label className="sim-trade-field__label" htmlFor="shares-input">
              Number of shares
            </label>
            <input
              id="shares-input"
              className="sim-trade-field__input"
              type="number"
              min="1"
              step="1"
              placeholder="0"
              value={shares}
              onChange={e => { setShares(e.target.value); setResult(null) }}
            />
            {mode === 'BUY' && price && (
              <button
                className="sim-trade-field__max"
                onClick={() => setShares(String(maxBuy))}
                type="button"
              >
                Max {maxBuy}
              </button>
            )}
            {mode === 'SELL' && holding && (
              <button
                className="sim-trade-field__max"
                onClick={() => setShares(String(holding.shares))}
                type="button"
              >
                Sell all {holding.shares}
              </button>
            )}
          </div>

          {sharesNum > 0 && price && (
            <div className="sim-trade-estimate">
              <span>{mode === 'BUY' ? 'Estimated cost' : 'Estimated proceeds'}</span>
              <span className="sim-trade-estimate__amt">
                £{(sharesNum * price.price).toFixed(2)}
              </span>
            </div>
          )}

          <div className="sim-trade-cash">
            <span>Available cash</span>
            <span>£{(portfolio?.cash_balance ?? 0).toFixed(2)}</span>
          </div>

          {result && (
            <div className={`sim-trade-result ${result.ok ? 'sim-trade-result--ok' : 'sim-trade-result--err'}`}>
              {result.msg}
            </div>
          )}

          <button
            className={`btn btn--lg sim-trade-confirm ${mode === 'BUY' ? 'btn--green' : 'btn--primary'}`}
            onClick={executeTrade}
            disabled={!canTrade || trading || !price}
          >
            {trading ? 'Executing…' : `Confirm ${mode === 'BUY' ? 'buy' : 'sell'}`}
          </button>
        </div>

        {/* ── Current position ── */}
        <div className="sim-position-card">
          <p className="sim-position-card__title">Your position</p>

          {holding && holding.shares > 0 ? (
            <>
              <div className="sim-position-row">
                <span>Shares held</span>
                <strong>{holding.shares}</strong>
              </div>
              <div className="sim-position-row">
                <span>Avg cost</span>
                <strong>{formatPrice(holding.avg_cost, stock.currency)}</strong>
              </div>
              {currentValue !== null && (
                <div className="sim-position-row">
                  <span>Current value</span>
                  <strong>£{currentValue.toFixed(2)}</strong>
                </div>
              )}
              {unrealisedPnl !== null && (
                <div className={`sim-position-row sim-position-pnl ${unrealisedPnl >= 0 ? 'sim-pos' : 'sim-neg'}`}>
                  <span>Unrealised P&amp;L</span>
                  <strong>
                    {formatPnl(unrealisedPnl)}
                    {holding.avg_cost > 0 && (
                      <span className="sim-pct">
                        {' '}({unrealisedPnl >= 0 ? '+' : ''}{((unrealisedPnl / (holding.avg_cost * holding.shares)) * 100).toFixed(1)}%)
                      </span>
                    )}
                  </strong>
                </div>
              )}
            </>
          ) : (
            <p className="sim-muted">You don't hold any {stock.name}.</p>
          )}

          <Link href="/dashboard/simulator" className="sim-position-card__link">
            View full portfolio →
          </Link>
        </div>

      </div>
    </div>
  )
}
