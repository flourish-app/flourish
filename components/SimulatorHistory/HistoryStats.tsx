type Props = {
  total:       number
  totalBuys:   number
  totalSells:  number
  totalVolume: number
}

export default function HistoryStats({ total, totalBuys, totalSells, totalVolume }: Props) {
  return (
    <div className="sim-stats" style={{ marginBottom: 20 }}>
      <div className="sim-stat">
        <span className="sim-stat__label">Total trades</span>
        <span className="sim-stat__value">{total}</span>
      </div>
      <div className="sim-stat">
        <span className="sim-stat__label">Buys</span>
        <span className="sim-stat__value">{totalBuys}</span>
      </div>
      <div className="sim-stat">
        <span className="sim-stat__label">Sells</span>
        <span className="sim-stat__value">{totalSells}</span>
      </div>
      <div className="sim-stat">
        <span className="sim-stat__label">Total volume</span>
        <span className="sim-stat__value">£{totalVolume.toFixed(2)}</span>
      </div>
    </div>
  )
}
