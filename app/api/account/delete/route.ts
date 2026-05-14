import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function DELETE(req: NextRequest) {
  try {
    // Verify the caller is authenticated — read their session from the anon client
    const { createClient: createAnonClient } = await import('@supabase/supabase-js')
    const anon = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await anon.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Service-role client for privileged operations
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const uid = user.id

    // Delete user data explicitly (handles tables without cascade)
    await Promise.all([
      admin.from('xp_events').delete().eq('user_id', uid),
      admin.from('lesson_completions').delete().eq('user_id', uid),
      admin.from('portfolio_snapshots').delete().eq('user_id', uid),
      admin.from('holdings').delete().eq('user_id', uid),
      admin.from('virtual_portfolios').delete().eq('user_id', uid),
    ])

    // Delete auth user — cascades to profiles (FK on auth.users.id)
    const { error: deleteError } = await admin.auth.admin.deleteUser(uid)
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
