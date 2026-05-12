'use client'

import Link from 'next/link'

type Props = {
  emoji:          string
  completedCount: number
  total:          number
  loaded:         boolean
  allDone:        boolean
  ctaHref:        string
  ctaLabel:       string
  retaking:       boolean
  onRetake:       () => void
}

export default function CourseProgressCard({
  emoji, completedCount, total, loaded, allDone, ctaHref, ctaLabel, retaking, onRetake,
}: Props) {
  const fillPct = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="course-signup-card">
      <div className="course-signup-card__emoji">{emoji}</div>
      <div className="course-signup-card__progress">
        <div className="course-signup-card__progress-label">
          <span>Your progress</span>
          <span>{loaded ? `${completedCount} / ${total} lessons` : `— / ${total} lessons`}</span>
        </div>
        <div className="course-signup-card__progress-bar">
          <div
            className="course-signup-card__progress-fill"
            style={{ width: loaded ? `${fillPct}%` : '0%' }}
          />
        </div>
      </div>

      {allDone ? (
        <button
          className="btn btn--outline btn--lg course-signup-card__cta"
          onClick={onRetake}
          disabled={retaking}
        >
          {retaking ? 'Resetting...' : 'Retake course'}
        </button>
      ) : (
        <Link href={ctaHref} className="btn btn--primary btn--lg course-signup-card__cta">
          {ctaLabel}
        </Link>
      )}

      <ul className="course-signup-card__perks">
        <li>✓ All lessons unlocked</li>
        <li>✓ Learn at your own pace</li>
        <li>✓ Progress saved automatically</li>
      </ul>
    </div>
  )
}
