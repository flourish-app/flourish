import type { Metadata } from 'next'
import Link from 'next/link'
import { availableCourses, comingSoonCourses, courses, totalLessons } from '@/lib/curriculum'

export const metadata: Metadata = {
  title: 'All Courses - Flourish',
  description: 'Free investing courses for UK students. From complete beginner to confident investor — learn ISAs, ETFs, pensions and more.',
}

export default function AllCoursesPage() {
  return (
    <div className="all-courses-page">

      {/* ── Hero ── */}
      <div className="all-courses-hero">
        <div className="container">
          <div className="all-courses-hero__inner">
            <div>
              <div className="section-tag">All courses</div>
              <h1 className="all-courses-hero__headline">
                Everything they didn&apos;t teach you
              </h1>
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

          {/* ── Available now ── */}
          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Available now</h2>
              <span className="all-courses-section__count">{availableCourses.length} courses</span>
            </div>
            <div className="all-courses-grid">
              {availableCourses.map((course) => (
                <Link href={`/courses/${course.slug}`} key={course.slug} className="course-card">
                  <div className="course-card__top">
                    <div className="course-card__emoji">{course.emoji}</div>
                    <div className="course-card__tags">
                      <span className={`course-tag${course.tagStyle === 'featured' ? ' course-tag--featured' : ''}`}>
                        {course.tag}
                      </span>
                      {course.badge && (
                        <span className="course-card__badge">{course.badge}</span>
                      )}
                    </div>
                  </div>
                  <div className="course-card__title">{course.title}</div>
                  <p className="course-card__body">{course.body}</p>
                  <div className="course-card__footer">
                    <div className="course-card__meta">
                      <span>📚 {course.lessons} lessons</span>
                      <span>⏱ {course.duration}</span>
                    </div>
                    <span className="course-card__arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Coming soon ── */}
          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Coming soon</h2>
              <span className="all-courses-section__count">{comingSoonCourses.length} courses</span>
            </div>
            <div className="all-courses-grid">
              {comingSoonCourses.map((course) => (
                <div key={course.title} className="course-card course-card--soon">
                  <div className="course-card__top">
                    <div className="course-card__emoji">{course.emoji}</div>
                    <div className="course-card__tags">
                      <span className="course-tag">{course.tag}</span>
                      <span className="course-card__soon-badge">Coming soon</span>
                    </div>
                  </div>
                  <div className="course-card__title">{course.title}</div>
                  <p className="course-card__body">{course.body}</p>
                  <div className="course-card__footer">
                    <div className="course-card__meta">
                      <span>📚 {course.lessons} lessons</span>
                      <span>⏱ {course.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="all-courses-cta">
            <div className="all-courses-cta__inner">
              <div>
                <h3 className="all-courses-cta__headline">Ready to start learning?</h3>
                <p className="all-courses-cta__sub">
                  Create a free account and unlock every course instantly. No card, no catch.
                </p>
              </div>
              <div className="all-courses-cta__actions">
                <Link href="/start-learning" className="btn btn--white btn--lg">
                  Start learning free
                </Link>
                <Link href="/login" className="btn btn--ghost-white btn--lg">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
