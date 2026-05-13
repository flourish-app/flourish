'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CheckCircle2, Lightbulb } from 'lucide-react'
import {
  Area,
  AreaChart,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from 'recharts'
import { STARTING_CASH } from '@/lib/simulator'

type PieSlice = { name: string; value: number; color: string }
type PerformancePoint = { label: string; portfolio: number; ftse: number }
type PerformancePeriod = '1D' | '1W' | '1M'

type Props = {
  pieData: PieSlice[]
  totalValue: number
}

function formatCurrency(value: number) {
  return `£${value.toFixed(2)}`
}

function AllocTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  if (typeof value !== 'number') return null
  return (
    <div className="sim-chart-tooltip">
      <p className="sim-chart-tooltip__date">{name}</p>
      <p>{formatCurrency(value)}</p>
    </div>
  )
}

const performancePeriods: PerformancePeriod[] = ['1D', '1W', '1M']

const periodScales: Record<PerformancePeriod, { labels: string[]; portfolio: number; ftse: number }> = {
  '1D': { labels: ['Open', '10am', '12pm', '2pm', 'Now'], portfolio: 0.35, ftse: 0.12 },
  '1W': { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Now'], portfolio: 0.7, ftse: 0.25 },
  '1M': { labels: ['Start', 'Week 1', 'Week 2', 'Week 3', 'Now'], portfolio: 1, ftse: 0.48 },
}

function buildPerformanceData(period: PerformancePeriod, portfolioReturn: number): PerformancePoint[] {
  const config = periodScales[period]
  const portfolioEnd = +(portfolioReturn * config.portfolio).toFixed(2)
  const ftseEnd = config.ftse
  const shape = [0, -0.18, 0.24, 0.12, 0.66, 1]

  return config.labels.map((label, index) => {
    const progress = index / (config.labels.length - 1)
    const variance = shape[index] ?? progress

    return {
      label,
      portfolio: +(portfolioEnd * (progress * 0.75 + variance * 0.25)).toFixed(2),
      ftse: +(ftseEnd * (progress * 0.85 + variance * 0.15)).toFixed(2),
    }
  })
}

export default function AllocationChart({ pieData, totalValue }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<PerformancePeriod>('1M')

  const sectorCount = pieData.filter(slice => slice.name !== 'Cash').length
  const isWellDiversified = sectorCount > 3
  const portfolioReturn = ((totalValue - STARTING_CASH) / STARTING_CASH) * 100
  const performanceData = useMemo(
    () => buildPerformanceData(selectedPeriod, portfolioReturn),
    [selectedPeriod, portfolioReturn],
  )
  const selectedReturn = performanceData[performanceData.length - 1]?.portfolio ?? 0
  const legendData = [...pieData].sort((a, b) => {
    if (a.name === 'Cash') return -1
    if (b.name === 'Cash') return 1
    return 0
  })

  if (pieData.length === 0) return null

  return (
    <div className="sim-section dashboard__grid sim-portfolio-panels">
      <section className="sim-panel">
        <div className="sim-section__header">
          <h2 className="sim-section__title">Allocation</h2>
        </div>
        <div className="sim-alloc-card">
          <div className="sim-alloc-layout">
            <div className="sim-alloc-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={54}
                    outerRadius={86}
                    paddingAngle={2}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={props => <AllocTooltip {...props} />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="sim-alloc-center" aria-hidden="true">
                <strong>{formatCurrency(totalValue)}</strong>
                <span>Total value</span>
              </div>
            </div>

            <div className="sim-alloc-side">
              <ul className="sim-alloc-legend" aria-label="Allocation breakdown">
                {legendData.map(slice => (
                  <li className="sim-alloc-legend__item" key={slice.name}>
                    <span className="sim-alloc-legend__dot" style={{ background: slice.color }} />
                    <span className="sim-alloc-legend__name">{slice.name}</span>
                    <span className="sim-alloc-legend__metrics">
                      <strong>{((slice.value / totalValue) * 100).toFixed(1)}%</strong>
                      <strong>{formatCurrency(slice.value)}</strong>
                    </span>
                  </li>
                ))}
              </ul>

              <button className="sim-alloc-link" type="button">
                Allocation insights →
              </button>
            </div>
          </div>

          <div className={`sim-alloc-insight ${isWellDiversified ? 'sim-alloc-insight--good' : 'sim-alloc-insight--nudge'}`}>
            {isWellDiversified
              ? <CheckCircle2 className="sim-alloc-insight__icon" aria-hidden="true" size={18} strokeWidth={2.2} />
              : <Lightbulb className="sim-alloc-insight__icon" aria-hidden="true" size={18} strokeWidth={2.2} />}
            <span>
              {isWellDiversified
                ? "You're well diversified across sectors."
                : 'Try adding different sectors to spread your risk.'}
            </span>
          </div>
        </div>
      </section>

      <section className="sim-panel">
        <div className="sim-section__header">
          <h2 className="sim-section__title">Performance</h2>
        </div>
        <div className="sim-performance-card">
          <div className="sim-performance-card__top">
            <div>
              <p className="sim-performance-card__sub">Your portfolio vs FTSE 100</p>
            </div>
            <div className="sim-performance-tabs" aria-label="Performance period">
              {performancePeriods.map(period => (
                <button
                  aria-pressed={selectedPeriod === period}
                  className={selectedPeriod === period ? 'sim-performance-tabs__active' : undefined}
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  type="button"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="sim-performance-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="var(--green)"
                  fill="var(--green-light)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="ftse"
                  stroke="var(--grey-3)"
                  strokeWidth={1.5}
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="sim-performance-card__footer">
            <span>{selectedReturn >= 0 ? '+' : ''}{selectedReturn.toFixed(2)}%</span>
            <Link href="/dashboard/simulator/performance" className="sim-performance-card__link">
              View full performance →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
