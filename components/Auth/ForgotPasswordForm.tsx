'use client'

interface Props {
  email:    string
  onEmail:  (v: string) => void
  loading:  boolean
  error:    string
  onSubmit: (e: React.FormEvent) => void
}

export default function ForgotPasswordForm({ email, onEmail, loading, error, onSubmit }: Props) {
  return (
    <>
      <div className="auth-card__header">
        <h1 className="auth-card__headline">Reset your password</h1>
        <p className="auth-card__sub">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email address</label>
          <input id="email" type="email" className="form-input"
            placeholder="you@university.ac.uk" value={email}
            onChange={(e) => onEmail(e.target.value)}
            required autoComplete="email" autoFocus />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className={`btn btn--primary btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`} disabled={loading || !email}>
          {loading ? <><span className="auth-spinner" /> Sending…</> : 'Send reset link'}
        </button>
      </form>
    </>
  )
}
