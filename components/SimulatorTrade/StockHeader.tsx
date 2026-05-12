import { formatPrice, formatChangePct, type SimStock, type PriceData } from '@/lib/simulator'

type Props = {
  stock:      SimStock
  price:      PriceData | null
  priceFlash: 'up' | 'down' | null
}

export default function StockHeader({ stock, price, priceFlash }: Props) {
  return (
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
          <span className={`sim-trade-price__value ${priceFlash === 'up' ? 'sim-flash-up' : priceFlash === 'down' ? 'sim-flash-down' : ''}`}>
            {formatPrice(price.price, stock.currency)}
          </span>
          <span className={`sim-trade-price__change ${price.change_pct >= 0 ? 'sim-pos' : 'sim-neg'}`}>
            {price.change >= 0 ? '+' : ''}{formatPrice(Math.abs(price.change), stock.currency)} ({formatChangePct(price.change_pct)}) today
          </span>
        </div>
      ) : (
        <p className="sim-muted">Loading price…</p>
      )}
    </div>
  )
}
