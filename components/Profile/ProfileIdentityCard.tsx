'use client'

type Props = {
  initials:    string
  displayName: string
  email:       string | null | undefined
  createdAt:   string | null | undefined
  editing:     boolean
  onEdit:      () => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ProfileIdentityCard({ initials, displayName, email, createdAt, editing, onEdit }: Props) {
  return (
    <div className="profile-identity-card">
      <div className="profile-avatar">{initials}</div>
      <div className="profile-identity-card__info">
        <p className="profile-identity-card__name">{displayName}</p>
        {email    && <p className="profile-identity-card__email">{email}</p>}
        {createdAt && (
          <p className="profile-identity-card__since">Member since {formatDate(createdAt)}</p>
        )}
      </div>
      {!editing && (
        <button className="btn btn--outline btn--sm profile-edit-btn" onClick={onEdit}>
          Edit
        </button>
      )}
    </div>
  )
}
