import Link from 'next/link'

type Lesson = {
  num: number
  slug: string
  title: string
  duration: string
  intro: string
}

type Props = {
  nextLesson: Lesson
  completedCount: number
  totalLessons: number
  pct: number
  allDone: boolean
  ctaHref: string
  courseSlug: string
}

export default function ContinueLearningCard({
  nextLesson, completedCount, totalLessons, pct, allDone, ctaHref, courseSlug,
}: Props) {
  return (
    <section className="dashboard-card dashboard-card--featured cl-card">
      <div className="cl-card__header">
        <div className="cl-card__thumb">📈</div>
        <div className="cl-card__head-text">
          <h2 className="cl-card__course-name">Investing from Scratch</h2>
          <p className="cl-card__lesson-line">
            {allDone
              ? `All ${totalLessons} lessons complete`
              : completedCount > 0
                ? `Lesson ${nextLesson.num} of ${totalLessons} · ${nextLesson.title}`
                : `${totalLessons} lessons · start when you're ready`}
          </p>
        </div>
      </div>

      {!allDone && (
        <div className="cl-card__chips">
          <span className="cl-card__chip">⏱ {nextLesson.duration} read</span>
          <span className="cl-card__chip-dot" />
          <span className="cl-card__chip cl-card__chip--xp">⭐ +20 XP</span>
          <span className="cl-card__chip-dot" />
          <span className="cl-card__chip cl-card__chip--level">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"/>
              <rect x="4.5" y="4" width="3" height="8" rx="1" fill="currentColor"/>
              <rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor"/>
            </svg>
            Beginner
          </span>
        </div>
      )}

      {!allDone && <p className="cl-card__desc">{nextLesson.intro}</p>}
      {allDone && (
        <p className="cl-card__desc">You&apos;ve finished every lesson. Well done — keep your streak going with another course.</p>
      )}

      <div className="cl-card__progress-row">
        <span className="cl-card__progress-count">
          <strong>{completedCount} of {totalLessons}</strong> lessons completed
        </span>
        <span className="cl-card__progress-pct">{pct}% complete</span>
      </div>
      <div className="dashboard-progress" style={{ marginTop: '8px' }}>
        <div className="dashboard-progress__bar" style={{ width: `${pct}%` }} />
      </div>

      {!allDone && (
        <div className="cl-card__reward">
          <div className="cl-card__reward-badge">XP</div>
          <div className="cl-card__reward-text">
            <strong>Next reward</strong>
            <span>Complete this lesson to earn <span className="cl-card__reward-xp">+20 XP</span></span>
          </div>
          <span className="cl-card__reward-arrow">›</span>
        </div>
      )}

      {allDone ? (
        <Link href={`/dashboard/courses/${courseSlug}`} className="cl-card__cta">
          <span className="cl-card__cta-play">🏆</span>
          View completed course
          <span className="cl-card__cta-arrow">›</span>
        </Link>
      ) : (
        <Link href={ctaHref} className="cl-card__cta">
          <span className="cl-card__cta-play">▶</span>
          {completedCount > 0 ? 'Continue learning' : 'Start learning'}
          <span className="cl-card__cta-arrow">›</span>
        </Link>
      )}

      <div className="cl-card__footer">
        <div className="cl-card__footer-chip">
          <span className="cl-card__footer-icon cl-card__footer-icon--trophy">🏆</span>
          <div>
            <strong>Finish this course to unlock</strong>
            <span>Investor badge 🛡️</span>
          </div>
        </div>
        <div className="cl-card__footer-chip">
          <span className="cl-card__footer-icon cl-card__footer-icon--xp">XP</span>
          <div>
            <strong>+100 XP</strong>
            <span>Course completion bonus</span>
          </div>
        </div>
        <div className="cl-card__footer-chip">
          <span className="cl-card__footer-icon cl-card__footer-icon--arrow">↗</span>
          <div>
            <strong>You&apos;re ahead of</strong>
            <span>72% of learners</span>
          </div>
        </div>
      </div>
    </section>
  )
}
