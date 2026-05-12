import Link from 'next/link'

interface Props { email: string }

export default function SignupEmailSent({ email }: Props) {
  return (
    <div className="auth-card__header" style={{ textAlign: 'center', padding: '24px 0' }}>
      <h1 className="auth-card__headline">Check your inbox 📬</h1>
      <p className="auth-card__sub">
        We sent a confirmation link to <strong>{email}</strong>.<br />
        Click it to activate your account, then{' '}
        <Link href="/login">sign in</Link>.
      </p>
    </div>
  )
}
