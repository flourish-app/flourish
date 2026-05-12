import type { MarketingLesson } from './types'

interface Props {
  lessons:  MarketingLesson[]
  subText?: string
}

export default function MarketingCourseCurriculum({ lessons, subText }: Props) {
  return (
    <div className="course-section">
      <h2 className="course-section__title">Course curriculum</h2>
      {subText && <p className="course-section__sub">{subText}</p>}
      <div className="course-curriculum">
        {lessons.map((lesson) => (
          <div
            key={lesson.num}
            className={`course-lesson${lesson.free ? ' course-lesson--free' : ' course-lesson--locked'}`}
          >
            <div className="course-lesson__num">{lesson.num}</div>
            <div className="course-lesson__info">
              <div className="course-lesson__title">{lesson.title}</div>
              <div className="course-lesson__duration">{lesson.duration} read</div>
            </div>
            <div className="course-lesson__status">
              {lesson.free
                ? <span className="course-lesson__preview">Preview</span>
                : <span className="course-lesson__lock">🔒</span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
