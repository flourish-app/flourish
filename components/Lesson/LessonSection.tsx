'use client'

import type { Section } from './types'
import Quiz       from './Quiz'
import Confidence from './Confidence'
import Reflection from './Reflection'

export default function LessonSection({
  section, xpAlreadyEarned, onQuizFirstTry,
}: {
  section:          Section
  xpAlreadyEarned:  boolean
  onQuizFirstTry?:  () => void
}) {
  return (
    <div className="lesson-section">
      {section.heading && <h2 className="lesson-section__heading">{section.heading}</h2>}
      {section.paragraphs.map((p, i) => (
        <p key={i} className="lesson-section__p">{p}</p>
      ))}
      {section.list && (
        <ul className="lesson-section__list">
          {section.list.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
      {section.callout && (
        <div className={`lesson-callout lesson-callout--${section.callout.type}`}>
          <div className="lesson-callout__label">
            {section.callout.type === 'key'     ? '🔑 Key point'
              : section.callout.type === 'tip'  ? '💡 Tip'
              : '📌 Example'}
          </div>
          <p className="lesson-callout__text">{section.callout.text}</p>
        </div>
      )}
      {section.checkpoint && (() => {
        const cp = section.checkpoint!
        if (cp.type === 'quiz')       return <Quiz checkpoint={cp} xpAlreadyEarned={xpAlreadyEarned} onFirstTryCorrect={onQuizFirstTry} />
        if (cp.type === 'confidence') return <Confidence checkpoint={cp} />
        if (cp.type === 'reflection') return <Reflection checkpoint={cp} />
        return null
      })()}
    </div>
  )
}
