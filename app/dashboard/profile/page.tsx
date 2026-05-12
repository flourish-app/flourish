'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'
import ProfileIdentityCard from '@/components/Profile/ProfileIdentityCard'
import ProfileDetails      from '@/components/Profile/ProfileDetails'
import ProfileEditForm     from '@/components/Profile/ProfileEditForm'

type Draft = { first_name: string; age_range: string; university: string; course: string }

function getInitials(name: string | null, email: string | null): string {
  if (name?.trim()) return name.trim()[0].toUpperCase()
  if (email)        return email[0].toUpperCase()
  return '?'
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile,   setProfile]   = useState<Profile | null>(null)
  const [loading,   setLoading]   = useState(true)
  const [editing,   setEditing]   = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [draft,     setDraft]     = useState<Draft>({ first_name: '', age_range: '', university: '', course: '' })

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    const init = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { await supabase.auth.signOut(); router.replace('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
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
      age_range:  profile.age_range  ?? '',
      university: profile.university ?? '',
      course:     profile.course     ?? '',
    })
    setSaveError(null)
    setEditing(true)
  }

  function cancelEdit() { setEditing(false); setSaveError(null) }

  async function saveEdit() {
    if (!profile) return
    setSaving(true)
    setSaveError(null)
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: draft.first_name.trim() || null,
        age_range:  draft.age_range  || null,
        university: draft.university.trim() || null,
        course:     draft.course.trim()     || null,
      })
      .eq('id', profile.id)
    if (error) { setSaveError('Something went wrong. Please try again.'); setSaving(false); return }
    setProfile(prev => prev ? {
      ...prev,
      first_name: draft.first_name.trim() || null,
      age_range:  draft.age_range  || null,
      university: draft.university.trim() || null,
      course:     draft.course.trim()     || null,
    } : prev)
    setSaving(false)
    setEditing(false)
  }

  if (loading) return <div className="dashboard-loading"><span className="auth-spinner" /></div>

  const initials    = getInitials(profile?.first_name ?? null, profile?.email ?? null)
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
        <ProfileIdentityCard
          initials={initials}
          displayName={displayName}
          email={profile?.email}
          createdAt={profile?.created_at}
          editing={editing}
          onEdit={openEdit}
        />
        {!editing
          ? <ProfileDetails profile={profile} />
          : <ProfileEditForm
              draft={draft}
              onDraft={setDraft}
              saveError={saveError}
              saving={saving}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
        }
      </div>
    </div>
  )
}
