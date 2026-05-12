'use client'

import Link from 'next/link'
import type { AdjacentLesson } from './types'

type Props = {
  keyTakeaways:   string[]
  isCompleted:    boolean
  completing:     boolean
  hasNext:        boolean
  onMarkComplete: () => void
  prev:           AdjacentLesson
  next:           AdjacentLesson
  courseHref:     string
}

export default function LessonFooter({
  keyTakeaways, isCompleted, completing, hasNext, onMarkComplete, prev, next, courseHref,
}: Props) {
  return (
    <>
      <div className="lesson-takeaways">
        <div className="lesson-takeaways__heading">Key takeaways</div>
        <ul className="lesson-takeaways__list">
          {keyTakeaways.map((point, i) => (
            <li key={i}>
              <span className="lesson-takeaways__tick">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lesson-complete-cta">
        {isCompleted ? (
          <div className="lesson-complete-cta__done">
            ✓ You&apos;ve completed this lesson
          </div>
        ) : (
          <button
            className="lesson-complete-cta__btn btn btn--primary btn--lg"
            onClick={onMarkComplete}
            disabled={completing}
          >
            {completing ? 'Saving...' : hasNext ? 'Mark as complete & next lesson →' : 'Complete course →'}
          </button>
        )}
      </div>

      <div className="lesson-nav">
        <div className="lesson-nav__prev">
          {prev && (
            <Link href={`${courseHref}/${prev.slug}`} className="lesson-nav__link lesson-nav__link--prev">
              <span className="lesson-nav__arrow">←</span>
              <span>
                <span className="lesson-nav__label">Previous</span>
                <span className="lesson-nav__title">{prev.title}</span>
              </span>
            </Link>
          )}
        </div>
        <div className="lesson-nav__next">
          {next ? (
            <Link href={`${courseHref}/${next.slug}`} className="lesson-nav__link lesson-nav__link--next">
              <span>
                <span className="lesson-nav__label">Skip to next</span>
                <span className="lesson-nav__title">{next.title}</span>
              </span>
              <span className="lesson-nav__arrow">→</span>
            </Link>
          ) : (
            <Link href={courseHref} className="lesson-nav__link lesson-nav__link--prev">
              <span className="lesson-nav__arrow">←</span>
              <span>
                <span className="lesson-nav__label">Back to</span>
                <span className="lesson-nav__title">Course overview</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
