'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm'
import ForgotPasswordSent from '@/components/Auth/ForgotPasswordSent'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [sent,    setSent]    = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) { setError(resetError.message); return }
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      {sent
        ? <ForgotPasswordSent email={email} />
        : <ForgotPasswordForm email={email} onEmail={setEmail} loading={loading} error={error} onSubmit={handleSubmit} />
      }
      {!sent && (
        <>
          <div className="auth-card__divider"><span>Remembered it?</span></div>
          <Link href="/login" className="btn btn--outline btn--lg auth-signup-btn">Back to sign in</Link>
        </>
      )}
    </div>
  )
}
