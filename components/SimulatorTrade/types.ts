export type { SimStock, PriceData } from '@/lib/simulator'

export type Holding  = { shares: number; avg_cost: number } | null
export type Candle   = { date: string; close: number; label?: string }
export type TradeMode = 'BUY' | 'SELL'
export type TradeResult = { ok: boolean; msg: string } | null
