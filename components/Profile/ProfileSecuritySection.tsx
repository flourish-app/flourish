'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { emailSchema } from '@/components/Auth/types'

type Panel = 'email' | 'password' | null

export default function ProfileSecuritySection({ currentEmail }: { currentEmail: string }) {
  const [open,        setOpen]        = useState<Panel>(null)
  const [newEmail,    setNewEmail]    = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [success,     setSuccess]     = useState<string | null>(null)
  const [error,       setError]       = useState<string | null>(null)

  function toggle(panel: Panel) {
    setOpen(prev => prev === panel ? null : panel)
    setNewEmail(''); setEmailTouched(false)
    setSuccess(null); setError(null)
  }

  // ── Email validation ──────────────────────────────────────
  const emailResult = emailSchema.safeParse(newEmail)
  const emailValid  = emailResult.success && newEmail !== currentEmail
  const emailErr    = emailTouched && !emailResult.success
    ? emailResult.error.issues[0]?.message
    : emailTouched && newEmail === currentEmail
      ? 'This is already your current email'
      : null

  // ── Handlers ─────────────────────────────────────────────
  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault()
    if (!emailValid) return
    setLoading(true); setError(null); setSuccess(null)
    const { error: err } = await supabase.auth.updateUser({ email: newEmail })
    setLoading(false)
    if (err) { setError(err.message); return }
    setSuccess(`Confirmation sent to ${newEmail}. Check your inbox to complete the change.`)
    setNewEmail('')
  }

  async function handlePasswordReset() {
    setLoading(true); setError(null); setSuccess(null)
    const { error: err } = await supabase.auth.resetPasswordForEmail(currentEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    setSuccess(`Password reset email sent to ${currentEmail}. Check your inbox.`)
  }

  return (
    <div className="profile-security">
      <p className="profile-security__title">Account &amp; security</p>

      {/* Email */}
      <div className="profile-security__row">
        <div className="profile-security__row-info">
          <span className="profile-security__row-label">Email address</span>
          <span className="profile-security__row-value">{currentEmail}</span>
        </div>
        <button
          className="btn btn--outline btn--sm"
          onClick={() => toggle('email')}
        >
          {open === 'email' ? 'Cancel' : 'Change'}
        </button>
      </div>

      {open === 'email' && (
        <form className="profile-security__form" onSubmit={handleEmailChange} noValidate>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="new-email">New email address</label>
            <input
              id="new-email" type="email"
              className={`form-input${emailErr ? ' form-input--error' : ''}`}
              placeholder="new@email.com"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              autoComplete="email"
            />
            {emailErr && <p className="form-field-error">{emailErr}</p>}
          </div>
          {success && open === 'email' && <p className="profile-security__success">{success}</p>}
          {error  && open === 'email' && <p className="profile-security__error">{error}</p>}
          <button
            type="submit"
            className={`btn btn--primary btn--sm${loading ? ' auth-submit--loading' : ''}`}
            disabled={loading || !emailValid}
          >
            {loading ? <><span className="auth-spinner" style={{ width: 14, height: 14 }} /> Sending…</> : 'Send confirmation'}
          </button>
        </form>
      )}

      <div className="profile-security__divider" />

      {/* Password */}
      <div className="profile-security__row">
        <div className="profile-security__row-info">
          <span className="profile-security__row-label">Password</span>
          <span className="profile-security__row-value">••••••••••</span>
        </div>
        <button
          className="btn btn--outline btn--sm"
          onClick={() => toggle('password')}
        >
          {open === 'password' ? 'Cancel' : 'Reset'}
        </button>
      </div>

      {open === 'password' && (
        <div className="profile-security__form">
          <p className="profile-security__hint">
            We&apos;ll send a password reset link to <strong>{currentEmail}</strong>.
          </p>
          {success && open === 'password' && <p className="profile-security__success">{success}</p>}
          {error  && open === 'password' && <p className="profile-security__error">{error}</p>}
          {!success && (
            <button
              className={`btn btn--primary btn--sm${loading ? ' auth-submit--loading' : ''}`}
              onClick={handlePasswordReset}
              disabled={loading}
            >
              {loading ? <><span className="auth-spinner" style={{ width: 14, height: 14 }} /> Sending…</> : 'Send reset email'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
