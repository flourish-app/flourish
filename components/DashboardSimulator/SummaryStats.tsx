type Props = {
  totalValue: number
  cash: number
  holdingsValue: number
  positionCount: number
}

export default function SummaryStats({ totalValue, cash, holdingsValue, positionCount }: Props) {
  return (
    <div className="sim-stats">
      <div className="sim-stat">
        <span className="sim-stat__label">Total value</span>
        <span className="sim-stat__value">£{totalValue.toFixed(2)}</span>
      </div>
      <div className="sim-stat">
        <span className="sim-stat__label">Cash</span>
        <span className="sim-stat__value">£{cash.toFixed(2)}</span>
      </div>
      <div className="sim-stat">
        <span className="sim-stat__label">Invested</span>
        <span className="sim-stat__value">£{holdingsValue.toFixed(2)}</span>
      </div>
      <div className="sim-stat">
        <span className="sim-stat__label">Positions</span>
        <span className="sim-stat__value">{positionCount}</span>
      </div>
    </div>
  )
}
