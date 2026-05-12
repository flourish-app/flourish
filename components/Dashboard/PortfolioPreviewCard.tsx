import Link from 'next/link'

type Props = {
  portfolioTotal: number | null
  hasPortfolio: boolean
}

export default function PortfolioPreviewCard({ portfolioTotal, hasPortfolio }: Props) {
  return (
    <section className="dashboard-card">
      <p className="dashboard-card__eyebrow">Portfolio simulator</p>
      <h2 className="dashboard-card__title">
        {portfolioTotal !== null ? `£${portfolioTotal.toFixed(2)}` : '£—'}
      </h2>
      <p className="dashboard-card__desc">
        {hasPortfolio
          ? 'Continue trading your virtual portfolio and practise investing risk-free.'
          : 'Start your virtual portfolio to practise investing risk-free.'}
      </p>
      <Link href="/dashboard/simulator" className="btn btn--outline btn--sm" style={{ marginTop: '16px' }}>
        {hasPortfolio ? 'Continue trading' : 'Get started'}
      </Link>
    </section>
  )
}
