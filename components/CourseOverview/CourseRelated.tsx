import Link from 'next/link'
import type { RelatedCourse } from './types'

export default function CourseRelated({ title = 'Related courses', courses }: { title?: string; courses: RelatedCourse[] }) {
  return (
    <div className="course-section">
      <h2 className="course-section__title">{title}</h2>
      <div className="course-related">
        {courses.map(c => (
          <Link key={c.href} href={c.href} className="course-related-card">
            <div className="course-related-card__emoji">{c.emoji}</div>
            <div>
              <div className="course-related-card__tag">{c.tag}</div>
              <div className="course-related-card__title">{c.title}</div>
              <p className="course-related-card__body">{c.body}</p>
            </div>
            <div className="course-related-card__arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
