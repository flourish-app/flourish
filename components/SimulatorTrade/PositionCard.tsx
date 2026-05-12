import Link from 'next/link'
import { formatPrice, formatPnl, type SimStock, type PriceData } from '@/lib/simulator'
import type { Holding } from './types'

type Props = {
  holding:       Holding
  stock:         SimStock
  price:         PriceData | null
  currentValue:  number | null
  unrealisedPnl: number | null
}

export default function PositionCard({ holding, stock, price, currentValue, unrealisedPnl }: Props) {
  return (
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
        <p className="sim-muted">You don&apos;t hold any {stock.name}.</p>
      )}

      <Link href="/dashboard/simulator" className="sim-position-card__link">
        View full portfolio →
      </Link>
    </div>
  )
}
