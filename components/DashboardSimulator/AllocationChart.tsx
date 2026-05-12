'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type PieSlice = { name: string; value: number; color: string }

type Props = {
  pieData: PieSlice[]
  totalValue: number
}

function AllocTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{name}</p>
      <p>£{value.toFixed(2)}</p>
    </div>
  )
}

export default function AllocationChart({ pieData, totalValue }: Props) {
  if (pieData.length === 0) return null
  return (
    <section className="sim-section">
      <div className="sim-section__header">
        <h2 className="sim-section__title">Allocation</h2>
      </div>
      <div className="sim-alloc-card">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<AllocTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '0.78rem', color: 'var(--grey-4)' }}
              formatter={(value, entry: any) => (
                <span style={{ color: 'var(--grey-4)' }}>
                  {value} · {((entry.payload.value / totalValue) * 100).toFixed(1)}%
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
