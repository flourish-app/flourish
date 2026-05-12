'use client'

import type { SignupStep2Props } from './types'

export default function SignupStep2({
  firstName, email, onEmail, password, onPassword,
  showPassword, onShowPassword, strength, strengthLabel, strengthColour,
  loading, error, onSubmit, onBack,
}: SignupStep2Props) {
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
          <input id="email" type="email" className="form-input"
            placeholder="you@university.ac.uk" value={email}
            onChange={(e) => onEmail(e.target.value)}
            required autoComplete="email" autoFocus />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="form-input-wrap">
            <input id="password" type={showPassword ? 'text' : 'password'} className="form-input"
              placeholder="••••••••" value={password}
              onChange={(e) => onPassword(e.target.value)}
              required autoComplete="new-password" />
            <button type="button" className="form-input-toggle" onClick={onShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
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

        <button type="submit" className={`btn btn--green btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`}
          disabled={loading || !email || password.length < 8}>
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
