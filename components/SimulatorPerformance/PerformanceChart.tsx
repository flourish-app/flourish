'use client'

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

type ChartPoint = { date: string; label: string; portfolio: number; ftse: number | null }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toFixed(1)}
          <span className="sim-chart-tooltip__pct"> ({entry.value >= 100 ? '+' : ''}{(entry.value - 100).toFixed(1)}%)</span>
        </p>
      ))}
    </div>
  )
}

export default function PerformanceChart({ chartData }: { chartData: ChartPoint[] }) {
  if (chartData.length < 2) {
    return (
      <div className="sim-chart-card">
        <div className="sim-chart-empty">
          <p className="sim-chart-empty__heading">Not enough data yet</p>
          <p className="sim-chart-empty__sub">
            Your portfolio vs FTSE 100 chart builds up over time.
            The first snapshot is taken automatically at 5pm on trading days.
            Come back tomorrow to see your first data point.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="sim-chart-card">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grey-2)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: 'var(--grey-3)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 11, fill: 'var(--grey-3)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px', color: 'var(--grey-4)' }} />
          <Line
            type="monotone"
            dataKey="portfolio"
            name="Your portfolio"
            stroke="var(--green)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="ftse"
            name="FTSE 100"
            stroke="var(--grey-3)"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
            activeDot={{ r: 3 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
