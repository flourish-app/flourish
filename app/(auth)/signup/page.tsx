'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const AGE_RANGES = ['Under 18', '18–21', '22–25', '26–30', '31+']

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)

  // Step 1
  const [name, setName]           = useState('')
  const [ageRange, setAgeRange]   = useState('')
  const [university, setUniversity] = useState('')
  const [course, setCourse]       = useState('')
  const [notInHE, setNotInHE]     = useState(false)

  // Step 2
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [emailSent, setEmailSent]       = useState(false)

  const strength = (() => {
    if (!password) return 0
    let s = 0
    if (password.length >= 8)           s++
    if (/[A-Z]/.test(password))         s++
    if (/[0-9]/.test(password))         s++
    if (/[^A-Za-z0-9]/.test(password))  s++
    return s
  })()

  const strengthLabel  = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColour = ['', '#f87171', '#f59e0b', '#4caf82', '#2e7d5e'][strength]

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  try {
    const firstName = name.trim().split(' ')[0]
    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password, options: { data: { first_name: firstName } },
    })
    if (signUpError) { setError(signUpError.message); return }
    if (!data.user)  { setError('Something went wrong. Please try again.'); return }
    // Always persist profile data — runs whether email confirmation is on or off
    await supabase.from('profiles').upsert({
      id: data.user.id, email, first_name: firstName,
      age_range: ageRange, university: notInHE ? null : university,
      course: notInHE ? null : course, not_in_he: notInHE,
    })
    if (!data.session) { setEmailSent(true); return }
    router.push('/dashboard')
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Something went wrong.')
  } finally {
    setLoading(false)
  }
}

  const firstName = name.trim().split(' ')[0]

  return (
    <div className="auth-card">

      {/* Progress bar */}
      <div className="signup-progress">
        <div className="signup-progress__track">
          <div
            className="signup-progress__fill"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
        <span className="signup-progress__label">Step {step} of 2</span>
      </div>

      {/* ── Step 1: Name & age ── */}
      {!emailSent && step === 1 && (
        <>
          <div className="auth-card__header">
            <h1 className="auth-card__headline">
              Nice to meet you{firstName ? `, ${firstName}` : ''} 👋
            </h1>
            <p className="auth-card__sub">Tell us a little about yourself to get started.</p>
          </div>

          <form className="auth-form" onSubmit={handleStep1} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="given-name"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="age">Age range</label>
              <div className="age-grid">
                {AGE_RANGES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`age-option${ageRange === r ? ' age-option--selected' : ''}`}
                    onClick={() => setAgeRange(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {!notInHE && (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="university">University</label>
                  <input
                    id="university"
                    type="text"
                    className="form-input"
                    placeholder="e.g. University of Manchester"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                    autoComplete="organization"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="course">Course</label>
                  <input
                    id="course"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Economics"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                  />
                </div>
              </>
            )}

            <label className="form-checkbox-label">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={notInHE}
                onChange={e => {
                  setNotInHE(e.target.checked)
                  if (e.target.checked) { setUniversity(''); setCourse('') }
                }}
              />
              <span>I&apos;m not currently in higher education</span>
            </label>

            <button
              type="submit"
              className="btn btn--primary btn--lg auth-submit"
              disabled={!name.trim() || !ageRange}
            >
              Continue
            </button>
          </form>

          <p className="auth-card__terms" style={{ marginTop: '16px' }}>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </>
      )}

      {/* ── Email confirmation screen ── */}
      {emailSent && (
        <div className="auth-card__header" style={{ textAlign: 'center', padding: '24px 0' }}>
          <h1 className="auth-card__headline">Check your inbox 📬</h1>
          <p className="auth-card__sub">
            We sent a confirmation link to <strong>{email}</strong>.<br />
            Click it to activate your account, then{' '}
            <Link href="/login">sign in</Link>.
          </p>
        </div>
      )}

      {/* ── Step 2: Email & password ── */}
      {!emailSent && step === 2 && (
        <>
          <div className="auth-card__header">
            <h1 className="auth-card__headline">
              {firstName ? `Almost there, ${firstName}` : 'Almost there'} 🌱
            </h1>
            <p className="auth-card__sub">Create your login — it only takes a second.</p>
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
              <label className="form-label" htmlFor="password">Password</label>
              <div className="form-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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
              {password.length > 0 && (
                <div className="password-strength">
                  <div className="password-strength__bars">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="password-strength__bar"
                        style={{ background: i <= strength ? strengthColour : 'var(--grey-2)' }}
                      />
                    ))}
                  </div>
                  <span className="password-strength__label" style={{ color: strengthColour }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn--green btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`}
              disabled={loading || !email || password.length < 8}
            >
              {loading
                ? <><span className="auth-spinner" /> Creating account…</>
                : 'Create free account'
              }
            </button>
          </form>

          <p className="auth-card__terms">
            By creating an account you agree to our{' '}
            <a href="#">Terms of service</a> and <a href="/privacy-policy">Privacy policy</a>.
          </p>

          <button
            type="button"
            className="signup-back"
            onClick={() => setStep(1)}
          >
            ← Back
          </button>
        </>
      )}
    </div>
  )
}
