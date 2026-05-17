'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LessonCompleteButton({ xp, nextHref }: { xp: number; nextHref: string }) {
  const router = useRouter()
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState(false)

  function handleComplete() {
    if (done) return
    setDone(true)
    setToast(true)
    setTimeout(() => {
      setToast(false)
      router.push(nextHref)
    }, 1800)
  }

  return (
    <>
      <button
        className={`lesson-reader__complete-btn${done ? ' lesson-reader__complete-btn--done' : ''}`}
        onClick={handleComplete}
        disabled={done}
      >
        {done ? '✓ Lesson Complete' : `Complete Lesson & Claim +${xp} XP`}
      </button>

      {toast && (
        <div className="lesson-toast" role="status">
          <span className="lesson-toast__icon">🎉</span>
          <span>+{xp} XP claimed! Moving on…</span>
        </div>
      )}
    </>
  )
}
