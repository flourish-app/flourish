/**
 * Daily portfolio snapshot — called by Vercel Cron at 17:00 UTC Mon–Fri
 * (30 min after London market close at 16:30).
 *
 * For each portfolio it records:
 *   total_value, cash, holdings_value, ftse_close
 *
 * Env vars required (server-side, not NEXT_PUBLIC_):
 *   SUPABASE_SERVICE_ROLE_KEY
 *   FINNHUB_API_KEY
 *   CRON_SECRET   ← Vercel sends this automatically as Authorization: Bearer <secret>
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // ── 1. FTSE 100 close ────────────────────────────────────────────────────
  let ftseClose: number | null = null
  try {
    const res  = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=%5EFTSE&token=${process.env.FINNHUB_API_KEY}`
    )
    const data = await res.json()
    // Use previous close (pc) for a settled end-of-day value; fall back to current (c)
    ftseClose = data.pc ?? data.c ?? null
  } catch (err) {
    console.error('FTSE fetch error:', err)
  }

  // ── 2. All portfolios ────────────────────────────────────────────────────
  const { data: portfolios, error: portErr } = await supabase
    .from('virtual_portfolios')
    .select('id, cash_balance')

  if (portErr) {
    console.error('Portfolio fetch error:', portErr.message)
    return NextResponse.json({ error: portErr.message }, { status: 500 })
  }
  if (!portfolios?.length) {
    return NextResponse.json({ ok: true, snapshotted: 0 })
  }

  // ── 3. All holdings ──────────────────────────────────────────────────────
  const { data: allHoldings } = await supabase
    .from('holdings')
    .select('portfolio_id, ticker, shares')

  // ── 4. Latest cached prices for every held ticker ────────────────────────
  const tickers = [...new Set((allHoldings ?? []).map(h => h.ticker))]
  let priceMap: Record<string, number> = {}

  if (tickers.length > 0) {
    const { data: prices } = await supabase
      .from('stock_prices')
      .select('ticker, price')
      .in('ticker', tickers)
    priceMap = Object.fromEntries((prices ?? []).map(p => [p.ticker, p.price]))
  }

  // ── 5. Build snapshot rows ───────────────────────────────────────────────
  const today     = new Date().toISOString().split('T')[0]
  const snapshots = portfolios.map(p => {
    const held          = (allHoldings ?? []).filter(h => h.portfolio_id === p.id)
    const holdingsValue = held.reduce((sum, h) => sum + h.shares * (priceMap[h.ticker] ?? 0), 0)
    const totalValue    = p.cash_balance + holdingsValue
    return {
      portfolio_id:   p.id,
      total_value:    +totalValue.toFixed(2),
      cash:           p.cash_balance,
      holdings_value: +holdingsValue.toFixed(2),
      ftse_close:     ftseClose,
      snapshot_date:  today,
    }
  })

  const { error: upsertErr } = await supabase
    .from('portfolio_snapshots')
    .upsert(snapshots, { onConflict: 'portfolio_id,snapshot_date' })

  if (upsertErr) {
    console.error('Snapshot upsert error:', upsertErr.message)
    return NextResponse.json({ error: upsertErr.message }, { status: 500 })
  }

  console.log(`Snapshotted ${snapshots.length} portfolio(s) — FTSE: ${ftseClose}`)
  return NextResponse.json({ ok: true, snapshotted: snapshots.length, ftse: ftseClose })
}
