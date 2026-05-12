'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { type SimTransaction } from '@/lib/simulator'
import HistoryStats  from '@/components/SimulatorHistory/HistoryStats'
import HistoryFilter from '@/components/SimulatorHistory/HistoryFilter'
import HistoryTable  from '@/components/SimulatorHistory/HistoryTable'

const ALL     = 'All' as const
type Filter   = 'All' | 'BUY' | 'SELL'

export default function HistoryPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<SimTransaction[]>([])
  const [filter,       setFilter]       = useState<Filter>(ALL)
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(e => {
      if (e === 'SIGNED_OUT') router.replace('/login')
    })
    const load = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { router.replace('/login'); return }
      const { data: port } = await supabase.from('virtual_portfolios').select('id').eq('user_id', session.user.id).maybeSingle()
      if (!port) { setLoading(false); return }
      const { data: txns } = await supabase
        .from('transactions')
        .select('id, ticker, stock_name, type, shares, price, total, cash_after, executed_at')
        .eq('portfolio_id', port.id)
        .order('executed_at', { ascending: false })
      setTransactions((txns ?? []) as SimTransaction[])
      setLoading(false)
    }
    load()
    return () => subscription.unsubscribe()
  }, [router])

  if (loading) return <div className="dashboard-loading"><span className="auth-spinner" /></div>

  const visible     = filter === ALL ? transactions : transactions.filter(t => t.type === filter)
  const totalBuys   = transactions.filter(t => t.type === 'BUY').length
  const totalSells  = transactions.filter(t => t.type === 'SELL').length
  const totalVolume = transactions.reduce((sum, t) => sum + t.total, 0)

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <Link href="/dashboard/simulator" className="sim-back">← Portfolio</Link>
          <h1 className="dashboard__greeting">Transaction history</h1>
          <p className="dashboard__sub">{transactions.length} trade{transactions.length !== 1 ? 's' : ''} · £{totalVolume.toFixed(2)} total volume</p>
        </div>
      </header>

      {transactions.length === 0 ? (
        <div className="sim-empty">
          <p className="sim-empty__heading">No trades yet</p>
          <p className="sim-empty__sub">Your full transaction history will appear here after your first trade.</p>
          <Link href="/dashboard/simulator/stocks" className="btn btn--primary">Browse stocks</Link>
        </div>
      ) : (
        <>
          <HistoryStats total={transactions.length} totalBuys={totalBuys} totalSells={totalSells} totalVolume={totalVolume} />
          <HistoryFilter filter={filter} onFilter={setFilter} />
          <HistoryTable transactions={visible} />
        </>
      )}
    </div>
  )
}
