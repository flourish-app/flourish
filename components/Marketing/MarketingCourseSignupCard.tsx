import Link from 'next/link'

interface Props {
  emoji: string
  total: number
}

export default function MarketingCourseSignupCard({ emoji, total }: Props) {
  return (
    <div className="course-signup-card">
      <div className="course-signup-card__emoji">{emoji}</div>
      <div className="course-signup-card__progress">
        <div className="course-signup-card__progress-label">
          <span>Your progress</span>
          <span>0 / {total} lessons</span>
        </div>
        <div className="course-signup-card__progress-bar">
          <div className="course-signup-card__progress-fill" />
        </div>
      </div>
      <Link href="/start-learning" className="btn btn--primary btn--lg course-signup-card__cta">
        Start this course free
      </Link>
      <Link href="/login" className="course-signup-card__login">
        Already have an account? Sign in
      </Link>
      <ul className="course-signup-card__perks">
        <li>✓ Free — no card required</li>
        <li>✓ Learn at your own pace</li>
        <li>✓ Progress saved automatically</li>
      </ul>
    </div>
  )
}
