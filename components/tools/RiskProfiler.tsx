'use client'

import { useState } from 'react'
import Link from 'next/link'

const QUESTIONS = [
  {
    q: 'When do you expect to need this money?',
    hint: 'Think about your primary investment goal.',
    options: [
      { label: 'Within 2 years',   sub: 'Short-term goal like a holiday or car deposit',    score: 0 },
      { label: '2 to 5 years',     sub: 'Medium-term goal like a house deposit',             score: 1 },
      { label: '5 to 10 years',    sub: 'Longer-term financial security',                    score: 2 },
      { label: '10 years or more', sub: 'Retirement or very long-term wealth building',      score: 3 },
    ],
  },
  {
    q: 'Your portfolio falls 25% in a year. What do you do?',
    hint: "Be honest — there are no right or wrong answers here.",
    options: [
      { label: 'Sell everything',     sub: "I can't stomach seeing my money fall",           score: 0 },
      { label: 'Sell some holdings',  sub: 'Reduce my exposure to limit further losses',     score: 1 },
      { label: 'Hold and wait',       sub: "I trust it'll recover — I won't panic",          score: 2 },
      { label: 'Buy more',            sub: 'Lower prices are an opportunity, not a problem', score: 3 },
    ],
  },
  {
    q: 'What matters most to you as an investor?',
    hint: 'Pick the statement that best matches your mindset.',
    options: [
      { label: 'Protecting what I put in', sub: "I don't want to lose money, even if it grows slowly",  score: 0 },
      { label: 'Slow, steady growth',      sub: 'Modest returns with limited risk',                      score: 1 },
      { label: 'Strong long-term growth',  sub: "I'm happy with some ups and downs for better returns",  score: 2 },
      { label: 'Maximum growth',           sub: 'Highest possible returns — I accept the volatility',    score: 3 },
    ],
  },
  {
    q: 'Do you have a financial safety net outside of investments?',
    hint: 'Emergency savings you could access without touching your investments.',
    options: [
      { label: 'No safety net',        sub: "I'd need to dip into investments if something went wrong", score: 0 },
      { label: 'Less than 3 months',   sub: "I have some savings but it's limited",                     score: 1 },
      { label: '3 to 6 months saved',  sub: 'A solid emergency fund in place',                          score: 2 },
      { label: '6+ months saved',      sub: 'Well covered for unexpected costs',                         score: 3 },
    ],
  },
  {
    q: 'How would you describe your investing experience?',
    hint: 'Your knowledge level helps us calibrate your profile.',
    options: [
      { label: 'Complete beginner',    sub: "I've never invested before",                       score: 0 },
      { label: 'Some knowledge',       sub: "I understand the basics but haven't invested yet", score: 1 },
      { label: 'Some experience',      sub: "I've invested before and understand the risks",    score: 2 },
      { label: 'Experienced investor', sub: "I'm comfortable navigating market volatility",     score: 3 },
    ],
  },
]

type ProfileDef = {
  name: string; emoji: string; tagline: string; desc: string
  equities: number; bonds: number; cash: number; tips: string[]
  courses: { href: string; emoji: string; title: string; meta: string }[]
}

