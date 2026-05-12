import type { CompletionRow } from './types'

function toDateKey(iso: string) {
  return new Date(iso).toLocaleDateString('sv-SE', { timeZone: 'Europe/London' })
}

export function computeStreak(completions: CompletionRow[]): number {
  if (completions.length === 0) return 0

  const dateSet = new Set(completions.map(c => toDateKey(c.completed_at)))

  const todayKey     = toDateKey(new Date().toISOString())
  const yesterdayKey = toDateKey(new Date(Date.now() - 86_400_000).toISOString())

  const startKey = dateSet.has(todayKey) ? todayKey
    : dateSet.has(yesterdayKey) ? yesterdayKey
    : null
  if (!startKey) return 0

  let streak = 0
  let cursor = new Date(startKey)
  while (dateSet.has(cursor.toLocaleDateString('sv-SE', { timeZone: 'Europe/London' }))) {
    streak++
    cursor = new Date(cursor.getTime() - 86_400_000)
  }
  return streak
}
