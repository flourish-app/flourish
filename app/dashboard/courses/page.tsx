import type { Metadata } from 'next'
import { availableCourses, comingSoonCourses, courses, totalLessons } from '@/lib/curriculum'
import CourseCard     from '@/components/DashboardCourses/CourseCard'
import ComingSoonCard from '@/components/DashboardCourses/ComingSoonCard'

export const metadata: Metadata = { title: 'Courses — Flourish' }

export default function DashboardCoursesPage() {
  return (
    <div className="all-courses-page">
      <div className="all-courses-hero">
        <div className="container">
          <div className="all-courses-hero__inner">
            <div>
              <div className="section-tag">All courses</div>
              <h1 className="all-courses-hero__headline">Everything they didn&apos;t teach you</h1>
              <p className="all-courses-hero__sub">
                Six courses covering everything a UK student needs to know about money — from opening your first ISA to understanding global markets. Free, always.
              </p>
            </div>
            <div className="all-courses-hero__stats">
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">{courses.length}</div>
                <div className="all-courses-stat__label">Courses</div>
              </div>
              <div className="all-courses-stat__divider" />
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">{totalLessons}</div>
                <div className="all-courses-stat__label">Lessons</div>
              </div>
              <div className="all-courses-stat__divider" />
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">£0</div>
                <div className="all-courses-stat__label">Cost</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="all-courses-body">
          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Available now</h2>
              <span className="all-courses-section__count">{availableCourses.length} courses</span>
            </div>
            <div className="all-courses-grid">
              {availableCourses.map(c => (
                <CourseCard
                  key={c.slug}
                  emoji={c.emoji}
                  tag={c.tag}
                  tagStyle={c.tagStyle ?? 'default'}
                  title={c.title}
                  body={c.body}
                  lessons={c.lessons}
                  duration={c.duration}
                  badge={c.badge ?? null}
                  href={`/dashboard/courses/${c.slug}`}
                />
              ))}
            </div>
          </section>

          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Coming soon</h2>
              <span className="all-courses-section__count">{comingSoonCourses.length} courses</span>
            </div>
            <div className="all-courses-grid">
              {comingSoonCourses.map(c => (
                <ComingSoonCard
                  key={c.title}
                  emoji={c.emoji}
                  tag={c.tag}
                  title={c.title}
                  body={c.body}
                  lessons={c.lessons}
                  duration={c.duration}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
