import Link from 'next/link'
import { STARTING_CASH } from '@/lib/simulator'

type Props = {
  portfolioTotal: number | null
  hasPortfolio: boolean
}

export default function PortfolioPreviewCard({ portfolioTotal, hasPortfolio }: Props) {
  const change = portfolioTotal !== null ? portfolioTotal - STARTING_CASH : null
  const changePct = change !== null ? (change / STARTING_CASH) * 100 : null
  const positive = changePct !== null && changePct >= 0

  return (
    <section className="dashboard-card pvc">
      <p className="dashboard-card__eyebrow">Portfolio simulator</p>

      <div className="pvc__value-row">
        <h2 className="pvc__value">
          {portfolioTotal !== null ? `£${portfolioTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '£—'}
        </h2>
        {changePct !== null && (
          <div className="pvc__badge-col">
            <span className={`pvc__badge ${positive ? 'pvc__badge--up' : 'pvc__badge--down'}`}>
              {positive ? '+' : ''}{changePct.toFixed(1)}%
            </span>
            <span className="pvc__badge-sub">vs FTSE 100</span>
          </div>
        )}
      </div>
      <p className="pvc__sub">Your virtual portfolio value</p>

      {/* Decorative chart */}
      <div className="pvc__chart">
        <svg viewBox="0 0 220 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 48 C18 44, 35 40, 52 34 C70 28, 82 30, 98 24 C114 18, 126 14, 144 10 C162 6, 180 4, 198 2 L220 1"
            stroke="#2e7d5e"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M0 48 C18 44, 35 40, 52 34 C70 28, 82 30, 98 24 C114 18, 126 14, 144 10 C162 6, 180 4, 198 2 L220 1 L220 56 L0 56 Z"
            fill="url(#chartGrad)"
          />
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e7d5e" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2e7d5e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="pvc__desc">
        {hasPortfolio
          ? 'Practice trading risk-free with £10,000 of virtual money.'
          : 'Start your virtual portfolio to practise investing risk-free.'}
      </p>

      <Link href="/dashboard/simulator" className="btn btn--outline btn--sm pvc__cta">
        {hasPortfolio ? 'View portfolio' : 'Get started'}
      </Link>
    </section>
  )
}
