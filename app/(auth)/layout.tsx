import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Flourish',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-shell__nav">
        <Link href="/" className="auth-shell__logo">
          <img src="/logo.PNG" alt="Flourish" style={{ height: '30px', width: 'auto' }} />
        </Link>
      </div>
      <main className="auth-shell__main">
        {children}
      </main>
      <div className="auth-shell__footer">
        <p>© 2026 Flourish. <a href="/privacy-policy">Privacy policy</a> · <a href="#">Terms of service</a></p>
      </div>
    </div>
  )
}
