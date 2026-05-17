const LONDON_TIME_ZONE = 'Europe/London'

export type WeekDay = { done: boolean; future: boolean }

function toDateKey(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value
  return date.toLocaleDateString('sv-SE', { timeZone: LONDON_TIME_ZONE })
}

function dateKeyToUtcNoon(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day, 12))
}

function addDaysToKey(key: string, days: number) {
  const date = dateKeyToUtcNoon(key)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function getIsoWeekday(key: string) {
  const day = dateKeyToUtcNoon(key).getUTCDay()
  return day === 0 ? 7 : day
}

export function computeStreak(eventTimestamps: string[]): number {
  if (eventTimestamps.length === 0) return 0

  const dateSet = new Set(eventTimestamps.map(toDateKey))

  const todayKey     = toDateKey(new Date())
  const yesterdayKey = addDaysToKey(todayKey, -1)

  const startKey = dateSet.has(todayKey) ? todayKey
    : dateSet.has(yesterdayKey) ? yesterdayKey
    : null
  if (!startKey) return 0

  let streak = 0
  let cursor = startKey
  while (dateSet.has(cursor)) {
    streak++
    cursor = addDaysToKey(cursor, -1)
  }
  return streak
}

export function computeWeekDays(eventTimestamps: string[], now = new Date()): WeekDay[] {
  const dateSet = new Set(eventTimestamps.map(toDateKey))
  const todayKey = toDateKey(now)
  const mondayKey = addDaysToKey(todayKey, 1 - getIsoWeekday(todayKey))

  return Array.from({ length: 7 }, (_, index) => {
    const key = addDaysToKey(mondayKey, index)
    return {
      done: dateSet.has(key),
      future: key > todayKey,
    }
  })
}

export function countEventsThisWeek(eventTimestamps: string[], now = new Date()): number {
  const todayKey = toDateKey(now)
  const mondayKey = addDaysToKey(todayKey, 1 - getIsoWeekday(todayKey))

  return eventTimestamps.filter((timestamp) => {
    const key = toDateKey(timestamp)
    return key >= mondayKey && key <= todayKey
  }).length
}
