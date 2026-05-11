import { createClient } from 'jsr:@supabase/supabase-js@2'

const FINNHUB_KEY      = Deno.env.get('FINNHUB_API_KEY')!
const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// 30-second cache TTL — balances freshness against rate limits.
const CACHE_TTL_MS = 30_000
const MAX_TICKERS  = 50

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

type RawQuote = { c: number; d: number; dp: number }

async function fetchFinnhub(ticker: string): Promise<RawQuote> {
  const url  = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${FINNHUB_KEY}`
  const res  = await fetch(url)
  if (!res.ok) throw new Error(`Finnhub HTTP ${res.status} for ${ticker}`)
  const data = await res.json()
  if (!data.c || data.c === 0) throw new Error(`No price returned for ${ticker}`)
  return { c: data.c, d: data.d ?? 0, dp: data.dp ?? 0 }
}

async function fetchYahoo(ticker: string): Promise<RawQuote> {
  const url  = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`
  const res  = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`Yahoo HTTP ${res.status} for ${ticker}`)
  const data = await res.json()
  const meta = data?.chart?.result?.[0]?.meta
  if (!meta?.regularMarketPrice) throw new Error(`No price from Yahoo for ${ticker}`)
  const c  = meta.regularMarketPrice as number
  const pc = (meta.previousClose ?? meta.chartPreviousClose ?? c) as number
  const d  = c - pc
  const dp = pc !== 0 ? (d / pc) * 100 : 0
  return { c, d, dp }
}

// LSE tickers end in .L — use Yahoo Finance (Finnhub free tier excludes UK stocks)
function fetchQuote(ticker: string): Promise<RawQuote> {
  return ticker.endsWith('.L') ? fetchYahoo(ticker) : fetchFinnhub(ticker)
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: cors })
  }

  try {
    const body    = await req.json() as { tickers?: string[] }
    const tickers = Array.isArray(body?.tickers)
      ? body.tickers.slice(0, MAX_TICKERS)
      : null

    if (!tickers || tickers.length === 0) {
      return json({ error: 'tickers array required' }, 400)
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
    const cutoff   = new Date(Date.now() - CACHE_TTL_MS).toISOString()

    // ── 1. Fetch prices that are still fresh from cache ───────────────────────
    const { data: cached } = await supabase
      .from('stock_prices')
      .select('ticker, price, change, change_pct, updated_at')
      .in('ticker', tickers)
      .gte('updated_at', cutoff)

    const freshSet     = new Set(cached?.map((r) => r.ticker) ?? [])
    const staleTickers = tickers.filter((t) => !freshSet.has(t))

    // ── 2. Look up currencies for stale tickers (GBp needs ÷100) ─────────────
    let currencyMap = new Map<string, string>()
    if (staleTickers.length > 0) {
      const { data: meta } = await supabase
        .from('stocks')
        .select('ticker, currency')
        .in('ticker', staleTickers)
      currencyMap = new Map(meta?.map((s) => [s.ticker, s.currency]) ?? [])
    }

    // ── 3. Fetch stale tickers in parallel (Finnhub for US, Yahoo for LSE) ────
    type FetchResult = { ticker: string; c: number; d: number; dp: number }
    const fetched = await Promise.allSettled(
      staleTickers.map(async (ticker): Promise<FetchResult> => {
        const { c, d, dp } = await fetchQuote(ticker)
        return { ticker, c, d, dp }
      })
    )

    // ── 4. Apply GBp→GBP conversion, upsert into cache ───────────────────────
    const toUpsert = fetched
      .filter((r): r is PromiseFulfilledResult<FetchResult> => r.status === 'fulfilled')
      .map(({ value: { ticker, c, d, dp } }) => {
        const multiplier = currencyMap.get(ticker) === 'GBp' ? 0.01 : 1
        return {
          ticker,
          price:      +(c * multiplier).toFixed(4),
          change:     +(d * multiplier).toFixed(4),
          change_pct: +dp.toFixed(4),
          updated_at: new Date().toISOString(),
        }
      })

    if (toUpsert.length > 0) {
      const { error: upsertErr } = await supabase
        .from('stock_prices')
        .upsert(toUpsert, { onConflict: 'ticker' })
      if (upsertErr) console.error('Cache upsert error:', upsertErr.message)
    }

    // ── 5. Log any fetch failures ─────────────────────────────────────────────
    for (const r of fetched) {
      if (r.status === 'rejected') console.warn('Price fetch failed:', r.reason)
    }

    // ── 6. Merge fresh cache + newly fetched, return to client ────────────────
    type PriceRow = { price: number; change: number; change_pct: number; updated_at: string }
    const prices: Record<string, PriceRow> = {}

    for (const row of cached ?? []) {
      prices[row.ticker] = {
        price:      row.price,
        change:     row.change,
        change_pct: row.change_pct,
        updated_at: row.updated_at,
      }
    }
    for (const row of toUpsert) {
      prices[row.ticker] = {
        price:      row.price,
        change:     row.change,
        change_pct: row.change_pct,
        updated_at: row.updated_at,
      }
    }

    return json({ prices })
  } catch (err) {
    console.error('get-prices unhandled error:', err)
    return json({ error: 'Internal server error' }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}
