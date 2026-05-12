'use client'

export default function LevelUpModal({
  level, title, onClose,
}: { level: number; title: string; onClose: () => void }) {
  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="level-up-modal__badge">Lv.{level}</div>
        <h2 className="level-up-modal__heading">Level up!</h2>
        <p className="level-up-modal__title">{title}</p>
        <button className="btn btn--primary btn--sm" onClick={onClose}>Keep going</button>
      </div>
    </div>
  )
}