const PROFILES: ProfileDef[] = [
  {
    name: 'Conservative', emoji: '🛡️', tagline: 'Capital protection is your priority',
    desc: "You value stability above growth. Short time horizons, limited emergency savings, or a low tolerance for loss all point here. Your goal is to avoid losing money — even if that means slower returns.",
    equities: 20, bonds: 70, cash: 10,
    tips: ['Cash ISAs and premium bonds suit your profile well', 'Government bond funds offer slightly better returns than cash with limited downside', 'As your circumstances change, your risk profile can too — revisit it annually'],
    courses: [
      { href: '/courses/isas-and-tax-free-saving', emoji: '🏦', title: 'ISAs & Tax-Free Saving', meta: '6 lessons · Free' },
      { href: '/courses/investing-from-scratch',   emoji: '🚀', title: 'Investing from Scratch',  meta: '8 lessons · Free' },
    ],
  },
  {
    name: 'Cautious', emoji: '⚖️', tagline: 'Stability with a little growth on the side',
    desc: "You want your money to grow but not at the cost of sleepless nights. A mostly defensive portfolio with some equity exposure gives you modest returns without the stomach-churning swings.",
    equities: 40, bonds: 55, cash: 5,
    tips: ['A cautious or balanced fund inside a Stocks & Shares ISA fits your profile well', 'Diversified bond funds add stability without giving up all growth potential', 'Time in the market typically reduces risk — even for cautious investors'],
    courses: [
      { href: '/courses/isas-and-tax-free-saving', emoji: '🏦', title: 'ISAs & Tax-Free Saving', meta: '6 lessons · Free' },
      { href: '/courses/stocks-etfs-and-funds',    emoji: '📊', title: 'Stocks, ETFs & Funds',   meta: '10 lessons · Free' },
    ],
  },
  {
    name: 'Balanced', emoji: '📊', tagline: 'Growth with managed risk',
    desc: "You're comfortable with market ups and downs and understand that short-term volatility is the price of long-term growth. A balanced mix of equities and bonds gives you strong compounding over time.",
    equities: 60, bonds: 35, cash: 5,
    tips: ['Low-cost global index funds are a great fit for your balanced profile', 'A Stocks & Shares ISA means all your growth is completely tax-free', 'Stay the course during downturns — time in the market is your biggest advantage'],
    courses: [
      { href: '/courses/stocks-etfs-and-funds',  emoji: '📊', title: 'Stocks, ETFs & Funds',  meta: '10 lessons · Free' },
      { href: '/courses/investing-from-scratch', emoji: '🚀', title: 'Investing from Scratch', meta: '8 lessons · Free' },
    ],
  },
  {
    name: 'Adventurous', emoji: '🚀', tagline: 'Maximum long-term growth',
    desc: "You have a long time horizon, a strong emergency fund, and the stomach for volatility. You see market dips as buying opportunities. Your focus is on building wealth over decades, not avoiding short-term noise.",
    equities: 85, bonds: 10, cash: 5,
    tips: ['Global equity index funds and ETFs maximise your long-term growth potential', 'Filling your ISA allowance every year keeps all gains completely tax-free', 'Regular monthly investing smooths out market timing and builds discipline'],
    courses: [
      { href: '/courses/stocks-etfs-and-funds',    emoji: '📊', title: 'Stocks, ETFs & Funds',    meta: '10 lessons · Free' },
      { href: '/courses/pensions-and-your-future', emoji: '🔮', title: 'Pensions & Your Future',   meta: '9 lessons · Free' },
    ],
  },
]

const MAX_SCORE = QUESTIONS.length * 3

function getProfile(score: number): ProfileDef {
  if (score <= 4)  return PROFILES[0]
  if (score <= 8)  return PROFILES[1]
  if (score <= 11) return PROFILES[2]
  return PROFILES[3]
}

