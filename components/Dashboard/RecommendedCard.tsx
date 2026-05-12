import Link from 'next/link'

const LESSONS = [
  { title: 'What is compound interest?',  href: '/dashboard/courses/investing-from-scratch/lesson-4' },
  { title: 'ISAs explained for students', href: '/dashboard/courses/isas-and-tax-free-saving' },
  { title: 'How the stock market works',  href: '/dashboard/courses/stocks-etfs-and-funds' },
]

export default function RecommendedCard() {
  return (
    <section className="dashboard-card">
      <p className="dashboard-card__eyebrow">Recommended for you</p>
      <ul className="dashboard-lessons">
        {LESSONS.map(({ title, href }) => (
          <li key={title} className="dashboard-lesson">
            <span className="dashboard-lesson__dot" />
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
