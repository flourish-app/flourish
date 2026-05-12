import Link from 'next/link'
import { formatPnl } from '@/lib/simulator'

type Props = {
  totalPnl: number
  totalPct: number
}

export default function PortfolioHeader({ totalPnl, totalPct }: Props) {
  return (
    <header className="sim-page-header">
      <div>
        <h1 className="dashboard__greeting">Portfolio</h1>
        <p className={`sim-alltime ${totalPnl >= 0 ? 'sim-pos' : 'sim-neg'}`}>
          {formatPnl(totalPnl)} ({totalPnl >= 0 ? '+' : ''}{totalPct.toFixed(2)}%) all time
        </p>
      </div>
      <Link href="/dashboard/simulator/stocks" className="btn btn--green btn--sm">
        Browse stocks →
      </Link>
    </header>
  )
}
