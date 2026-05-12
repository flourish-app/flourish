import Link from 'next/link'
import type { LessonDot } from './types'

type Props = {
  courseHref:     string
  courseName:     string
  lessonNum:      number
  total:          number
  lessons:        LessonDot[]
  completedSlugs: Set<string>
}

export default function LessonTopbar({ courseHref, courseName, lessonNum, total, lessons, completedSlugs }: Props) {
  return (
    <div className="lesson-topbar">
      <div className="container">
        <div className="lesson-topbar__inner">
          <Link href={courseHref} className="lesson-topbar__back">
            ← {courseName}
          </Link>
          <div className="lesson-topbar__breadcrumb">Lesson {lessonNum} of {total}</div>
          <div className="lesson-topbar__dots">
            {lessons.map((l) => {
              const done   = completedSlugs.has(l.slug)
              const active = l.num === lessonNum
              let cls = 'lesson-dot'
              if (active)    cls += ' lesson-dot--active'
              else if (done) cls += ' lesson-dot--done'
              return (
                <Link key={l.num} href={`${courseHref}/${l.slug}`} className={cls} title={l.title} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
