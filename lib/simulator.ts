// Shared types and utilities for the portfolio simulator

export const STARTING_CASH = 10_000

export type SimStock = {
  ticker: string
  name: string
  exchange: string
  currency: string   // 'GBp' (LSE pence, converted to £ by Edge Fn) | 'USD'
  sector: string
  flag: string
  is_active: boolean
}

export type PriceData = {
  price: number
  change: number
  change_pct: number
  updated_at: string
}

export type SimPortfolio = {
  id: string
  cash_balance: number
  created_at: string
}

export type SimHolding = {
  id: string
  ticker: string
  shares: number
  avg_cost: number
}

export type SimTransaction = {
  id: string
  ticker: string
  stock_name: string
  type: 'BUY' | 'SELL'
  shares: number
  price: number
  total: number
  cash_after: number
  executed_at: string
}

/** £ for GBp/GBP stocks, $ for USD */
export function currencySymbol(currency: string): string {
  return currency === 'USD' ? '$' : '£'
}

/** e.g. £25.43 or $195.23 */
export function formatPrice(price: number, currency: string): string {
  return `${currencySymbol(currency)}${price.toFixed(2)}`
}

/** e.g. +1.27% or -0.42% */
export function formatChangePct(pct: number): string {
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`
}

/** e.g. +£234.50 or -£80.00 — always in virtual £ */
export function formatPnl(pnl: number): string {
  return `${pnl >= 0 ? '+' : '-'}£${Math.abs(pnl).toFixed(2)}`
}
