import Link from 'next/link'
import { STARTING_CASH, formatPrice, formatChangePct, formatPnl } from '@/lib/simulator'
import type { DerivedRow } from './types'

type Props = {
  rows: DerivedRow[]
  hasHoldings: boolean
}

export default function HoldingsTable({ rows, hasHoldings }: Props) {
  return (
    <section className="sim-section">
      <div className="sim-section__header">
        <h2 className="sim-section__title">Holdings</h2>
        {hasHoldings && (
          <Link href="/dashboard/simulator/history" className="sim-section__link">
            Transaction history →
          </Link>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="sim-empty">
          <p className="sim-empty__heading">No positions yet</p>
          <p className="sim-empty__sub">
            You have £{STARTING_CASH.toLocaleString()} virtual cash ready to invest.
          </p>
          <Link href="/dashboard/simulator/stocks" className="btn btn--primary">
            Browse stocks
          </Link>
        </div>
      ) : (
        <div className="sim-table-wrap">
          <table className="sim-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th className="sim-col-r">Shares</th>
                <th className="sim-col-r">Avg cost</th>
                <th className="sim-col-r">Price</th>
                <th className="sim-col-r">Value</th>
                <th className="sim-col-r">P&amp;L</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.ticker}>
                  <td className="sim-stock-cell">
                    <span className="sim-flag">{row.stocks.flag}</span>
                    <span>
                      <span className="sim-stock-name">{row.stocks.name}</span>
                      <span className="sim-ticker">{row.ticker}</span>
                    </span>
                  </td>
                  <td className="sim-col-r">
                    {Number.isInteger(row.shares) ? row.shares : row.shares.toFixed(2)}
                  </td>
                  <td className="sim-col-r">
                    {formatPrice(row.avg_cost, row.stocks.currency)}
                  </td>
                  <td className="sim-col-r">
                    {row.price
                      ? <span>
                          {formatPrice(row.price.price, row.stocks.currency)}
                          <span className={`sim-change ${row.price.change_pct >= 0 ? 'sim-pos' : 'sim-neg'}`}>
                            {' '}{formatChangePct(row.price.change_pct)}
                          </span>
                        </span>
                      : <span className="sim-muted">—</span>}
                  </td>
                  <td className="sim-col-r">
                    {row.value !== null
                      ? `£${row.value.toFixed(2)}`
                      : <span className="sim-muted">—</span>}
                  </td>
                  <td className="sim-col-r">
                    {row.pnl !== null
                      ? (
                          <span className="sim-pnl">
                            <span>{formatPnl(row.pnl)}</span>
                            {row.pnlPct !== null && (
                              <span className={`sim-pct ${row.pnlPct >= 0 ? 'sim-pos' : 'sim-neg'}`}>
                                ({row.pnlPct >= 0 ? '+' : ''}{row.pnlPct.toFixed(1)}%)
                              </span>
                            )}
                          </span>
                        )
                      : <span className="sim-muted">—</span>}
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/simulator/stocks/${encodeURIComponent(row.ticker)}`}
                      className="btn btn--outline btn--sm"
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
