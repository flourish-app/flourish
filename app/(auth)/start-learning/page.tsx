import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Start learning free - Flourish',
}

const perks = [
  { icon: '🧩', text: 'Bite-sized lessons on ISAs, ETFs, pensions and more' },
  { icon: '🛡️', text: 'Virtual £10,000 portfolio to practice risk-free' },
  { icon: '🧮', text: 'Free tools — compound calculator, ISA tracker, LISA calculator' },
  { icon: '⏱️', text: 'Learn at your own pace, no deadlines' },
  { icon: '0️⃣', text: 'Completely free — no card, no catch' },
]

export default function StartLearningPage() {
  return (
    <div className="start-card">
      <div className="start-card__badge">
        <span className="start-card__badge-dot" />
        Free forever · Built for UK students
      </div>

      <h1 className="start-card__headline">
        Everything you need to <em>actually</em> understand investing
      </h1>
      <p className="start-card__sub">
        No jargon. No assumptions. Just clear, honest education that starts from zero.
      </p>

      <ul className="start-perks">
        {perks.map((p) => (
          <li key={p.text} className="start-perk">
            <span className="start-perk__icon">{p.icon}</span>
            <span className="start-perk__text">{p.text}</span>
          </li>
        ))}
      </ul>

      <Link href="/signup" className="btn btn--primary btn--lg start-card__cta">
        Create your free account
      </Link>

      <p className="start-card__login">
        Already have an account?{' '}
        <Link href="/login">Sign in</Link>
      </p>
    </div>
  )
}
