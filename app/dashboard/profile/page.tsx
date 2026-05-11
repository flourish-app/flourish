'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'

const AGE_RANGES = ['Under 18', '18–21', '22–25', '26–30', '31+']

function getInitials(name: string | null, email: string | null): string {
  if (name?.trim()) return name.trim()[0].toUpperCase()
  if (email) return email[0].toUpperCase()
  return '?'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Draft state for the edit form
  const [draft, setDraft] = useState({
    first_name: '',
    age_range: '',
    university: '',
    course: '',
  })

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })

    const init = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      setProfile(data)
      setLoading(false)
    }
    init()

    return () => subscription.unsubscribe()
  }, [router])

  function openEdit() {
    if (!profile) return
    setDraft({
      first_name: profile.first_name ?? '',
      age_range: profile.age_range ?? '',
      university: profile.university ?? '',
      course: profile.course ?? '',
    })
    setSaveError(null)
    setEditing(true)
  }

  function cancelEdit() {
    setEditing(false)
    setSaveError(null)
  }

  async function saveEdit() {
    if (!profile) return
    setSaving(true)
    setSaveError(null)
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: draft.first_name.trim() || null,
        age_range: draft.age_range || null,
        university: draft.university.trim() || null,
        course: draft.course.trim() || null,
      })
      .eq('id', profile.id)

    if (error) {
      setSaveError('Something went wrong. Please try again.')
      setSaving(false)
      return
    }

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            first_name: draft.first_name.trim() || null,
            age_range: draft.age_range || null,
            university: draft.university.trim() || null,
            course: draft.course.trim() || null,
          }
        : prev
    )
    setSaving(false)
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <span className="auth-spinner" />
      </div>
    )
  }

  const initials = getInitials(profile?.first_name ?? null, profile?.email ?? null)
  const displayName = profile?.first_name?.trim() || 'Your profile'

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__greeting">Profile</h1>
          <p className="dashboard__sub">Your personal details and account info.</p>
        </div>
      </header>

      <div className="profile-layout">

        {/* ── Identity card ── */}
        <div className="profile-identity-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-identity-card__info">
            <p className="profile-identity-card__name">{displayName}</p>
            {profile?.email && (
              <p className="profile-identity-card__email">{profile.email}</p>
            )}
            {profile?.created_at && (
              <p className="profile-identity-card__since">
                Member since {formatDate(profile.created_at)}
              </p>
            )}
          </div>
          {!editing && (
            <button className="btn btn--outline btn--sm profile-edit-btn" onClick={openEdit}>
              Edit
            </button>
          )}
        </div>

        {/* ── Detail cards ── */}
        {!editing ? (
          <div className="profile-details">

            <div className="profile-detail-card">
              <p className="profile-detail-card__label">Name</p>
              <p className="profile-detail-card__value">
                {profile?.first_name?.trim() || <span className="profile-empty">Not set</span>}
              </p>
            </div>

            <div className="profile-detail-card">
              <p className="profile-detail-card__label">Age range</p>
              <p className="profile-detail-card__value">
                {profile?.age_range || <span className="profile-empty">Not set</span>}
              </p>
            </div>

            <div className="profile-detail-card">
              <p className="profile-detail-card__label">University</p>
              <p className="profile-detail-card__value">
                {profile?.university?.trim() || <span className="profile-empty">Not set</span>}
              </p>
            </div>

            <div className="profile-detail-card">
              <p className="profile-detail-card__label">Course</p>
              <p className="profile-detail-card__value">
                {profile?.course?.trim() || <span className="profile-empty">Not set</span>}
              </p>
            </div>

          </div>
        ) : (

          /* ── Edit form ── */
          <div className="profile-edit-form">
            <h2 className="profile-edit-form__title">Edit profile</h2>

            <div className="profile-form-grid">

              <div className="profile-field">
                <label className="profile-field__label" htmlFor="pf-name">First name</label>
                <input
                  id="pf-name"
                  className="profile-field__input"
                  type="text"
                  placeholder="e.g. Alex"
                  value={draft.first_name}
                  onChange={(e) => setDraft((d) => ({ ...d, first_name: e.target.value }))}
                />
              </div>

              <div className="profile-field">
                <label className="profile-field__label" htmlFor="pf-age">Age range</label>
                <select
                  id="pf-age"
                  className="profile-field__input profile-field__select"
                  value={draft.age_range}
                  onChange={(e) => setDraft((d) => ({ ...d, age_range: e.target.value }))}
                >
                  <option value="">Select age range</option>
                  {AGE_RANGES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-field__label" htmlFor="pf-uni">University</label>
                <input
                  id="pf-uni"
                  className="profile-field__input"
                  type="text"
                  placeholder="e.g. University of Edinburgh"
                  value={draft.university}
                  onChange={(e) => setDraft((d) => ({ ...d, university: e.target.value }))}
                />
              </div>

              <div className="profile-field">
                <label className="profile-field__label" htmlFor="pf-course">Course</label>
                <input
                  id="pf-course"
                  className="profile-field__input"
                  type="text"
                  placeholder="e.g. Economics"
                  value={draft.course}
                  onChange={(e) => setDraft((d) => ({ ...d, course: e.target.value }))}
                />
              </div>

            </div>

            {saveError && <p className="profile-form-error">{saveError}</p>}

            <div className="profile-form-actions">
              <button
                className="btn btn--primary"
                onClick={saveEdit}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button className="btn btn--outline" onClick={cancelEdit} disabled={saving}>
                Cancel
              </button>
            </div>
          </div>

        )}
      </div>
    </div>
  )
}
