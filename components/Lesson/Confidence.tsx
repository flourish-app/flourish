'use client'

import { useState } from 'react'
import type { ConfidenceCheckpoint } from './types'

export default function Confidence({ checkpoint }: { checkpoint: ConfidenceCheckpoint }) {
  const [chosen, setChosen] = useState<string | null>(null)

  return (
    <div className="checkpoint checkpoint--confidence">
      <div className="checkpoint__tag">Check in</div>
      <p className="checkpoint__question">{checkpoint.prompt}</p>
      <div className="checkpoint__confidence-options">
        {[
          { key: 'fuzzy',   label: 'Still fuzzy 🤔' },
          { key: 'getting', label: 'Getting it 🙂'   },
          { key: 'got',     label: 'Got it! 💪'      },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`checkpoint__confidence-btn${chosen === key ? ' checkpoint__confidence-btn--selected' : ''}`}
            onClick={() => setChosen(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {chosen === 'fuzzy' && checkpoint.fuzzyNote && (
        <p className="checkpoint__fuzzy-note">{checkpoint.fuzzyNote}</p>
      )}
      {chosen && chosen !== 'fuzzy' && (
        <p className="checkpoint__encouragement">
          {chosen === 'got' ? 'Love to hear it — keep going.' : "That's all you need. Keep going."}
        </p>
      )}
    </div>
  )
}
