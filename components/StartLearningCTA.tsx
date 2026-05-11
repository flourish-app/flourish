'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function StartLearningCTA({ className }: { className?: string }) {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSignedIn(!!session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s))
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Link href={signedIn ? '/dashboard' : '/start-learning'} className={className}>
      Start learning free
    </Link>
  )
}
