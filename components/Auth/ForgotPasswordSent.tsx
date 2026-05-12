import Link from 'next/link'

interface Props { email: string }

export default function ForgotPasswordSent({ email }: Props) {
  return (
    <>
      <div className="auth-card__header">
        <h1 className="auth-card__headline">Check your inbox</h1>
        <p className="auth-card__sub">
          We sent a password reset link to <strong>{email}</strong>. Check your spam folder if it doesn&apos;t arrive within a minute.
        </p>
      </div>
      <Link href="/login" className="btn btn--outline btn--lg auth-signup-btn">Back to sign in</Link>
    </>
  )
}
