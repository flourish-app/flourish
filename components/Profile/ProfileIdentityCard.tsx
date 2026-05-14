'use client'

import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  initials:    string
  displayName: string
  email:       string | null | undefined
  createdAt:   string | null | undefined
  avatarUrl:   string | null | undefined
  userId:      string
  editing:     boolean
  onEdit:      () => void
  onAvatarChange: (url: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ProfileIdentityCard({
  initials, displayName, email, createdAt, avatarUrl, userId, editing, onEdit, onAvatarChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)

    try {
      const ext  = file.name.split('.').pop() ?? 'jpg'
      const path = `${userId}/avatar.${ext}`

      const { error: upErr } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true, contentType: file.type })

      if (upErr) { setUploadError('Upload failed. Please try again.'); return }

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)

      // Bust cache with timestamp
      const url = `${publicUrl}?t=${Date.now()}`

      await supabase.from('profiles').update({ avatar_url: url }).eq('id', userId)
      onAvatarChange(url)
    } finally {
      setUploading(false)
      // Reset so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="profile-identity-card">
      <div className="profile-avatar-wrap">
        <div className="profile-avatar">
          {avatarUrl
            ? <img src={avatarUrl} alt={displayName} className="profile-avatar__img" />
            : initials}
        </div>
        <button
          className="profile-avatar__camera"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          aria-label="Upload profile picture"
          title="Upload profile picture"
        >
          {uploading ? <span className="auth-spinner auth-spinner--sm" /> : '📷'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="profile-avatar__input"
          onChange={handleFile}
        />
      </div>

      <div className="profile-identity-card__info">
        <p className="profile-identity-card__name">{displayName}</p>
        {email    && <p className="profile-identity-card__email">{email}</p>}
        {createdAt && (
          <p className="profile-identity-card__since">Member since {formatDate(createdAt)}</p>
        )}
        {uploadError && <p className="profile-avatar__error">{uploadError}</p>}
      </div>

      {!editing && (
        <button className="btn btn--outline btn--sm profile-edit-btn" onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
  )
}
