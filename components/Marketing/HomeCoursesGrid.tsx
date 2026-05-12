import Link from 'next/link'

const courses = [
  { href: '/courses/investing-from-scratch',   tag: 'Most popular', featured: true,  emoji: '🚀', title: 'Investing from scratch',   body: "The complete beginner's guide. What investing actually is, why it beats savings accounts, and how to start with as little as £1.", lessons: 8,  duration: '~65 mins' },
  { href: '/courses/isas-and-tax-free-saving', tag: 'Essentials',   featured: false, emoji: '🏦', title: 'ISAs & Tax-free saving',    body: 'Cash ISA, Stocks & Shares ISA, Lifetime ISA - know the difference and use your £20k annual allowance wisely.',              lessons: 6,  duration: '~50 mins' },
  { href: '/courses/stocks-etfs-and-funds',    tag: 'Intermediate', featured: false, emoji: '📊', title: 'Stocks, ETFs & Funds',      body: 'Understand the difference between individual stocks, index funds, and ETFs - and which strategy is right for a student budget.', lessons: 10, duration: '~90 mins' },
  { href: '/courses/pensions-and-your-future', tag: 'Long-term',    featured: false, emoji: '🔮', title: 'Pensions & your future',    body: 'Why pensions matter even at 19, how workplace auto-enrolment works, and why time is your greatest financial asset.',           lessons: 5,  duration: '~55 mins' },
  { href: '/courses',                          tag: 'Practical',    featured: false, emoji: '🧮', title: 'Budgeting on a student income', body: "Turn your maintenance loan into a foundation. Saving strategies that actually work when you're living off £800 a month.",  lessons: 7,  duration: '~2 hrs'   },
  { href: '/courses',                          tag: 'Advanced',     featured: false, emoji: '🌍', title: 'Understanding markets',     body: 'How global markets move, what inflation means for your money, and how to think about economic cycles without panicking.',       lessons: 9,  duration: '~2.5 hrs' },
]

export default function HomeCoursesGrid() {
  return (
    <section className="paths" id="learn">
      <div className="container">
        <div className="section-tag fade-up">Courses</div>
        <h2 className="section-headline fade-up">Everything they didn&apos;t teach you</h2>
        <p className="section-sub fade-up">
          Structured modules built around what UK students actually need to know - from opening your first ISA to understanding global markets.
        </p>
        <div className="paths__grid">
          {courses.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className={`path-card fade-up${c.featured ? ' path-card--featured' : ''}`}
            >
              <div className="path-card__tag" style={c.featured ? { background: 'rgba(76,175,130,0.2)', color: '#4caf82' } : undefined}>
                {c.tag}
              </div>
              <div className="path-card__emoji">{c.emoji}</div>
              <div className="path-card__title">{c.title}</div>
              <p className="path-card__body">{c.body}</p>
              <div className="path-card__meta">
                <span>📚 {c.lessons} lessons</span>
                <span>⏱ {c.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
