'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password,     setPassword]     = useState('')
  const [confirm,      setConfirm]      = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [ready,        setReady]        = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError("Passwords don't match."); return }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) { setError(updateError.message); return }
      await supabase.auth.signOut()
      router.replace('/login?reset=1')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!ready) {
    return (
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__headline">Verifying link…</h1>
          <p className="auth-card__sub">Please wait while we verify your reset link.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-card">
      <ResetPasswordForm
        password={password}       onPassword={setPassword}
        confirm={confirm}         onConfirm={setConfirm}
        showPassword={showPassword} onShowPassword={() => setShowPassword(!showPassword)}
        loading={loading}         error={error}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
