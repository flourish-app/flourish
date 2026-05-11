const STORAGE_KEY = 'fl_sound'

export function getSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === null ? true : stored === '1'
}

export function setSoundEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0')
}

function play(src: string): void {
  if (!getSoundEnabled()) return
  const audio = new Audio(src)
  audio.volume = 0.5
  audio.play().catch(() => {})
}

export function playXpGain(): void {
  play('/sounds/xp-gain-sound.mp3')
}

export function playCorrectAnswer(): void {
  play('/sounds/correct-answer-sound.mp3')
}
