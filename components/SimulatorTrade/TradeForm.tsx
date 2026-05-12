'use client'

import type { SimStock, SimPortfolio, PriceData } from '@/lib/simulator'
import type { Holding, TradeMode, TradeResult } from './types'

type Props = {
  mode:         TradeMode
  onModeChange: (m: TradeMode) => void
  shares:       string
  onShares:     (v: string) => void
  trading:      boolean
  result:       TradeResult
  onExecute:    () => void
  price:        PriceData | null
  portfolio:    SimPortfolio | null
  holding:      Holding
  stock:        SimStock
  maxBuy:       number
  maxSell:      number
  canTrade:     boolean
  estimatedAmt: number | null
}

export default function TradeForm({
  mode, onModeChange, shares, onShares, trading, result, onExecute,
  price, portfolio, holding, stock, maxBuy, maxSell, canTrade, estimatedAmt,
}: Props) {
  const sharesNum = parseFloat(shares) || 0

  return (
    <div className="sim-trade-card">
      <div className="sim-trade-tabs">
        <button
          className={`sim-trade-tab ${mode === 'BUY' ? 'sim-trade-tab--active sim-trade-tab--buy' : ''}`}
          onClick={() => { onModeChange('BUY'); onShares('') }}
        >
          Buy
        </button>
        <button
          className={`sim-trade-tab ${mode === 'SELL' ? 'sim-trade-tab--active sim-trade-tab--sell' : ''}`}
          onClick={() => { onModeChange('SELL'); onShares('') }}
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
          onChange={e => onShares(e.target.value)}
        />
        {mode === 'BUY' && price && (
          <button className="sim-trade-field__max" onClick={() => onShares(String(maxBuy))} type="button">
            Max {maxBuy}
          </button>
        )}
        {mode === 'SELL' && holding && (
          <button className="sim-trade-field__max" onClick={() => onShares(String(holding.shares))} type="button">
            Sell all {holding.shares}
          </button>
        )}
      </div>

      {sharesNum > 0 && price && (
        <div className="sim-trade-estimate">
          <span>{mode === 'BUY' ? 'Estimated cost' : 'Estimated proceeds'}</span>
          <span className="sim-trade-estimate__amt">£{(sharesNum * price.price).toFixed(2)}</span>
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
        onClick={onExecute}
        disabled={!canTrade || trading || !price}
      >
        {trading ? 'Executing…' : `Confirm ${mode === 'BUY' ? 'buy' : 'sell'}`}
      </button>
    </div>
  )
}
