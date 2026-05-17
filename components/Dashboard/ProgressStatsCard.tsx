import { ArrowUpRight, BookOpen, Flame, Star, TrendingUp } from 'lucide-react'

type WeekDay = { done: boolean; future: boolean }

type Props = {
  totalLessonsDone: number
  streak: number
  totalXp: number
  weeklyXp: number
  level: number
  levelTitle: string
  nextLevelXp: number | null
  progressPct: number
  weekDays: WeekDay[]
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function ProgressStatsCard({
  totalLessonsDone, streak, totalXp, weeklyXp,
  level, levelTitle, nextLevelXp, progressPct,
  weekDays,
}: Props) {
  return (
    <section className="dashboard-card psc">
      <div className="psc__header">
        <div className="psc__title-row">
          <span className="psc__title-icon" aria-hidden="true">
            <TrendingUp size={19} strokeWidth={2.6} />
          </span>
          <h2 className="psc__title">Your progress</h2>
        </div>
        <div className="psc__week-pill" aria-label={`${weeklyXp} XP earned this week`}>
          <ArrowUpRight size={12} strokeWidth={2.7} />
          <span>+{weeklyXp} XP this week</span>
        </div>
      </div>

      {/* Stats */}
      <div className="psc__stats">
        <div className="psc__stat">
          <span className="psc__stat-icon" aria-hidden="true">
            <BookOpen size={18} strokeWidth={2.1} />
          </span>
          <span className="psc__stat-value">{totalLessonsDone}</span>
          <span className="psc__stat-label">Lessons<br />done</span>
        </div>
        <div className="psc__stat">
          <span className="psc__stat-icon" aria-hidden="true">
            <Flame size={18} strokeWidth={2.1} />
          </span>
          <span className="psc__stat-value">{streak}</span>
          <span className="psc__stat-label">Day<br />streak</span>
        </div>
        <div className="psc__stat">
          <span className="psc__stat-icon" aria-hidden="true">
            <Star size={18} strokeWidth={2.1} />
          </span>
          <span className="psc__stat-value">{totalXp}</span>
          <span className="psc__stat-label">XP<br />earned</span>
        </div>
      </div>

      {/* Level + bar */}
      <div className="psc__divider" />
      <div className="psc__level">
        <div className="psc__level-row">
          <div className="psc__level-badge" aria-label={`Level ${level}`}>
            <span>Lv. {level}</span>
          </div>
          <div className="psc__level-copy">
            <span className="psc__level-name">{levelTitle}</span>
            <span className="psc__level-sub">Level {level}</span>
          </div>
          <div className="psc__level-xp">
            {nextLevelXp !== null ? (
              <>
                <span>{totalXp} / {nextLevelXp} XP</span>
                <strong>{progressPct}% to Level {level + 1}</strong>
              </>
            ) : (
              <>
                <span>{totalXp} XP</span>
                <strong>Top level</strong>
              </>
            )}
          </div>
        </div>
        <div className="psc__bar">
          <div className="psc__bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
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
