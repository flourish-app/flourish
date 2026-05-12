'use client'

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, ReferenceLine,
} from 'recharts'
import { formatPrice } from '@/lib/simulator'
import type { Candle } from './types'

function CandleTooltip({ active, payload, label, currency }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{label}</p>
      <p style={{ color: 'var(--green)' }}>{formatPrice(payload[0].value, currency)}</p>
    </div>
  )
}

type Props = {
  chartData:  Candle[]
  currency:   string
  chartMin?:  number
  chartMax?:  number
  firstClose?: number
  chartTrend: boolean
}

export default function PriceChart({ chartData, currency, chartMin, chartMax, firstClose, chartTrend }: Props) {
  if (chartData.length < 2) return null
  return (
    <div className="sim-mini-chart-card">
      <p className="sim-mini-chart-title">30-day price history</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: 'var(--grey-3)' }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            domain={[chartMin!, chartMax!]}
            tick={{ fontSize: 10, fill: 'var(--grey-3)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${currency === 'USD' ? '$' : '£'}${v.toFixed(0)}`}
            width={52}
          />
          <Tooltip content={<CandleTooltip currency={currency} />} />
          {firstClose && (
            <ReferenceLine y={firstClose} stroke="var(--grey-2)" strokeDasharray="4 3" />
          )}
          <Line
            type="monotone"
            dataKey="close"
            stroke={chartTrend ? 'var(--green)' : '#c0392b'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
