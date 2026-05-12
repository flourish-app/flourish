import type { PriceData } from '@/lib/simulator'

export type StockMeta = { name: string; flag: string; currency: string; exchange: string; sector: string }

export type HoldingRow = {
  id: string
  ticker: string
  shares: number
  avg_cost: number
  stocks: StockMeta
}

export type Prices = Record<string, PriceData>

export type DerivedRow = HoldingRow & {
  price: PriceData | null
  value: number | null
  pnl: number | null
  pnlPct: number | null
}

export const SECTOR_COLORS: Record<string, string> = {
  'Financials':             '#6b9e78',
  'Energy':                 '#e8a87c',
  'Healthcare':             '#7eb8d4',
  'Consumer Staples':       '#c49bbf',
  'Consumer Discretionary': '#f0c97a',
  'Technology':             '#8ea5c4',
  'Materials':              '#a8c4a2',
  'Industrials':            '#b8b4d4',
  'Utilities':              '#d4a574',
  'Telecommunication':      '#7abfbf',
  'Real Estate':            '#d4897a',
  'Other':                  '#b0b8c4',
}

export const CASH_COLOR = '#c8ced8'
