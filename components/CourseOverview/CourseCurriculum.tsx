import Link from 'next/link'
import type { CourseLessonItem } from './types'

type Props = {
  lessons:        CourseLessonItem[]
  totalLabel:     string
  courseSlug?:    string
  completedSlugs?: Set<string>
}

export default function CourseCurriculum({ lessons, totalLabel, courseSlug, completedSlugs }: Props) {
  return (
    <div className="course-section">
      <h2 className="course-section__title">Course curriculum</h2>
      <p className="course-section__sub">{totalLabel}</p>
      <div className="course-curriculum">
        {lessons.map((lesson) => {
          const done = courseSlug && lesson.slug ? completedSlugs?.has(lesson.slug) : false
          const cls  = `course-lesson course-lesson--free${done ? ' course-lesson--completed' : ''}`

          const inner = (
            <>
              <div className="course-lesson__num">
                {done ? <span className="course-lesson__check">✓</span> : lesson.num}
              </div>
              <div className="course-lesson__info">
                <div className="course-lesson__title">{lesson.title}</div>
                <div className="course-lesson__duration">{lesson.duration} read</div>
              </div>
              <div className="course-lesson__status">
                <span className="course-lesson__preview">
                  {done ? 'Review' : 'Start →'}
                </span>
              </div>
            </>
          )

          return courseSlug && lesson.slug ? (
            <Link
              key={lesson.num}
              href={`/dashboard/courses/${courseSlug}/${lesson.slug}`}
              className={cls}
            >
              {inner}
            </Link>
          ) : (
            <div key={lesson.num} className={cls}>{inner}</div>
          )
        })}
      </div>
    </div>
  )
}
