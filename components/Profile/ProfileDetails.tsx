import type { Profile } from '@/lib/supabase'

export default function ProfileDetails({ profile }: { profile: Profile | null }) {
  return (
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
  )
}
