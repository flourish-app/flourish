import type { Metadata } from 'next'
import CourseCard      from '@/components/DashboardCourses/CourseCard'
import ComingSoonCard  from '@/components/DashboardCourses/ComingSoonCard'

export const metadata: Metadata = { title: 'Courses — Flourish' }

const available = [
  { emoji: '🚀', tag: 'Beginner',      tagStyle: 'featured', title: 'Investing from Scratch',  body: "The complete beginner's guide. What investing actually is, why it beats savings accounts, and how to start with as little as £1.", lessons: 8,  duration: '~65 mins', badge: 'Most popular', href: '/dashboard/courses/investing-from-scratch' },
  { emoji: '🏦', tag: 'Essentials',    tagStyle: 'default',  title: 'ISAs & Tax-Free Saving',  body: 'Cash ISA, Stocks & Shares ISA, Lifetime ISA — know the difference and make the most of your £20,000 annual tax-free allowance.', lessons: 6,  duration: '~50 mins', badge: null,           href: '/dashboard/courses/isas-and-tax-free-saving' },
  { emoji: '📊', tag: 'Intermediate',  tagStyle: 'default',  title: 'Stocks, ETFs & Funds',    body: 'Understand the difference between individual stocks, index funds, and ETFs — and how to build a simple low-cost portfolio.', lessons: 10, duration: '~90 mins', badge: null,           href: '/dashboard/courses/stocks-etfs-and-funds' },
  { emoji: '🔮', tag: 'Long-term',     tagStyle: 'default',  title: 'Pensions & Your Future',  body: 'Why pensions matter even at 19, how workplace auto-enrolment works, and why time is your greatest financial asset.', lessons: 5,  duration: '~55 mins', badge: null,           href: '/dashboard/courses/pensions-and-your-future' },
]

const comingSoon = [
  { emoji: '🧮', tag: 'Practical', title: 'Budgeting on a Student Income', body: "Turn your maintenance loan into a foundation. Saving strategies that actually work when you're living off £800 a month.", lessons: 7, duration: '~2 hrs' },
  { emoji: '🌍', tag: 'Advanced',  title: 'Understanding Markets',         body: 'How global markets move, what inflation means for your money, and how to think about economic cycles without panicking.',    lessons: 9, duration: '~2.5 hrs' },
]

export default function DashboardCoursesPage() {
  return (
    <div className="all-courses-page">
      <div className="all-courses-hero">
        <div className="container">
          <div className="all-courses-hero__inner">
            <div>
              <div className="section-tag">All courses</div>
              <h1 className="all-courses-hero__headline">Everything they didn&apos;t teach you</h1>
              <p className="all-courses-hero__sub">
                Six courses covering everything a UK student needs to know about money — from opening your first ISA to understanding global markets. Free, always.
              </p>
            </div>
            <div className="all-courses-hero__stats">
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">6</div>
                <div className="all-courses-stat__label">Courses</div>
              </div>
              <div className="all-courses-stat__divider" />
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">45</div>
                <div className="all-courses-stat__label">Lessons</div>
              </div>
              <div className="all-courses-stat__divider" />
              <div className="all-courses-stat">
                <div className="all-courses-stat__num">£0</div>
                <div className="all-courses-stat__label">Cost</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="all-courses-body">
          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Available now</h2>
              <span className="all-courses-section__count">{available.length} courses</span>
            </div>
            <div className="all-courses-grid">
              {available.map(c => <CourseCard key={c.title} {...c} />)}
            </div>
          </section>

          <section className="all-courses-section">
            <div className="all-courses-section__header">
              <h2 className="all-courses-section__title">Coming soon</h2>
              <span className="all-courses-section__count">{comingSoon.length} courses</span>
            </div>
            <div className="all-courses-grid">
              {comingSoon.map(c => <ComingSoonCard key={c.title} {...c} />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
