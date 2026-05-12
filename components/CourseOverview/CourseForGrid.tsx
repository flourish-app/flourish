import type { ForCard } from './types'

export default function CourseForGrid({ cards }: { cards: ForCard[] }) {
  return (
    <div className="course-section">
      <h2 className="course-section__title">Who this is for</h2>
      <div className="course-for-grid">
        {cards.map(c => (
          <div className="course-for-card" key={c.title}>
            <div className="course-for-card__icon">{c.icon}</div>
            <div className="course-for-card__title">{c.title}</div>
            <p className="course-for-card__body">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
