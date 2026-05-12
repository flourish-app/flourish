'use client'

import { useState } from 'react'
import type { ReflectionCheckpoint } from './types'

export default function Reflection({ checkpoint }: { checkpoint: ReflectionCheckpoint }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="checkpoint checkpoint--reflection">
      <div className="checkpoint__tag">Think about it</div>
      <p className="checkpoint__question">{checkpoint.prompt}</p>
      {!revealed ? (
        <button className="checkpoint__reveal-btn" onClick={() => setRevealed(true)}>
          Reveal answer
        </button>
      ) : (
        <div className="checkpoint__reveal">{checkpoint.reveal}</div>
      )}
    </div>
  )
}
