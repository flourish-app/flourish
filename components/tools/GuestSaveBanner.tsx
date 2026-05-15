'use client'

import Link from 'next/link'

export function GuestSaveBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="guest-save-banner" role="status" aria-live="polite">
      <span className="guest-save-banner__icon">💾</span>
      <p className="guest-save-banner__text">
        <strong>Save your results</strong> — create a free account to track your progress and access every tool in one place.
      </p>
      <Link href="/start-learning" className="guest-save-banner__cta">
        Create free account
      </Link>
      <button className="guest-save-banner__dismiss" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
