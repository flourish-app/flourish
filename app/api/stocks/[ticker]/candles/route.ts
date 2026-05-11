import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker: rawTicker } = await params
  const ticker = decodeURIComponent(rawTicker)
  const days   = Math.min(parseInt(req.nextUrl.searchParams.get('days') ?? '30', 10), 365)
  const range  = days <= 30 ? '1mo' : days <= 90 ? '3mo' : '1y'

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: stock } = await supabase
    .from('stocks')
    .select('currency')
    .eq('ticker', ticker)
    .maybeSingle()

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=1d`
    const res  = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    const data = await res.json() as {
      chart: { result?: Array<{
        timestamp: number[]
        indicators: { quote: Array<{ close: (number | null)[] }> }
      }> }
    }

    const result = data?.chart?.result?.[0]
    if (!result) return NextResponse.json({ candles: [] })

    // GBp stocks are returned in pence by Yahoo Finance — divide by 100
    const multiplier = stock?.currency === 'GBp' ? 0.01 : 1
    const closes     = result.indicators.quote[0].close

    const candles = result.timestamp
      .map((ts, i) => ({ ts, close: closes[i] }))
      .filter(({ close }) => close !== null && close !== undefined)
      .map(({ ts, close }) => ({
        date:  new Date(ts * 1000).toISOString().split('T')[0],
        close: +(close! * multiplier).toFixed(4),
      }))

    return NextResponse.json({ candles }, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return NextResponse.json({ candles: [] })
  }
}
