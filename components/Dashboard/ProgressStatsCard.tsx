type WeekDay = { done: boolean; future: boolean }

type Props = {
  totalLessonsDone: number
  streak: number
  totalXp: number
  level: number
  levelTitle: string
  nextLevelXp: number | null
  progressPct: number
  weekDays: WeekDay[]
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function ProgressStatsCard({
  totalLessonsDone, streak, totalXp,
  level, levelTitle, nextLevelXp, progressPct,
  weekDays,
}: Props) {
  return (
    <section className="dashboard-card psc">
      <p className="dashboard-card__eyebrow">Your progress</p>

      {/* Stats */}
      <div className="psc__stats">
        <div className="psc__stat">
          <span className="psc__stat-value">{totalLessonsDone}</span>
          <span className="psc__stat-label">Lessons<br />done</span>
        </div>
        <div className="psc__stat">
          <span className="psc__stat-value">{streak}</span>
          <span className="psc__stat-label">Day<br />streak</span>
        </div>
        <div className="psc__stat">
          <span className="psc__stat-value">{totalXp}</span>
          <span className="psc__stat-label">XP<br />earned</span>
        </div>
      </div>

      {/* Level + bar */}
      <div className="psc__divider" />
      <div className="psc__level-row">
        <span className="psc__level-name">Level {level} · {levelTitle}</span>
        {nextLevelXp !== null && (
          <span className="psc__level-xp">{totalXp} / {nextLevelXp} XP</span>
        )}
      </div>
      <div className="psc__bar">
        <div className="psc__bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Streak section */}
      <div className="psc__streak">
        <div className="psc__streak-head">
          <span className="psc__streak-icon">🔥</span>
          <span className="psc__streak-title">{streak} day streak</span>
        </div>
        <p className="psc__streak-sub">
          {streak > 0 ? 'Keep it going! Learn something today.' : 'Complete a lesson today to start your streak.'}
        </p>
        <div className="psc__dots">
          {weekDays.map((d, i) => (
            <div key={i} className="psc__dot-col">
              <span className="psc__dot-label">{DAY_LABELS[i]}</span>
              <span className={`psc__dot ${d.done ? 'psc__dot--done' : d.future ? 'psc__dot--future' : 'psc__dot--empty'}`}>
                {d.done && (
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1.5,5 4,7.5 8.5,2.5" />
                  </svg>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
