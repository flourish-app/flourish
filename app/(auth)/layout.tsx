import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Flourish | Learn Investing, Build Wealth & Practise Risk-Free',
  description: 'Flourish helps students and young adults learn investing through interactive courses, practical tools, and a live stock market simulator — built to make finance feel simple.',
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
