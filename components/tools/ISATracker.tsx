'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const ANNUAL_ALLOWANCE = 20_000
const LISA_CAP = 4_000
const LISA_BONUS_RATE = 0.25

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`
const pctOfAllowance = (n: number) => `${Math.round((n / ANNUAL_ALLOWANCE) * 100)}%`

function getTaxYear() {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  if (m > 4 || (m === 4 && d >= 6)) return `${y}/${String(y + 1).slice(2)}`
  return `${y - 1}/${String(y).slice(2)}`
}

function ISASlider({
  label, emoji, desc, value, setValue, sliderMax,
}: {
  label: string; emoji: string; desc: string
  value: number; setValue: (v: number) => void; sliderMax: number
}) {
  const pct = sliderMax > 0 ? `${(value / sliderMax) * 100}%` : '0%'
  const set = (raw: number) => setValue(Math.min(sliderMax, Math.max(0, raw)))
  return (
    <div className="isa-field">
      <div className="isa-field__top">
        <div className="isa-field__identity">
          <span className="isa-field__emoji">{emoji}</span>
          <div>
            <div className="isa-field__label">{label}</div>
            <div className="isa-field__desc">{desc}</div>
          </div>
        </div>
        <div className="calc-field__value-wrap">
          <span className="calc-field__prefix">£</span>
          <input
            type="number"
            className="calc-field__number"
            value={value}
            min={0}
            max={sliderMax}
            step={50}
            onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) set(v) }}
          />
        </div>
      </div>
      <input
        type="range"
        className="calc-slider"
        min={0}
        max={sliderMax}
        step={50}
        value={value}
        onChange={e => set(Number(e.target.value))}
        style={{ '--val': pct } as React.CSSProperties}
      />
      <div className="calc-field__range">
        <span>£0</span>
        <span>{fmt(sliderMax)}</span>
      </div>
    </div>
  )
}

export function ISATracker({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const taxYear = useMemo(() => getTaxYear(), [])

  const [cash,   setCash]   = useState(0)
  const [stocks, setStocks] = useState(0)
  const [lisa,   setLisa]   = useState(0)
  const [ifisa,  setIfisa]  = useState(0)

  const total     = cash + stocks + lisa + ifisa
  const remaining = Math.max(0, ANNUAL_ALLOWANCE - total)
  const isMaxed   = remaining === 0

  const cashMax   = cash   + remaining
  const stocksMax = stocks + remaining
  const lisaMax   = Math.min(LISA_CAP, lisa + remaining)
  const ifisaMax  = ifisa  + remaining
  const lisaBonus = lisa * LISA_BONUS_RATE

  const barCash   = (cash   / ANNUAL_ALLOWANCE) * 100
  const barStocks = (stocks / ANNUAL_ALLOWANCE) * 100
  const barLisa   = (lisa   / ANNUAL_ALLOWANCE) * 100
  const barIfisa  = (ifisa  / ANNUAL_ALLOWANCE) * 100

  const breakdown = [
    { label: 'Cash ISA',               emoji: '💰', value: cash },
    { label: 'Stocks & Shares ISA',    emoji: '📈', value: stocks },
    { label: 'Lifetime ISA',           emoji: '🏡', value: lisa,  note: lisa > 0 ? `+${fmt(lisaBonus)} bonus` : undefined },
    { label: 'Innovative Finance ISA', emoji: '🔗', value: ifisa },
  ]

  return (
    <div className="tool-page">
      <div className="tool-hero">
        <div className="container">
          <div className="tool-hero__breadcrumb">
            <Link href="/tools">Tools</Link>
            <span>›</span>
            <span>ISA allowance tracker</span>
          </div>
          <div className="tool-hero__inner">
            <div>
              <div className="tool-hero__icon">🏦</div>
              <h1 className="tool-hero__headline">ISA allowance tracker</h1>
              <p className="tool-hero__sub">
                Every UK adult gets a £20,000 ISA allowance each tax year — completely tax-free. Track how much of your {taxYear}{' '}allowance you&apos;ve used across each ISA type, and see exactly what&apos;s left before the 5 April deadline.
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
              <h2 className="calc-inputs__title">Your {taxYear} contributions</h2>
              <ISASlider label="Cash ISA"                emoji="💰" desc="Savings interest, tax-free"                        value={cash}   setValue={setCash}   sliderMax={cashMax}   />
              <ISASlider label="Stocks & Shares ISA"     emoji="📈" desc="Investment growth &amp; dividends, tax-free"       value={stocks} setValue={setStocks} sliderMax={stocksMax} />
              <ISASlider label="Lifetime ISA (LISA)"     emoji="🏡" desc={`Max £4,000/year · 25% government bonus`}         value={lisa}   setValue={setLisa}   sliderMax={lisaMax}   />
              <ISASlider label="Innovative Finance ISA"  emoji="🔗" desc="Peer-to-peer lending returns, tax-free"            value={ifisa}  setValue={setIfisa}  sliderMax={ifisaMax}  />
              <p className="calc-disclaimer">
                For educational purposes only. ISA rules and allowances can change. The allowance resets on 6 April each year. Unused allowance cannot be carried forward.
              </p>
            </div>

            <div className="calc-results">
              <div className="calc-summary">
                <div className="calc-summary__main">
                  <div className="calc-summary__label">
                    {isMaxed ? 'ISA allowance fully used' : `Remaining allowance ${taxYear}`}
                  </div>
                  <div className="calc-summary__value">{fmt(remaining)}</div>
                  <div className="calc-summary__multiplier">
                    {isMaxed
                      ? '🎉 You\'ve used your full allowance — excellent!'
                      : `${fmt(total)} of ${fmt(ANNUAL_ALLOWANCE)} used this year`}
                  </div>
                </div>
                <div className="calc-summary__breakdown">
                  <div className="calc-summary__item">
                    <div className="calc-summary__item-dot calc-summary__item-dot--green" />
                    <div>
                      <div className="calc-summary__item-label">Contributed</div>
                      <div className="calc-summary__item-val">{fmt(total)}</div>
                    </div>
                  </div>
                  <div className="calc-summary__item">
                    <div className="calc-summary__item-dot calc-summary__item-dot--grey" />
                    <div>
                      <div className="calc-summary__item-label">Remaining</div>
                      <div className="calc-summary__item-val">{fmt(remaining)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="isa-bar-wrap">
                <div className="isa-bar__labels">
                  <span>£0</span>
                  <span>£20,000 annual allowance</span>
                </div>
                <div className="isa-bar">
                  {barCash   > 0 && <div className="isa-bar__seg isa-bar__seg--cash"   style={{ width: `${barCash}%` }} />}
                  {barStocks > 0 && <div className="isa-bar__seg isa-bar__seg--stocks" style={{ width: `${barStocks}%` }} />}
                  {barLisa   > 0 && <div className="isa-bar__seg isa-bar__seg--lisa"   style={{ width: `${barLisa}%` }} />}
                  {barIfisa  > 0 && <div className="isa-bar__seg isa-bar__seg--ifisa"  style={{ width: `${barIfisa}%` }} />}
                </div>
                <div className="isa-bar__legend">
                  <span><span className="isa-bar__dot isa-bar__dot--cash"   />Cash ISA</span>
                  <span><span className="isa-bar__dot isa-bar__dot--stocks" />Stocks &amp; Shares</span>
                  <span><span className="isa-bar__dot isa-bar__dot--lisa"   />LISA</span>
                  <span><span className="isa-bar__dot isa-bar__dot--ifisa"  />IF ISA</span>
                  <span><span className="isa-bar__dot isa-bar__dot--rem"    />Remaining</span>
                </div>
              </div>

              <div className="isa-breakdown">
                <div className="isa-breakdown__header">
                  <span>ISA type</span>
                  <span>Amount</span>
                  <span>% used</span>
                </div>
                {breakdown.map(row => (
                  <div key={row.label} className={`isa-breakdown__row${row.value === 0 ? ' isa-breakdown__row--empty' : ''}`}>
                    <div className="isa-breakdown__name">
                      <span>{row.emoji}</span>
                      <span>{row.label}</span>
                      {row.note && <span className="isa-breakdown__note">{row.note}</span>}
                    </div>
                    <span className="isa-breakdown__val">{fmt(row.value)}</span>
                    <span className="isa-breakdown__pct">{pctOfAllowance(row.value)}</span>
                  </div>
                ))}
                <div className="isa-breakdown__total">
                  <span>Total used</span>
                  <span>{fmt(total)}</span>
                  <span>{pctOfAllowance(total)}</span>
                </div>
              </div>

              {lisa > 0 && (
                <div className="calc-insight">
                  <span className="calc-insight__icon">🎁</span>
                  <p>
                    Your {fmt(lisa)} LISA contribution earns a{' '}
                    <strong style={{ color: 'var(--green)' }}>{fmt(lisaBonus)} government bonus</strong>{' '}
                    — added automatically to your account. That&apos;s free money toward your first home or retirement.
                  </p>
                </div>
              )}

              {remaining > 0 && total > 0 && (
                <div className="calc-insight">
                  <span className="calc-insight__icon">⏰</span>
                  <p>
                    You still have <strong>{fmt(remaining)}</strong> of tax-free allowance left this year. Unused allowance doesn&apos;t roll over — it disappears on 5 April.
                  </p>
                </div>
              )}

              {total === 0 && (
                <div className="calc-insight">
                  <span className="calc-insight__icon">💡</span>
                  <p>
                    You have the full <strong>{fmt(ANNUAL_ALLOWANCE)}</strong> ISA allowance available this tax year. Any money you put in grows completely tax-free — no capital gains tax, no income tax on interest or dividends.
                  </p>
                </div>
              )}
            </div>
          </div>

          {!isAuthenticated && (
            <div className="tool-signup-prompt">
              <div className="tool-signup-prompt__inner">
                <div className="tool-signup-prompt__left">
                  <div className="tool-signup-prompt__eyebrow">Want to make the most of your allowance?</div>
                  <h2 className="tool-signup-prompt__headline">
                    Learn which ISA to use — and how to actually invest inside one
                  </h2>
                  <p className="tool-signup-prompt__sub">
                    Knowing your allowance is step one. Understanding which ISA type suits your goals,
                    how to invest inside a Stocks &amp; Shares ISA, and how to claim your LISA bonus
                    is where the real advantage is. Our free courses cover all of it.
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
                    <Link href="/courses/stocks-etfs-and-funds" className="tool-prompt-course">
                      <span>📈</span>
                      <div>
                        <div className="tool-prompt-course__title">Stocks, ETFs &amp; Funds</div>
                        <div className="tool-prompt-course__meta">10 lessons · Free</div>
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
          )}
        </div>
      </div>
    </div>
  )
}
