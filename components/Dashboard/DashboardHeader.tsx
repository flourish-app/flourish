type Props = {
  firstName: string
  level: number
  levelTitle: string
}

export default function DashboardHeader({ firstName, level, levelTitle }: Props) {
  return (
    <header className="dashboard__header">
      <div>
        <h1 className="dashboard__greeting">Hey, {firstName} 👋</h1>
        <p className="dashboard__sub">Welcome back to Flourish. Keep up the great work 🌱.</p>
      </div>
      <div className="dashboard__level-badge">
        <span className="level-badge">Lv.{level}</span>
        <span className="level-badge__title">{levelTitle}</span>
      </div>
    </header>
  )
}
