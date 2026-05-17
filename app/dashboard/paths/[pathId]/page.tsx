import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPathById, totalLessonsInPath } from '@/config/learningPaths'
import type { Course } from '@/config/learningPaths'

interface Props {
  params: Promise<{ pathId: string }>
}

function CourseBlock({ course, index, pathId }: { course: Course; index: number; pathId: string }) {
  return (
    <div className="path-course-block">
      <div className="path-course-block__header">
        <span className="path-course-block__index">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="path-course-block__head-text">
          <h2 className="path-course-block__title">{course.title}</h2>
          <p className="path-course-block__meta">
            {course.lessons.length} {course.lessons.length === 1 ? 'lesson' : 'lessons'}
          </p>
        </div>
      </div>

      <ol className="path-course-block__lessons">
        {course.lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link
              href={`/dashboard/paths/${pathId}/${course.id}/${lesson.id}`}
              className="path-lesson-row"
            >
              <span className="path-lesson-row__num">{i + 1}</span>
              <span className="path-lesson-row__content">
                <span className="path-lesson-row__title">{lesson.title}</span>
                <span className="path-lesson-row__desc">{lesson.description}</span>
              </span>
              <span className="path-lesson-row__meta">
                <span className="path-lesson-row__time">{lesson.estimatedMinutes} min</span>
                <span className="path-lesson-row__xp">+{lesson.xpReward} XP</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default async function PathOverviewPage({ params }: Props) {
  const { pathId } = await params
  const path = getPathById(pathId)

  if (!path) notFound()

  const totalLessons = totalLessonsInPath(path)
  const totalMinutes = path.courses.reduce(
    (sum, c) => sum + c.lessons.reduce((s, l) => s + l.estimatedMinutes, 0),
    0,
  )

  return (
    <div className="dashboard">
      {/* ── Back nav ── */}
      <Link href="/dashboard" className="path-overview__back">
        ← Back to dashboard
      </Link>

      {/* ── Hero header ── */}
      <header className="path-overview__header">
        <div className="path-overview__meta-row">
          <span className="path-overview__category">{path.category}</span>
          <span className="path-overview__stats">
            {path.courses.length} courses&nbsp;&bull;&nbsp;{totalLessons} lessons&nbsp;&bull;&nbsp;~{totalMinutes} min
          </span>
        </div>
        <h1 className="path-overview__title">{path.title}</h1>
        <p className="path-overview__desc">{path.description}</p>

        <div className="path-overview__tags">
          {path.tags.map(tag => (
            <span key={tag} className="path-overview__tag">{tag}</span>
          ))}
        </div>
      </header>

      {/* ── Course list ── */}
      <div className="path-overview__courses">
        {path.courses.map((course, i) => (
          <CourseBlock key={course.id} course={course} index={i} pathId={pathId} />
        ))}
      </div>
    </div>
  )
}
