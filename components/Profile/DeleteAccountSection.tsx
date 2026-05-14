'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DeleteAccountSection() {
  const router  = useRouter()
  const [open,    setOpen]    = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleDelete() {
    setDeleting(true)
    setError(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/login'); return }

      const res = await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      })

      if (!res.ok) {
        const body = await res.json()
        setError(body.error ?? 'Something went wrong. Please try again.')
        setDeleting(false)
        return
      }

      await supabase.auth.signOut()
      router.replace('/?deleted=1')
    } catch {
      setError('Something went wrong. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="danger-zone">
        <div className="danger-zone__content">
          <p className="danger-zone__title">Delete account</p>
          <p className="danger-zone__sub">
            Permanently removes your account and all associated data. This cannot be undone.
          </p>
        </div>
        <button className="btn btn--danger" onClick={() => setOpen(true)}>
          Delete account
        </button>
      </div>

      {open && (
        <div className="delete-modal-backdrop" onClick={() => !deleting && setOpen(false)}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <div className="delete-modal__icon">⚠️</div>
            <h2 className="delete-modal__title">Delete your account?</h2>
            <p className="delete-modal__body">
              This will permanently delete your account, progress, portfolio, and all data.
              <strong> This action cannot be undone.</strong>
            </p>
            {error && <p className="auth-error" style={{ marginBottom: 0 }}>{error}</p>}
            <div className="delete-modal__actions">
              <button
                className="btn btn--outline"
                onClick={() => setOpen(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className={`btn btn--danger${deleting ? ' auth-submit--loading' : ''}`}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? <><span className="auth-spinner" /> Deleting…</> : 'Yes, delete my account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