export function RiskProfiler({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [step, setStep]       = useState(0)
  const [done, setDone]       = useState(false)

  const currentQ      = QUESTIONS[step]
  const currentAnswer = answers[step]
  const isLast        = step === QUESTIONS.length - 1

  const score   = answers.reduce<number>((acc, a, i) => acc + (a !== null ? QUESTIONS[i].options[a].score : 0), 0)
  const profile = getProfile(score)

  const select = (idx: number) => setAnswers(prev => { const n = [...prev]; n[step] = idx; return n })
  const next   = () => isLast ? setDone(true) : setStep(s => s + 1)
  const back   = () => setStep(s => s - 1)
  const retake = () => { setAnswers(Array(QUESTIONS.length).fill(null)); setStep(0); setDone(false) }

  const scorePct    = (score / MAX_SCORE) * 100
  const progressPct = (step / QUESTIONS.length) * 100

  const signupContent = done
    ? {
        eyebrow:  `Ready to invest as a ${profile.name.toLowerCase()} investor?`,
        headline: `Learn exactly what to do with your ${profile.name.toLowerCase()} risk profile`,
        sub:      'Your profile gives you a direction. Our free courses give you the knowledge to follow it — step by step, no jargon, no selling.',
        courses:  profile.courses,
      }
    : {
        eyebrow:  'Understand investing before you start',
        headline: 'Free courses built for UK students — start from zero',
        sub:      'Clear, honest education about ISAs, ETFs, and how to start investing with whatever you have. No jargon, no selling.',
        courses: [
          { href: '/courses/investing-from-scratch',   emoji: '🚀', title: 'Investing from Scratch', meta: '8 lessons · Free' },
          { href: '/courses/isas-and-tax-free-saving', emoji: '🏦', title: 'ISAs & Tax-Free Saving', meta: '6 lessons · Free' },
        ],
      }

  return (
    <div className="tool-page">
      <div className="tool-hero">
        <div className="container">
          <div className="tool-hero__breadcrumb">
            <Link href="/tools">Tools</Link>
            <span>›</span>
            <span>Risk profiler</span>
          </div>
          <div className="tool-hero__inner">
            <div>
              <div className="tool-hero__icon">⚖️</div>
              <h1 className="tool-hero__headline">Risk profiler</h1>
              <p className="tool-hero__sub">
                Five questions. Two minutes. A personalised investing risk profile that tells you what kind of investor you are — and what that means for how you should invest.
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
          <div className="risk-profiler">
            {!done ? (
              <div className="risk-card">
                <div className="risk-progress">
                  <div className="risk-progress__track">
                    <div className="risk-progress__fill" style={{ width: `${progressPct}%` }} />
                  </div>
                  <span className="risk-progress__label">{step + 1} of {QUESTIONS.length}</span>
                </div>
                <div className="risk-q">
                  <div className="risk-q__num">Question {step + 1}</div>
                  <h2 className="risk-q__text">{currentQ.q}</h2>
                  <p className="risk-q__hint">{currentQ.hint}</p>
                </div>
                <div className="risk-options">
                  {currentQ.options.map((opt, i) => (
                    <button key={i} className={`risk-option${currentAnswer === i ? ' risk-option--selected' : ''}`} onClick={() => select(i)}>
                      <div className="risk-option__check">{currentAnswer === i && '✓'}</div>
                      <div className="risk-option__body">
                        <div className="risk-option__label">{opt.label}</div>
                        <div className="risk-option__sub">{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="risk-nav">
                  {step > 0 ? <button className="btn btn--outline" onClick={back}>← Back</button> : <div />}
                  <button className="btn btn--primary" onClick={next} disabled={currentAnswer === null}>
                    {isLast ? 'See my profile →' : 'Next →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="risk-result">
                <div className="risk-result__header">
                  <div className="risk-result__emoji">{profile.emoji}</div>
                  <div className="risk-result__title">
                    <div className="risk-result__label">Your risk profile</div>
                    <h2 className="risk-result__name">{profile.name}</h2>
                    <div className="risk-result__tagline">{profile.tagline}</div>
                  </div>
                  <div className="risk-result__score-badge">
                    <div className="risk-result__score-num">{score}</div>
                    <div className="risk-result__score-denom">/ {MAX_SCORE}</div>
                  </div>
                </div>
                <p className="risk-result__desc">{profile.desc}</p>
                <div className="risk-score-track">
                  <div className="risk-score-track__labels">
                    <span>Conservative</span><span>Cautious</span><span>Balanced</span><span>Adventurous</span>
                  </div>
                  <div className="risk-score-track__bar">
                    <div className="risk-score-track__marker" style={{ left: `clamp(10px, ${scorePct}%, calc(100% - 10px))` }} />
                  </div>
                </div>
                <div className="risk-alloc">
                  <h3 className="risk-alloc__title">Typical allocation for this risk profile</h3>
                  <div className="isa-bar" style={{ height: '28px', borderRadius: '10px' }}>
                    <div className="isa-bar__seg" style={{ width: `${profile.equities}%`, background: 'var(--green)' }} />
                    <div className="isa-bar__seg" style={{ width: `${profile.bonds}%`,    background: 'var(--grey-3)' }} />
                    <div className="isa-bar__seg" style={{ width: `${profile.cash}%`,     background: 'var(--grey-2)' }} />
                  </div>
                  <div className="risk-alloc__legend">
                    <span><span className="risk-alloc__dot" style={{ background: 'var(--green)' }} />Equities {profile.equities}%</span>
                    <span><span className="risk-alloc__dot" style={{ background: 'var(--grey-3)' }} />Bonds {profile.bonds}%</span>
                    <span><span className="risk-alloc__dot" style={{ background: 'var(--grey-2)', border: '1px solid var(--grey-3)' }} />Cash {profile.cash}%</span>
                  </div>
                  <p className="risk-alloc__note">
                    This is a general starting point relevant to your risk level, not personalised financial advice. Your ideal allocation depends on your individual circumstances and decisions. These numbers are illustrative only and not financial advice. Consider doing your own research or speaking to a FCA-regulated adviser before making investment decisions.
                  </p>
                </div>
                <div className="risk-tips">
                  <h3 className="risk-tips__title">What this means for you</h3>
                  <ul className="risk-tips__list">
                    {profile.tips.map((tip, i) => (
                      <li key={i} className="risk-tips__item"><span className="risk-tips__dot" />{tip}</li>
                    ))}
                  </ul>
                </div>
                <button className="risk-retake" onClick={retake}>↺ Retake the quiz</button>
              </div>
            )}

            {!isAuthenticated && (
              <div className="tool-signup-prompt">
                <div className="tool-signup-prompt__inner">
                  <div className="tool-signup-prompt__left">
                    <div className="tool-signup-prompt__eyebrow">{signupContent.eyebrow}</div>
                    <h2 className="tool-signup-prompt__headline">{signupContent.headline}</h2>
                    <p className="tool-signup-prompt__sub">{signupContent.sub}</p>
                    <div className="tool-signup-prompt__courses">
                      {signupContent.courses.map(c => (
                        <Link key={c.href} href={c.href} className="tool-prompt-course">
                          <span>{c.emoji}</span>
                          <div><div className="tool-prompt-course__title">{c.title}</div><div className="tool-prompt-course__meta">{c.meta}</div></div>
                          <span className="tool-prompt-course__arrow">→</span>
                        </Link>
                      ))}
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
    </div>
  )
}
