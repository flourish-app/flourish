import Link from 'next/link'

type Props = {
  emoji:    string
  tag:      string
  tagStyle: string
  title:    string
  body:     string
  lessons:  number
  duration: string
  badge:    string | null
  href:     string
}

export default function CourseCard({ emoji, tag, tagStyle, title, body, lessons, duration, badge, href }: Props) {
  return (
    <Link href={href} className="course-card">
      <div className="course-card__top">
        <div className="course-card__emoji">{emoji}</div>
        <div className="course-card__tags">
          <span className={`course-tag${tagStyle === 'featured' ? ' course-tag--featured' : ''}`}>
            {tag}
          </span>
          {badge && <span className="course-card__badge">{badge}</span>}
        </div>
      </div>
      <div className="course-card__title">{title}</div>
      <p className="course-card__body">{body}</p>
      <div className="course-card__footer">
        <div className="course-card__meta">
          <span>📚 {lessons} lessons</span>
          <span>⏱ {duration}</span>
        </div>
        <span className="course-card__arrow">→</span>
      </div>
    </Link>
  )
}
