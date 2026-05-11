'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) { setError(resetError.message); return }
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__headline">Check your inbox</h1>
          <p className="auth-card__sub">
            We sent a password reset link to <strong>{email}</strong>. Check your spam folder if it doesn&apos;t arrive within a minute.
          </p>
        </div>
        <Link href="/login" className="btn btn--outline btn--lg auth-signup-btn">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__headline">Reset your password</h1>
        <p className="auth-card__sub">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="you@university.ac.uk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button
          type="submit"
          className={`btn btn--primary btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`}
          disabled={loading || !email}
        >
          {loading ? (
            <><span className="auth-spinner" /> Sending…</>
          ) : (
            'Send reset link'
          )}
        </button>
      </form>

      <div className="auth-card__divider">
        <span>Remembered it?</span>
      </div>

      <Link href="/login" className="btn btn--outline btn--lg auth-signup-btn">
        Back to sign in
      </Link>
    </div>
  )
}
