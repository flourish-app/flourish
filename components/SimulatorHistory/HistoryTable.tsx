import { type SimTransaction } from '@/lib/simulator'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function HistoryTable({ transactions }: { transactions: SimTransaction[] }) {
  return (
    <div className="sim-table-wrap">
      <table className="sim-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Stock</th>
            <th>Type</th>
            <th className="sim-col-r">Shares</th>
            <th className="sim-col-r">Price</th>
            <th className="sim-col-r">Total</th>
            <th className="sim-col-r">Cash after</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td className="sim-muted" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                {formatDate(t.executed_at)}
              </td>
              <td className="sim-stock-cell">
                <span>
                  <span className="sim-stock-name">{t.stock_name}</span>
                  <span className="sim-ticker">{t.ticker}</span>
                </span>
              </td>
              <td>
                <span className={`sim-type-badge sim-type-badge--${t.type.toLowerCase()}`}>
                  {t.type}
                </span>
              </td>
              <td className="sim-col-r">{t.shares}</td>
              <td className="sim-col-r">£{t.price.toFixed(2)}</td>
              <td className="sim-col-r">£{t.total.toFixed(2)}</td>
              <td className="sim-col-r sim-muted">£{t.cash_after.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
