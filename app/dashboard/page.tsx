'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
        return
      }
      // Enforce "remember me = off": if user unchecked it, only allow access
      // while the browser session cookie is present (cleared on browser close)
      const noRemember = localStorage.getItem('fl_remember') === '0'
      const hasSessionCookie = document.cookie.split(';').some(c => c.trim().startsWith('fl_sess='))
      if (noRemember && !hasSessionCookie) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      setProfile(data)
      setLoading(false)
    }
    init()
  }, [router])

  if (loading) {
    return (
      <div className="dashboard-loading">
        <span className="auth-spinner" />
      </div>
    )
  }

  const firstName = profile?.first_name ?? 'there'

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__greeting">Hey, {firstName} 👋</h1>
          <p className="dashboard__sub">Welcome back to Flourish. Keep up the great work.</p>
        </div>
      </header>

      <div className="dashboard__grid">

        {/* Continue Learning */}
        <section className="dashboard-card dashboard-card--featured">
          <p className="dashboard-card__eyebrow">Continue learning</p>
          <h2 className="dashboard-card__title">Introduction to Investing</h2>
          <p className="dashboard-card__desc">Lesson 3 of 8 · Stocks and shares explained</p>
          <div className="dashboard-progress">
            <div className="dashboard-progress__bar" style={{ width: '37%' }} />
          </div>
          <span className="dashboard-progress__label">37% complete</span>
          <button className="btn btn--green btn--sm" style={{ marginTop: '16px' }}>
            Resume lesson
          </button>
        </section>

        {/* Stats */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Your progress</p>
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Lessons done</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Day streak</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Points earned</span>
            </div>
          </div>
        </section>

        {/* Portfolio preview */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Portfolio simulator</p>
          <h2 className="dashboard-card__title">£0.00</h2>
          <p className="dashboard-card__desc">Start your virtual portfolio to practise investing risk-free.</p>
          <button className="btn btn--outline btn--sm" style={{ marginTop: '16px' }}>
            Get started
          </button>
        </section>

        {/* Recommended */}
        <section className="dashboard-card">
          <p className="dashboard-card__eyebrow">Recommended for you</p>
          <ul className="dashboard-lessons">
            {[
              'What is compound interest?',
              'ISAs explained for students',
              'How the stock market works',
            ].map((title) => (
              <li key={title} className="dashboard-lesson">
                <span className="dashboard-lesson__dot" />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}
