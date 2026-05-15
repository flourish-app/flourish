'use client'

import { useEffect, useRef } from 'react'
import { recordHabit, type CalcUseMeta } from '@/lib/habits'

export interface DebouncedHabitOptions {
  /** Matches the 'calculator' field written to user_habits.metadata */
  calculator: string
  /** All current slider/input values for the tool */
  values: Record<string, number | string | boolean>
  /** Only fire Supabase write when true — pass isAuthenticated prop */
  enabled?: boolean
  /** Milliseconds of inactivity before the authenticated event fires. Default: 3000 */
  debounceMs?: number
  /** Called once when a guest has interacted for guestEngageMs without interruption */
  onGuestEngaged?: () => void
  /** Milliseconds of inactivity before onGuestEngaged fires. Default: 5000 */
  guestEngageMs?: number
}

export function useDebouncedHabit({
  calculator,
  values,
  enabled = true,
  debounceMs = 3000,
  onGuestEngaged,
  guestEngageMs = 4000,
}: DebouncedHabitOptions): void {
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null)
  const guestTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSnapshotRef = useRef<string | null>(null)
  const guestFiredRef   = useRef(false)
  const guestStartedRef = useRef(false)
  const mountedRef      = useRef(false)

  const snapshot = JSON.stringify(values)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }

    // Authenticated path — debounce and write to Supabase
    if (enabled) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        if (snapshot === lastSnapshotRef.current) return
        lastSnapshotRef.current = snapshot
        recordHabit('calc_use', { calculator, ...values } as CalcUseMeta)
      }, debounceMs)
      return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }

    // Guest path — fire onGuestEngaged once, guestEngageMs after FIRST interaction
    if (onGuestEngaged && !guestFiredRef.current && !guestStartedRef.current) {
      guestStartedRef.current = true
      guestTimerRef.current = setTimeout(() => {
        guestFiredRef.current = true
        onGuestEngaged()
      }, guestEngageMs)
    }
  }, [snapshot, calculator, enabled, debounceMs, onGuestEngaged, guestEngageMs]) // eslint-disable-line react-hooks/exhaustive-deps
}
