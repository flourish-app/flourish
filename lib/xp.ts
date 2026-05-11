import { supabase } from './supabase'

export const LEVELS = [
  { level: 1,  title: 'Beginner',              xp: 0 },
  { level: 2,  title: 'Saver',                 xp: 100 },
  { level: 3,  title: 'Investor',              xp: 250 },
  { level: 4,  title: 'Portfolio Builder',     xp: 500 },
  { level: 5,  title: 'Market Explorer',       xp: 850 },
  { level: 6,  title: 'Wealth Builder',        xp: 1300 },
  { level: 7,  title: 'Long-Term Investor',    xp: 1900 },
  { level: 8,  title: 'Financial Strategist',  xp: 2700 },
  { level: 9,  title: 'Investment Banker',     xp: 3800 },
  { level: 10, title: 'Flourish Fellow',       xp: 5500 },
] as const

export type LevelInfo = {
  level: number
  title: string
  totalXp: number
  levelStartXp: number
  nextLevelXp: number | null
  progressPct: number
}

export function computeLevel(totalXp: number): LevelInfo {
  let current: typeof LEVELS[number] = LEVELS[0]
  for (const l of LEVELS) {
    if (totalXp >= l.xp) current = l
    else break
  }
  const next = LEVELS.find(l => l.level === current.level + 1) ?? null
  const progressPct = next
    ? Math.min(100, Math.round(((totalXp - current.xp) / (next.xp - current.xp)) * 100))
    : 100

  return {
    level: current.level,
    title: current.title,
    totalXp,
    levelStartXp: current.xp,
    nextLevelXp: next?.xp ?? null,
    progressPct,
  }
}

export async function awardXp(
  userId: string,
  eventType: string,
  referenceId: string,
  xpAmount: number,
): Promise<number> {
  const { data } = await supabase.rpc('award_xp', {
    p_user_id: userId,
    p_event_type: eventType,
    p_reference_id: referenceId,
    p_xp_amount: xpAmount,
  })
  return (data as number) ?? 0
}

export const XP = {
  LESSON_COMPLETE:          20,
  QUIZ_FIRST_TRY:           15,
  COURSE_COMPLETE:          100,
  FIRST_TRADE:              20,
  FIRST_PROFITABLE_SALE:    15,
  DIVERSIFY_THREE_SECTORS:  35,
  HOLD_ETF:                 15,
  FIRST_PROFITABLE_MONTH:   50,
  STREAK_3_DAY:             25,
  STREAK_7_DAY:             50,
  STREAK_14_DAY:            100,
  STREAK_30_DAY:            250,
} as const
