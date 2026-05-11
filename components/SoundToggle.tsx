'use client'

import { useEffect, useState } from 'react'
import { getSoundEnabled, setSoundEnabled } from '@/lib/sound'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setEnabled(getSoundEnabled())
    setMounted(true)
  }, [])

  if (!mounted) return <div style={{ width: 36, height: 36 }} />

  function toggle() {
    const next = !enabled
    setEnabled(next)
    setSoundEnabled(next)
  }

  return (
    <button
      className={`sound-toggle${enabled ? '' : ' sound-toggle--off'}`}
      onClick={toggle}
      aria-label={enabled ? 'Mute sound effects' : 'Unmute sound effects'}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
