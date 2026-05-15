import { supabase } from './supabase'

// Flat metadata shape for calc_use — calculator name plus any numeric/string values
// the tool captured (e.g. { calculator: 'compound-interest', starting: 1000, rate: 7 }).
export type CalcUseMeta = { calculator: string; [key: string]: number | string | boolean }

// ─── Event catalogue ─────────────────────────────────────────────────────────
// Add a new key + metadata shape here when introducing a new trackable action.

export interface HabitMeta {
  lesson_finish:   { course_slug: string; lesson_slug: string }
  course_start:    { course_slug: string }
  course_complete: { course_slug: string }
  quiz_attempt:    { course_slug: string; lesson_slug: string; passed: boolean }
  sim_trade:       { ticker: string; type: 'BUY' | 'SELL'; shares: number; price: number }
  sim_reset:       Record<string, never>
  calc_use:        CalcUseMeta
  tool_open:       { tool: string }
}

export type HabitEventType = keyof HabitMeta

// ─── recordHabit ─────────────────────────────────────────────────────────────
// Returns Promise<void> so callers can await it before navigation if needed.
// Safe to call without awaiting when fire-and-forget is acceptable.
// Silently drops if the user is not authenticated.

export async function recordHabit<E extends HabitEventType>(
  eventType: E,
  meta: HabitMeta[E],
): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return
  const { error } = await supabase
    .from('user_habits')
    .insert({ user_id: session.user.id, event_type: eventType, metadata: meta })
  if (error && process.env.NODE_ENV === 'development') {
    console.warn('[recordHabit]', eventType, error.message)
  }
}
