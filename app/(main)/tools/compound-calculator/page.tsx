'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const fmt = (n: number) =>
  n >= 1_000_000
    ? `£${(n / 1_000_000).toFixed(2)}m`
    : `£${Math.round(n).toLocaleString('en-GB')}`

// ── Slider — defined OUTSIDE the page so React never remounts it ──
function Slider({
  label, value, setValue, min, max, step = 1, prefix = '', suffix = '',
}: {
  label: string; value: number; setValue: (v: number) => void
  min: number; max: number; step?: number; prefix?: string; suffix?: string
}) {
  const pct = `${((value - min) / (max - min)) * 100}%`
  return (
    <div className="calc-field">
      <div className="calc-field__header">
        <label className="calc-field__label">{label}</label>
        <div className="calc-field__value-wrap">
          <span className="calc-field__prefix">{prefix}</span>
          <input
            type="number"
            className="calc-field__number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => {
              const v = Number(e.target.value)
              if (!isNaN(v)) setValue(Math.min(max, Math.max(min, v)))
            }}
          />
          <span className="calc-field__suffix">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        className="calc-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        style={{ '--val': pct } as React.CSSProperties}
      />
      <div className="calc-field__range">
        <span>{prefix}{min.toLocaleString('en-GB')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-GB')}{suffix}</span>
      </div>
    </div>
  )
}

