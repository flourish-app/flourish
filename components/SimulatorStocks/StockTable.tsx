import Link from 'next/link'
import { formatPrice, formatChangePct, type SimStock, type PriceData } from '@/lib/simulator'

type Prices = Record<string, PriceData>

type Props = {
  stocks: SimStock[]
  prices: Prices
  flash:  Record<string, 'up' | 'down'>
}

export default function StockTable({ stocks, prices, flash }: Props) {
  if (stocks.length === 0) {
    return <p className="sim-muted" style={{ marginTop: 24 }}>No stocks match your filters.</p>
  }

  return (
    <div className="sim-table-wrap">
      <table className="sim-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Exchange</th>
            <th>Sector</th>
            <th className="sim-col-r">Price</th>
            <th className="sim-col-r">Today</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {stocks.map(s => {
            const p = prices[s.ticker]
            return (
              <tr key={s.ticker}>
                <td className="sim-stock-cell">
                  <span className="sim-flag">{s.flag}</span>
                  <span>
                    <span className="sim-stock-name">{s.name}</span>
                    <span className="sim-ticker">{s.ticker}</span>
                  </span>
                </td>
                <td><span className="sim-badge">{s.exchange}</span></td>
                <td className="sim-muted">{s.sector}</td>
                <td className="sim-col-r">
                  {p ? (
                    <span className={flash[s.ticker] === 'up' ? 'sim-flash-up' : flash[s.ticker] === 'down' ? 'sim-flash-down' : ''}>
                      {formatPrice(p.price, s.currency)}
                    </span>
                  ) : <span className="sim-muted">—</span>}
                </td>
                <td className={`sim-col-r ${p ? (p.change_pct >= 0 ? 'sim-pos' : 'sim-neg') : ''}`}>
                  {p
                    ? <>{p.change_pct >= 0 ? '+' : ''}{formatPrice(Math.abs(p.change), s.currency)} ({formatChangePct(p.change_pct)})</>
                    : <span className="sim-muted">—</span>}
                </td>
                <td>
                  <Link
                    href={`/dashboard/simulator/stocks/${encodeURIComponent(s.ticker)}`}
                    className="btn btn--outline btn--sm"
                  >
                    Trade →
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
