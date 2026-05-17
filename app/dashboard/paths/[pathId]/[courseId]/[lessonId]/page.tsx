import { notFound } from 'next/navigation'
import Link from 'next/link'
import { flourishPaths } from '@/config/learningPaths'
import type { Lesson, Course, LearningPath } from '@/config/learningPaths'
import LessonCompleteButton from './LessonCompleteButton'

interface Props {
  params: Promise<{ pathId: string; courseId: string; lessonId: string }>
}

function findLesson(pathId: string, courseId: string, lessonId: string): {
  path: LearningPath
  course: Course
  lesson: Lesson
  lessonIndex: number
  nextHref: string
} | null {
  const path = flourishPaths.find(p => p.id === pathId)
  if (!path) return null
  const courseIndex = path.courses.findIndex(c => c.id === courseId)
  if (courseIndex === -1) return null
  const course = path.courses[courseIndex]
  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId)
  if (lessonIndex === -1) return null

  let nextHref: string
  const nextLesson = course.lessons[lessonIndex + 1]
  if (nextLesson) {
    nextHref = `/dashboard/paths/${pathId}/${courseId}/${nextLesson.id}`
  } else {
    const nextCourse = path.courses[courseIndex + 1]
    if (nextCourse) {
      nextHref = `/dashboard/paths/${pathId}/${nextCourse.id}/${nextCourse.lessons[0].id}`
    } else {
      nextHref = `/dashboard/paths/${pathId}`
    }
  }

  return { path, course, lesson: course.lessons[lessonIndex], lessonIndex, nextHref }
}

export default async function LessonReaderPage({ params }: Props) {
  const { pathId, courseId, lessonId } = await params
  const result = findLesson(pathId, courseId, lessonId)
  if (!result) notFound()

  const { path, course, lesson, lessonIndex } = result

  return (
    <div className="lesson-reader">
      <Link href={`/dashboard/paths/${pathId}`} className="lesson-reader__back">
        ← {path.title}
      </Link>

      <article className="lesson-reader__article">
        <div className="lesson-reader__eyebrow">
          <span className="lesson-reader__course-name">{course.title}</span>
          <span className="lesson-reader__lesson-num">
            Lesson {lessonIndex + 1} of {course.lessons.length}
          </span>
        </div>

        <h1 className="lesson-reader__title">{lesson.title}</h1>

        <div className="lesson-reader__meta">
          <span className="lesson-reader__meta-item">{lesson.estimatedMinutes} min read</span>
          <span className="lesson-reader__meta-sep">&middot;</span>
          <span className="lesson-reader__meta-item lesson-reader__meta-item--xp">
            +{lesson.xpReward} XP
          </span>
        </div>

        <div className="lesson-reader__body">
          <p>{lesson.description}</p>

          <h2>Why this matters</h2>
          <p>
            Understanding this concept is a foundational step in building long-term financial
            confidence. Most people skip over the basics — and then wonder why their money
            never seems to work for them. This lesson changes that.
          </p>

          <h2>The core idea</h2>
          <p>
            Every strong financial decision starts with clarity. Before you invest a single
            pound, you need to understand what you own, why you own it, and what conditions
            would make you sell. That framework — applied consistently — is what separates
            investors from gamblers.
          </p>
          <p>
            The UK market offers several tax-efficient wrappers (ISAs, LISAs, SIPPs) designed
            to help individuals grow wealth without unnecessarily sacrificing returns to HMRC.
            Knowing which wrapper fits your goal is as important as knowing what to buy inside it.
          </p>

          <h2>Putting it into practice</h2>
          <p>
            Start small. A Stocks &amp; Shares ISA funded with as little as £25/month, invested
            in a diversified global index fund, grows meaningfully over 10–30 years thanks to
            compounding. The habit of investing regularly matters far more than the amount.
          </p>
          <p>
            Use the Flourish simulator to test trades risk-free before committing real money.
            Every lesson you complete unlocks new tools and deeper portfolio insights.
          </p>
        </div>

        <LessonCompleteButton xp={lesson.xpReward} nextHref={result.nextHref} />
      </article>
    </div>
  )
}
