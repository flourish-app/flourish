'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (searchParams.get('reset') === '1') setSuccessMsg('Password updated — sign in with your new password.')
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) { setError(signInError.message); return }
      if (rememberMe) {
        localStorage.setItem('fl_remember', '1')
      } else {
        localStorage.setItem('fl_remember', '0')
        document.cookie = 'fl_sess=1; path=/; SameSite=Strict'
      }
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
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
            <Link href="/forgot-password" className="form-label-link">Forgot password?</Link>
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

        <label className="form-checkbox-label">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <span>Remember me</span>
        </label>

        {successMsg && <p className="auth-success">{successMsg}</p>}
        {error && <p className="auth-error">{error}</p>}

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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
