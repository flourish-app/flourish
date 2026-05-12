import { STARTING_CASH } from '@/lib/simulator'

type Props = {
  currentValue: number
  totalReturn:  number
  ftseReturn:   number | null
  latestFtse:   number | null
  beating:      boolean | null
}

export default function PerformanceStats({ currentValue, totalReturn, ftseReturn, latestFtse, beating }: Props) {
  return (
    <div className="sim-perf-stats">
      <div className="sim-perf-stat">
        <p className="sim-perf-stat__label">Portfolio value</p>
        <p className="sim-perf-stat__value">£{currentValue.toFixed(2)}</p>
        <p className={`sim-perf-stat__return ${totalReturn >= 0 ? 'sim-pos' : 'sim-neg'}`}>
          {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}% since inception
        </p>
      </div>

      <div className={`sim-perf-vs ${beating === true ? 'sim-perf-vs--beating' : beating === false ? 'sim-perf-vs--lagging' : ''}`}>
        {beating === true  && <><span>📈</span> Beating the market</>}
        {beating === false && <><span>📉</span> Behind the market</>}
        {beating === null  && <><span>📊</span> Insufficient data</>}
      </div>

      <div className="sim-perf-stat">
        <p className="sim-perf-stat__label">FTSE 100</p>
        {ftseReturn !== null
          ? <>
              <p className="sim-perf-stat__value" style={{ color: 'var(--grey-4)' }}>
                {latestFtse?.toFixed(0)}
              </p>
              <p className={`sim-perf-stat__return ${ftseReturn >= 0 ? 'sim-pos' : 'sim-neg'}`}>
                {ftseReturn >= 0 ? '+' : ''}{ftseReturn.toFixed(2)}% same period
              </p>
            </>
          : <p className="sim-muted" style={{ marginTop: 8 }}>Available from first snapshot</p>
        }
      </div>
    </div>
  )
}
