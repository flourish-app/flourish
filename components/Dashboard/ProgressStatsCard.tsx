type Props = {
  totalLessonsDone: number
  streak: number
  totalXp: number
  level: number
  levelTitle: string
  nextLevelXp: number | null
  progressPct: number
}

export default function ProgressStatsCard({
  totalLessonsDone, streak, totalXp, level, levelTitle, nextLevelXp, progressPct,
}: Props) {
  return (
    <section className="dashboard-card">
      <p className="dashboard-card__eyebrow">Your progress</p>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <span className="dashboard-stat__value">{totalLessonsDone}</span>
          <span className="dashboard-stat__label">Lessons done</span>
        </div>
        <div className="dashboard-stat">
          <span className="dashboard-stat__value">{streak}</span>
          <span className="dashboard-stat__label">Day streak</span>
        </div>
        <div className="dashboard-stat">
          <span className="dashboard-stat__value">{totalXp}</span>
          <span className="dashboard-stat__label">XP earned</span>
        </div>
      </div>
      <div className="xp-bar-wrap">
        <div className="xp-bar-wrap__labels">
          <span>Level {level} · {levelTitle}</span>
          {nextLevelXp !== null && (
            <span>{totalXp} / {nextLevelXp} XP</span>
          )}
        </div>
        <div className="xp-bar">
          <div className="xp-bar__fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
    </section>
  )
}
