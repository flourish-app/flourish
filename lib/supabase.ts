import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// When a refresh token is rejected by the server, clear the invalid local
// session immediately so the stale token is not retried on future loads.
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('sb-'))
      keys.forEach(k => localStorage.removeItem(k))
    }
  })
}

export type Profile = {
  id: string
  email: string | null
  first_name: string | null
  age_range: string | null
  university: string | null
  course: string | null
  not_in_he: boolean
  created_at: string
}