'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Backend integration goes here
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__headline">Welcome back</h1>
        <p className="auth-card__sub">Sign in to continue your learning journey.</p>
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

        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label" htmlFor="password">Password</label>
            <a href="#" className="form-label-link">Forgot password?</a>
          </div>
          <div className="form-input-wrap">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="form-input-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn--primary btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`}
          disabled={loading || !email || !password}
        >
          {loading ? (
            <><span className="auth-spinner" /> Signing in…</>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <div className="auth-card__divider">
        <span>New to Flourish?</span>
      </div>

      <Link href="/signup" className="btn btn--outline btn--lg auth-signup-btn">
        Create a free account
      </Link>
    </div>
  )
}
