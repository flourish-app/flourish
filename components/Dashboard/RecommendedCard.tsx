import Link from 'next/link'

const ITEMS = [
  {
    icon: '%',
    iconClass: 'rfy__icon--percent',
    title: 'What is compound interest?',
    desc: 'See how small amounts can grow over time.',
    href: '/dashboard/courses/investing-from-scratch/lesson-4',
  },
  {
    icon: '🎓',
    iconClass: 'rfy__icon--grad',
    title: 'ISAs explained for students',
    desc: 'Make the most of tax-free growth.',
    href: '/dashboard/courses/isas-and-tax-free-saving',
  },
  {
    icon: '📊',
    iconClass: 'rfy__icon--chart',
    title: 'How the stock market works',
    desc: 'The basics of buying, selling and prices.',
    href: '/dashboard/courses/stocks-etfs-and-funds',
  },
]

export default function RecommendedCard() {
  return (
    <section className="rfy">
      <p className="rfy__eyebrow">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
          <path d="M12 8v4l3 3" />
        </svg>
        Recommended for you
      </p>
      <div className="rfy__grid">
        {ITEMS.map(({ icon, iconClass, title, desc, href }) => (
          <Link key={href} href={href} className="rfy__item">
            <span className={`rfy__icon ${iconClass}`}>{icon}</span>
            <div className="rfy__body">
              <span className="rfy__title">{title}</span>
              <span className="rfy__desc">{desc}</span>
            </div>
            <span className="rfy__arrow">›</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
