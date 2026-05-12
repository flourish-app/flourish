'use client'

const ALL       = 'All'
const EXCHANGES = [ALL, 'LSE', 'NASDAQ', 'NYSE']
const SECTORS   = [ALL, 'Technology', 'Financials', 'Healthcare', 'Energy', 'Consumer',
                   'Mining', 'Telecom', 'Utilities', 'Media', 'Automotive', 'ETF']

type Props = {
  search:           string
  onSearch:         (v: string) => void
  exchange:         string
  onExchange:       (v: string) => void
  sector:           string
  onSector:         (v: string) => void
  totalStocks:      number
}

export default function StockFilters({ search, onSearch, exchange, onExchange, sector, onSector, totalStocks }: Props) {
  return (
    <div className="sim-controls">
      <input
        className="sim-search"
        type="text"
        placeholder="Search by name or ticker…"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <div className="sim-filters">
        {EXCHANGES.map(ex => (
          <button
            key={ex}
            className={`sim-filter-btn ${exchange === ex ? 'sim-filter-btn--active' : ''}`}
            onClick={() => onExchange(ex)}
          >
            {ex}
          </button>
        ))}
      </div>
      <div className="sim-filters">
        {SECTORS.map(sec => (
          <button
            key={sec}
            className={`sim-filter-btn ${sector === sec ? 'sim-filter-btn--active' : ''}`}
            onClick={() => onSector(sec)}
          >
            {sec}
          </button>
        ))}
      </div>
    </div>
  )
}
