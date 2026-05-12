'use client'

interface Props {
  password:       string
  onPassword:     (v: string) => void
  confirm:        string
  onConfirm:      (v: string) => void
  showPassword:   boolean
  onShowPassword: () => void
  loading:        boolean
  error:          string
  onSubmit:       (e: React.FormEvent) => void
}

export default function ResetPasswordForm({
  password, onPassword, confirm, onConfirm,
  showPassword, onShowPassword, loading, error, onSubmit,
}: Props) {
  return (
    <>
      <div className="auth-card__header">
        <h1 className="auth-card__headline">Choose a new password</h1>
        <p className="auth-card__sub">Must be at least 8 characters.</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="password">New password</label>
          <div className="form-input-wrap">
            <input id="password" type={showPassword ? 'text' : 'password'} className="form-input"
              placeholder="••••••••" value={password}
              onChange={(e) => onPassword(e.target.value)}
              required autoComplete="new-password" autoFocus />
            <button type="button" className="form-input-toggle" onClick={onShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirm">Confirm password</label>
          <input id="confirm" type={showPassword ? 'text' : 'password'} className="form-input"
            placeholder="••••••••" value={confirm}
            onChange={(e) => onConfirm(e.target.value)}
            required autoComplete="new-password" />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className={`btn btn--primary btn--lg auth-submit${loading ? ' auth-submit--loading' : ''}`}
          disabled={loading || !password || !confirm}>
          {loading ? <><span className="auth-spinner" /> Updating…</> : 'Set new password'}
        </button>
      </form>
    </>
  )
}
