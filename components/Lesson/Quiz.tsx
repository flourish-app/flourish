'use client'

import { useState } from 'react'
import { playCorrectAnswer } from '@/lib/sound'
import type { QuizCheckpoint } from './types'

export default function Quiz({
  checkpoint, xpAlreadyEarned, onFirstTryCorrect,
}: {
  checkpoint:        QuizCheckpoint
  xpAlreadyEarned:   boolean
  onFirstTryCorrect?: () => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const answered = chosen !== null

  function handleChoice(i: number) {
    if (answered) return
    setChosen(i)
    if (checkpoint.options[i].correct) {
      playCorrectAnswer()
      if (!xpAlreadyEarned) onFirstTryCorrect?.()
    }
  }

  return (
    <div className="checkpoint checkpoint--quiz">
      <div className="checkpoint__tag">
        Quick check
        {xpAlreadyEarned && <span className="checkpoint__xp-earned">XP earned</span>}
      </div>
      <p className="checkpoint__question">{checkpoint.question}</p>
      <div className="checkpoint__options">
        {checkpoint.options.map((opt, i) => {
          let cls = 'checkpoint__option'
          if (answered) {
            if (opt.correct)   cls += ' checkpoint__option--correct'
            else if (i === chosen) cls += ' checkpoint__option--wrong'
            else               cls += ' checkpoint__option--dim'
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => handleChoice(i)}>
              {opt.text}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`checkpoint__feedback checkpoint__feedback--${checkpoint.options[chosen!].correct ? 'correct' : 'nudge'}`}>
          {checkpoint.options[chosen!].correct ? '✓ Exactly.' : 'Not quite —'} {checkpoint.explanation}
        </div>
      )}
    </div>
  )
}
