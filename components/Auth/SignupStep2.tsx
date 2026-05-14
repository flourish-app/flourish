'use client'

import { useState } from 'react'
import { signupStep2Schema } from './types'
import type { SignupStep2Props } from './types'

const PASSWORD_RULES = [
  { label: 'At least 8 characters',       test: (p: string) => p.length >= 8 },
  { label: 'Upper & lowercase letters',   test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { label: 'At least one number',           test: (p: string) => /[0-9]/.test(p) },
  { label: 'At least one special character', test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
]

export default function SignupStep2({
  firstName, email, onEmail, password, onPassword,
  showPassword, onShowPassword, strength, strengthLabel, strengthColour,
  loading, error, onSubmit, onBack,
}: SignupStep2Props) {
  const [touched, setTouched] = useState({ email: false, password: false })

  const result   = signupStep2Schema.safeParse({ email, password })
  const isValid  = result.success
  const emailErr = touched.email && !result.success
    ? result.error.issues.find(i => i.path[0] === 'email')?.message ?? null
    : null

  return (
    <>
      <div className="auth-card__header">
        <h1 className="auth-card__headline">
          {firstName ? `Almost there, ${firstName}` : 'Almost there'} 🌱
        </h1>
        <p className="auth-card__sub">Create your login — it only takes a second.</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email address</label>
          <input
            id="email" type="email"
            className={`form-input${emailErr ? ' form-input--error' : ''}`}
            placeholder="you@university.ac.uk" value={email}
            onChange={(e) => onEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            required autoComplete="email" autoFocus
          />
          {emailErr && <p className="form-field-error">{emailErr}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="form-input-wrap">
            <input
              id="password" type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="••••••••" value={password}
              onChange={(e) => onPassword(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              required autoComplete="new-password"
            />
            <button type="button" className="form-input-toggle" onClick={onShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Password rules */}
          <ul className="password-rules">
            {PASSWORD_RULES.map(({ label, test }) => {
              const pass = test(password)
              return (
                <li key={label} className={`password-rules__item${pass ? ' password-rules__item--pass' : ''}`}>
                  <span className="password-rules__icon">{pass ? '✓' : '·'}</span>
                  {label}
                </li>
              )
            })}
          </ul>

          {password.length > 0 && (
            <div className="password-strength">
              <div className="password-strength__bars">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="password-strength__bar"
                    style={{ background: i <= strength ? strengthColour : 'var(--grey-2)' }} />
                ))}
              </div>
              <span className="password-strength__label" style={{ color: strengthColour }}>{strengthLabel}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn--green btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`}
          disabled={loading || !isValid}
        >
          {loading ? <><span className="auth-spinner" /> Creating account…</> : 'Create free account'}
        </button>
      </form>

      <p className="auth-card__terms">
        By creating an account you agree to our{' '}
        <a href="#">Terms of service</a> and <a href="/privacy-policy">Privacy policy</a>.
      </p>

      {error && <p className="auth-error" style={{ marginTop: '12px' }}>{error}</p>}

      <button type="button" className="signup-back" onClick={onBack}>← Back</button>
    </>
  )
}
