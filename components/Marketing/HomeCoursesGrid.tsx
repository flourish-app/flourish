import Link from 'next/link'
import { courses } from '@/lib/curriculum'

export default function HomeCoursesGrid() {
  return (
    <section className="paths" id="learn">
      <div className="container">
        <div className="section-tag fade-up">Courses</div>
        <h2 className="section-headline fade-up">Everything they didn&apos;t teach you</h2>
        <p className="section-sub fade-up">
          Structured modules built around what UK students actually need to know - from opening your first ISA to understanding global markets.
        </p>
        <div className="paths__grid">
          {courses.map((c) => {
            const href     = c.status === 'available' ? `/courses/${c.slug}` : '/courses'
            const featured = c.tagStyle === 'featured'
            const tagLabel = c.badge ?? c.tag
            return (
              <Link
                key={c.title}
                href={href}
                className={`path-card fade-up${featured ? ' path-card--featured' : ''}`}
              >
                <div
                  className="path-card__tag"
                  style={featured ? { background: 'rgba(76,175,130,0.2)', color: '#4caf82' } : undefined}
                >
                  {tagLabel}
                </div>
                <div className="path-card__emoji">{c.emoji}</div>
                <div className="path-card__title">{c.title}</div>
                <p className="path-card__body">{c.body}</p>
                <div className="path-card__meta">
                  <span>📚 {c.lessons} lessons</span>
                  <span>⏱ {c.duration}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
