'use client'

const FILTERS = ['All', 'BUY', 'SELL'] as const
type Filter   = typeof FILTERS[number]

type Props = { filter: Filter; onFilter: (f: Filter) => void }

export default function HistoryFilter({ filter, onFilter }: Props) {
  return (
    <div className="sim-filters" style={{ marginBottom: 16 }}>
      {FILTERS.map(f => (
        <button
          key={f}
          className={`sim-filter-btn ${filter === f ? 'sim-filter-btn--active' : ''}`}
          onClick={() => onFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
