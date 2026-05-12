type Props = {
  emoji:    string
  tag:      string
  title:    string
  body:     string
  lessons:  number
  duration: string
}

export default function ComingSoonCard({ emoji, tag, title, body, lessons, duration }: Props) {
  return (
    <div className="course-card course-card--soon">
      <div className="course-card__top">
        <div className="course-card__emoji">{emoji}</div>
        <div className="course-card__tags">
          <span className="course-tag">{tag}</span>
          <span className="course-card__soon-badge">Coming soon</span>
        </div>
      </div>
      <div className="course-card__title">{title}</div>
      <p className="course-card__body">{body}</p>
      <div className="course-card__footer">
        <div className="course-card__meta">
          <span>📚 {lessons} lessons</span>
          <span>⏱ {duration}</span>
        </div>
      </div>
    </div>
  )
}