export default function CompoundCalculatorPage() {
  const [starting,    setStarting]    = useState(1000)
  const [monthly,     setMonthly]     = useState(50)
  const [rate,        setRate]        = useState(7)
  const [years,       setYears]       = useState(30)

  // ── Core calculation ──────────────────────────────────────────
  const data = useMemo(() => {
    const r = rate / 100 / 12          // monthly rate
    const points: { year: number; value: number; contributed: number }[] = []

    for (let y = 0; y <= years; y++) {
      const n = y * 12
      const value =
        starting * Math.pow(1 + r, n) +
        (r === 0
          ? monthly * n
          : monthly * ((Math.pow(1 + r, n) - 1) / r))
      const contributed = starting + monthly * n
      points.push({ year: y, value: Math.round(value), contributed: Math.round(contributed) })
    }
    return points
  }, [starting, monthly, rate, years])

  const finalValue    = data[years].value
  const totalPaid     = data[years].contributed
  const totalGrowth   = finalValue - totalPaid
  const multiplier    = (finalValue / Math.max(totalPaid, 1)).toFixed(1)

  // ── Chart — always produce 12–24 evenly-spaced bars ──────────
  const CHART_W = 400
  const CHART_H = 180
  const BAR_GAP = 3

  const chartPoints = useMemo(() => {
    const target = Math.min(years + 1, 24)   // up to 24 bars
    const step   = Math.max(1, Math.floor(years / (target - 1)))
    const pts    = data.filter((d, _, arr) =>
      d.year % step === 0 || d.year === arr[arr.length - 1].year
    )
    return pts
  }, [data, years])

  const maxVal  = finalValue || 1
  const barW    = Math.max(4, (CHART_W - BAR_GAP * (chartPoints.length - 1)) / chartPoints.length)
  const barStep = barW + BAR_GAP

  return (
    <div className="tool-page">

      {/* ── Header ── */}
      <div className="tool-hero">
        <div className="container">
          <div className="tool-hero__breadcrumb">
            <Link href="/tools">Tools</Link>
            <span>›</span>
            <span>Compound interest calculator</span>
          </div>
          <div className="tool-hero__inner">
            <div>
              <div className="tool-hero__icon">📈</div>
              <h1 className="tool-hero__headline">Compound interest calculator</h1>
              <p className="tool-hero__sub">
                See exactly how your money grows over time. Adjust your starting amount, monthly contributions, and expected return to see the real power of starting early.
              </p>
            </div>
            <div className="tool-hero__badge-wrap">
              <span className="tool-free-badge">Free — no account needed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tool-body">

          {/* ── Calculator ── */}
          <div className="calc-layout">

            {/* Inputs */}
            <div className="calc-inputs">
              <h2 className="calc-inputs__title">Your numbers</h2>
              <Slider label="Starting amount"      value={starting} setValue={setStarting} min={0}   max={50000} step={100}  prefix="£" />
              <Slider label="Monthly contribution" value={monthly}  setValue={setMonthly}  min={0}   max={2000}  step={10}   prefix="£" />
              <Slider label="Annual return"        value={rate}     setValue={setRate}     min={1}   max={15}    step={0.5}  suffix="%" />
              <Slider label="Time period"          value={years}    setValue={setYears}    min={1}   max={50}    step={1}    suffix=" yrs" />
              <p className="calc-disclaimer">
                Returns are not guaranteed. This calculator is for educational purposes only. Past performance does not predict future results.
              </p>
            </div>

            {/* Results */}
            <div className="calc-results">

              {/* Summary cards */}
              <div className="calc-summary">
                <div className="calc-summary__main">
                  <div className="calc-summary__label">Final balance after {years} years</div>
                  <div className="calc-summary__value">{fmt(finalValue)}</div>
                  <div className="calc-summary__multiplier">{multiplier}× your money</div>
                </div>
                <div className="calc-summary__breakdown">
                  <div className="calc-summary__item">
                    <div className="calc-summary__item-dot calc-summary__item-dot--grey" />
                    <div>
                      <div className="calc-summary__item-label">Total contributed</div>
                      <div className="calc-summary__item-val">{fmt(totalPaid)}</div>
                    </div>
                  </div>
                  <div className="calc-summary__item">
                    <div className="calc-summary__item-dot calc-summary__item-dot--green" />
                    <div>
                      <div className="calc-summary__item-label">Total growth</div>
                      <div className="calc-summary__item-val" style={{ color: 'var(--green)' }}>{fmt(totalGrowth)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="calc-chart-wrap">
                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H + 20}`}
                  preserveAspectRatio="xMidYMax meet"
                  className="calc-chart"
                  aria-hidden="true"
                >
                  {chartPoints.map((pt, i) => {
                    const barH     = Math.max(2, Math.round((pt.value       / maxVal) * CHART_H))
                    const contribH = Math.max(2, Math.round((pt.contributed / maxVal) * CHART_H))
                    const growthH  = Math.max(0, barH - contribH)
                    const x        = i * barStep
                    const labelEvery = Math.max(1, Math.floor(chartPoints.length / 5))

                    return (
                      <g key={pt.year}>
                        {/* Contribution bar */}
                        <rect
                          x={x} y={CHART_H - contribH} width={barW} height={contribH}
                          fill="#e8e8e4" rx="2"
                        />
                        {/* Growth bar stacked on top */}
                        {growthH > 0 && (
                          <rect
                            x={x} y={CHART_H - barH} width={barW} height={growthH}
                            fill="#4caf82" rx="2"
                          />
                        )}
                        {/* Year label — first, last, and every N bars */}
                        {(i === 0 || i === chartPoints.length - 1 || i % labelEvery === 0) && (
                          <text
                            x={x + barW / 2} y={CHART_H + 14}
                            textAnchor="middle" fontSize="9" fill="#9e9e9a"
                          >
                            {pt.year}y
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>
                <div className="calc-chart-legend">
                  <span><span className="legend-dot legend-dot--grey" />Your contributions</span>
                  <span><span className="legend-dot legend-dot--green" />Growth</span>
                </div>
              </div>

              {/* Key insight callout */}
              <div className="calc-insight">
                <span className="calc-insight__icon">💡</span>
                <p>
                  Of your {fmt(finalValue)} final balance,{' '}
                  <strong style={{ color: 'var(--green)' }}>{fmt(totalGrowth)}</strong>{' '}
                  ({Math.round((totalGrowth / Math.max(finalValue, 1)) * 100)}%) comes from growth — not money you put in. That&apos;s compound interest at work.
                </p>
              </div>
            </div>
          </div>

          {/* ── Sign-up incentive ── */}
          <div className="tool-signup-prompt">
            <div className="tool-signup-prompt__inner">
              <div className="tool-signup-prompt__left">
                <div className="tool-signup-prompt__eyebrow">Want to actually achieve these numbers?</div>
                <h2 className="tool-signup-prompt__headline">
                  Learn how to invest tax-free and keep more of your growth
                </h2>
                <p className="tool-signup-prompt__sub">
                  A Stocks &amp; Shares ISA means every penny of that{' '}
                  <strong>{fmt(totalGrowth)}</strong> growth is yours — completely tax-free.
                  Our free courses show you exactly how to set one up and what to put in it.
                </p>
                <div className="tool-signup-prompt__courses">
                  <Link href="/courses/isas-and-tax-free-saving" className="tool-prompt-course">
                    <span>🏦</span>
                    <div>
                      <div className="tool-prompt-course__title">ISAs &amp; Tax-Free Saving</div>
                      <div className="tool-prompt-course__meta">6 lessons · Free</div>
                    </div>
                    <span className="tool-prompt-course__arrow">→</span>
                  </Link>
                  <Link href="/courses/investing-from-scratch" className="tool-prompt-course">
                    <span>🚀</span>
                    <div>
                      <div className="tool-prompt-course__title">Investing from Scratch</div>
                      <div className="tool-prompt-course__meta">8 lessons · Free</div>
                    </div>
                    <span className="tool-prompt-course__arrow">→</span>
                  </Link>
                </div>
              </div>
              <div className="tool-signup-prompt__right">
                <div className="tool-signup-card">
                  <div className="tool-signup-card__headline">Start learning free</div>
                  <p className="tool-signup-card__sub">
                    Create an account to unlock all courses, save your progress, and access every tool in one place.
                  </p>
                  <Link href="/start-learning" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                    Create free account
                  </Link>
                  <Link href="/login" className="tool-signup-card__login">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
