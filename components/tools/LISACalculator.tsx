'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useDebouncedHabit } from '@/hooks/useDebouncedHabit'
import { GuestSaveBanner } from './GuestSaveBanner'

const ANNUAL_CAP       = 4_000
const MAX_MONTHLY      = 333
const BONUS_RATE       = 0.25
const MAX_BONUS_ANNUAL = 1_000
const CONTRIB_STOP_AGE = 50
const RETIRE_AGE       = 60

const fmt = (n: number) =>
  n >= 1_000_000
    ? `£${(n / 1_000_000).toFixed(2)}m`
    : `£${Math.round(n).toLocaleString('en-GB')}`

type Goal = 'home' | 'retirement'

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

export function LISACalculator({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [goal,       setGoal]       = useState<Goal>('home')
  const [age,        setAge]        = useState(25)
  const [monthly,    setMonthly]    = useState(200)
  const [rate,       setRate]       = useState(5)
  const [years,      setYears]      = useState(5)
  const [showBanner, setShowBanner] = useState(false)

  useDebouncedHabit({
    calculator: 'lisa-calculator',
    values: { goal, age, monthly, rate, years },
    enabled: isAuthenticated,
    onGuestEngaged: isAuthenticated ? undefined : () => setShowBanner(true),
  })

  const contribYears    = goal === 'retirement' ? Math.max(0, CONTRIB_STOP_AGE - age) : years
  const growthOnlyYears = goal === 'retirement' ? 10 : 0
  const totalYears      = contribYears + growthOnlyYears

  const annualContrib = monthly * 12
  const annualBonus   = Math.min(annualContrib * BONUS_RATE, MAX_BONUS_ANNUAL)

  const data = useMemo(() => {
    const r = rate / 100 / 12
    const points: { year: number; value: number; contributed: number; bonus: number }[] = [
      { year: 0, value: 0, contributed: 0, bonus: 0 },
    ]
    for (let y = 1; y <= totalYears; y++) {
      const prev = points[y - 1]
      const isContrib = y <= contribYears
      let value: number
      if (r === 0) {
        value = prev.value + (isContrib ? annualContrib + annualBonus : 0)
      } else {
        const n  = 12
        const em = isContrib ? monthly + Math.min(monthly * BONUS_RATE, MAX_BONUS_ANNUAL / 12) : 0
        value = prev.value * Math.pow(1 + r, n) +
          (em > 0 ? em * ((Math.pow(1 + r, n) - 1) / r) : 0)
      }
      points.push({
        year:        y,
        value:       Math.round(value),
        contributed: Math.round(prev.contributed + (isContrib ? annualContrib : 0)),
        bonus:       Math.round(prev.bonus       + (isContrib ? annualBonus   : 0)),
      })
    }
    return points
  }, [monthly, rate, totalYears, contribYears, annualContrib, annualBonus])

  const final        = data[data.length - 1]
  const totalContrib = final.contributed
  const totalBonus   = final.bonus
  const totalGrowth  = final.value - totalContrib - totalBonus

  const CHART_W = 400
  const CHART_H = 180
  const BAR_GAP = 3

  const chartPoints = useMemo(() => {
    const target = Math.min(totalYears + 1, 22)
    const step   = Math.max(1, Math.floor(totalYears / (target - 1)))
    return data.filter((d, _, arr) => d.year % step === 0 || d.year === arr[arr.length - 1].year)
  }, [data, totalYears])

  const maxVal  = final.value || 1
  const barW    = Math.max(4, (CHART_W - BAR_GAP * (chartPoints.length - 1)) / chartPoints.length)
  const barStep = barW + BAR_GAP

  return (
    <div className="tool-page">
      <div className="tool-hero">
        <div className="container">
          <div className="tool-hero__breadcrumb">
            <Link href="/tools">Tools</Link>
            <span>›</span>
            <span>LISA calculator</span>
          </div>
          <div className="tool-hero__inner">
            <div>
              <div className="tool-hero__icon">🏠</div>
              <h1 className="tool-hero__headline">LISA calculator</h1>
              <p className="tool-hero__sub">
                A Lifetime ISA gives you a 25% government bonus on up to £4,000 a year — that&apos;s up to £1,000 of free money every year toward your first home or retirement. See exactly how it adds up.
              </p>
            </div>
            {!isAuthenticated && (
              <div className="tool-hero__badge-wrap">
                <span className="tool-free-badge">Free — no account needed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tool-body">
          <div className="calc-layout">
            <div className="calc-inputs">
              <div>
                <h2 className="calc-inputs__title">Your numbers</h2>
                <div className="lisa-goal-toggle">
                  <button className={`lisa-goal-btn${goal === 'home' ? ' lisa-goal-btn--active' : ''}`} onClick={() => setGoal('home')}>
                    🏠 First home
                  </button>
                  <button className={`lisa-goal-btn${goal === 'retirement' ? ' lisa-goal-btn--active' : ''}`} onClick={() => setGoal('retirement')}>
                    🌅 Retirement
                  </button>
                </div>
              </div>

              <Slider label="Your age"             value={age}     setValue={setAge}     min={18} max={39} suffix=" yrs" />
              <Slider label="Monthly contribution" value={monthly} setValue={setMonthly} min={0}  max={MAX_MONTHLY} step={10} prefix="£" />
              <Slider label="Annual return"        value={rate}    setValue={setRate}    min={0}  max={10} step={0.5} suffix="%" />

              {goal === 'home' && (
                <Slider label="Years saving" value={years} setValue={setYears} min={1} max={Math.min(30, CONTRIB_STOP_AGE - age)} suffix=" yrs" />
              )}
              {goal === 'retirement' && (
                <div className="lisa-info-box">
                  <div className="lisa-info-box__row"><span>Contributing until</span><strong>age {CONTRIB_STOP_AGE}</strong></div>
                  <div className="lisa-info-box__row"><span>Growth-only period</span><strong>age {CONTRIB_STOP_AGE}–{RETIRE_AGE}</strong></div>
                  <div className="lisa-info-box__row"><span>Can access at</span><strong>age {RETIRE_AGE} ({totalYears} yrs away)</strong></div>
                </div>
              )}

              <p className="calc-disclaimer">
                LISA contributions are capped at £4,000/year (£333/month). A 25% government withdrawal charge applies if funds are accessed for any other reason than a first home purchase or retirement at 60. For educational purposes only — not financial advice.
              </p>
            </div>

            <div className="calc-results">
              <div className="calc-summary">
                <div className="calc-summary__main">
                  <div className="calc-summary__label">
                    {goal === 'retirement' ? `Total LISA value at age ${RETIRE_AGE}` : `Total LISA value after ${years} year${years !== 1 ? 's' : ''}`}
                  </div>
                  <div className="calc-summary__value">{fmt(final.value)}</div>
                  <div className="calc-summary__multiplier">
                    including <span style={{ color: 'var(--green-mid)' }}>{fmt(totalBonus)}</span> in free government bonuses
                  </div>
                </div>
                <div className="calc-summary__breakdown">
                  <div className="calc-summary__item">
                    <div className="calc-summary__item-dot calc-summary__item-dot--grey" />
                    <div>
                      <div className="calc-summary__item-label">Your contributions</div>
                      <div className="calc-summary__item-val">{fmt(totalContrib)}</div>
                    </div>
                  </div>
                  <div className="calc-summary__item">
                    <div className="calc-summary__item-dot calc-summary__item-dot--green" />
                    <div>
                      <div className="calc-summary__item-label">Bonus + growth</div>
                      <div className="calc-summary__item-val" style={{ color: 'var(--green)' }}>
                        {fmt(totalBonus + Math.max(0, totalGrowth))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="calc-chart-wrap">
                <div className="lisa-breakdown-bar">
                  {totalContrib > 0 && <div className="lisa-breakdown-bar__seg lisa-breakdown-bar__seg--contrib" style={{ width: `${(totalContrib / Math.max(final.value, 1)) * 100}%` }} />}
                  {totalBonus   > 0 && <div className="lisa-breakdown-bar__seg lisa-breakdown-bar__seg--bonus"   style={{ width: `${(totalBonus   / Math.max(final.value, 1)) * 100}%` }} />}
                  {totalGrowth  > 0 && <div className="lisa-breakdown-bar__seg lisa-breakdown-bar__seg--growth"  style={{ width: `${(totalGrowth  / Math.max(final.value, 1)) * 100}%` }} />}
                </div>
                <div className="lisa-breakdown-legend">
                  <span><span className="legend-dot legend-dot--grey" />Your money <strong>{Math.round((totalContrib / Math.max(final.value, 1)) * 100)}%</strong></span>
                  <span><span className="legend-dot legend-dot--green" />Gov. bonus <strong>{Math.round((totalBonus / Math.max(final.value, 1)) * 100)}%</strong></span>
                  {totalGrowth > 0 && <span><span className="legend-dot" style={{ background: 'var(--green)' }} />Growth <strong>{Math.round((totalGrowth / Math.max(final.value, 1)) * 100)}%</strong></span>}
                </div>

                <svg viewBox={`0 0 ${CHART_W} ${CHART_H + 20}`} preserveAspectRatio="xMidYMax meet" className="calc-chart" aria-hidden="true" style={{ marginTop: '16px' }}>
                  {chartPoints.map((pt, i) => {
                    const contribH = Math.max(0, Math.round((pt.contributed / maxVal) * CHART_H))
                    const bonusH   = Math.max(0, Math.round((pt.bonus       / maxVal) * CHART_H))
                    const growthH  = Math.max(0, Math.round((pt.value       / maxVal) * CHART_H) - contribH - bonusH)
                    const x        = i * barStep
                    const labelEvery = Math.max(1, Math.floor(chartPoints.length / 5))
                    return (
                      <g key={pt.year}>
                        <rect x={x} y={CHART_H - contribH} width={barW} height={contribH} fill="#e8e8e4" rx="2" />
                        {bonusH  > 0 && <rect x={x} y={CHART_H - contribH - bonusH} width={barW} height={bonusH}  fill="#4caf82" rx="2" />}
                        {growthH > 0 && <rect x={x} y={CHART_H - contribH - bonusH - growthH} width={barW} height={growthH} fill="#2e7d5e" rx="2" />}
                        {(i === 0 || i === chartPoints.length - 1 || i % labelEvery === 0) && (
                          <text x={x + barW / 2} y={CHART_H + 14} textAnchor="middle" fontSize="9" fill="#9e9e9a">{pt.year}y</text>
                        )}
                      </g>
                    )
                  })}
                </svg>
                <div className="calc-chart-legend">
                  <span><span className="legend-dot legend-dot--grey" />Your money</span>
                  <span><span className="legend-dot legend-dot--green" />Gov. bonus</span>
                  <span><span className="legend-dot" style={{ background: 'var(--green)' }} />Growth</span>
                </div>
              </div>

              <div className="calc-insight">
                <span className="calc-insight__icon">🎁</span>
                <p>
                  {goal === 'home' ? (
                    <>Over {years} year{years !== 1 ? 's' : ''}, you&apos;ll earn <strong style={{ color: 'var(--green)' }}>{fmt(totalBonus)}</strong> in government bonuses — on top of every penny you put in. That&apos;s {fmt(MAX_BONUS_ANNUAL)} per year of free money, just for saving.</>
                  ) : (
                    <>You contribute until age {CONTRIB_STOP_AGE}, earning <strong style={{ color: 'var(--green)' }}>{fmt(totalBonus)}</strong> in bonuses. Your pot then grows untouched for 10 years until you can access it at age {RETIRE_AGE}.</>
                  )}
                </p>
              </div>

              {goal === 'home' && (
                <div className="calc-insight" style={{ background: '#fff8e6', borderColor: 'rgba(245,158,11,0.25)' }}>
                  <span className="calc-insight__icon">🏠</span>
                  <p>
                    Your LISA can be used toward any UK first home worth up to <strong>£450,000</strong>. The bonus is paid directly to your conveyancer at completion — you never receive it as cash.
                  </p>
                </div>
              )}
            </div>
          </div>

          {!isAuthenticated && showBanner && (
            <GuestSaveBanner onDismiss={() => setShowBanner(false)} />
          )}

          {!isAuthenticated && (
            <div className="tool-signup-prompt">
              <div className="tool-signup-prompt__inner">
                <div className="tool-signup-prompt__left">
                  <div className="tool-signup-prompt__eyebrow">Want to understand LISAs properly?</div>
                  <h2 className="tool-signup-prompt__headline">
                    Learn how ISAs and LISAs work — and how to make the most of them
                  </h2>
                  <p className="tool-signup-prompt__sub">
                    The LISA bonus is one of the best deals available to young UK savers, but there are rules and traps worth knowing. Our free courses explain everything clearly — no jargon.
                  </p>
                  <div className="tool-signup-prompt__courses">
                    <Link href="/courses/isas-and-tax-free-saving" className="tool-prompt-course">
                      <span>🏦</span>
                      <div><div className="tool-prompt-course__title">ISAs &amp; Tax-Free Saving</div><div className="tool-prompt-course__meta">6 lessons · Free</div></div>
                      <span className="tool-prompt-course__arrow">→</span>
                    </Link>
                    <Link href="/courses/pensions-and-your-future" className="tool-prompt-course">
                      <span>🔮</span>
                      <div><div className="tool-prompt-course__title">Pensions &amp; Your Future</div><div className="tool-prompt-course__meta">9 lessons · Free</div></div>
                      <span className="tool-prompt-course__arrow">→</span>
                    </Link>
                  </div>
                </div>
                <div className="tool-signup-prompt__right">
                  <div className="tool-signup-card">
                    <div className="tool-signup-card__headline">Start learning free</div>
                    <p className="tool-signup-card__sub">Create an account to unlock all courses, save your progress, and access every tool in one place.</p>
                    <Link href="/start-learning" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }}>Create free account</Link>
                    <Link href="/login" className="tool-signup-card__login">Already have an account? Sign in</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
