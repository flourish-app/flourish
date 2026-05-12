import type { Metadata } from 'next'
import Link from 'next/link'
import CourseOutcomes from '@/components/CourseOverview/CourseOutcomes'
import CourseFaq      from '@/components/CourseOverview/CourseFaq'
import CourseForGrid  from '@/components/CourseOverview/CourseForGrid'
import CourseCurriculum from '@/components/CourseOverview/CourseCurriculum'
import CourseRelated  from '@/components/CourseOverview/CourseRelated'
import type { FaqItem, ForCard, RelatedCourse, CourseLessonItem } from '@/components/CourseOverview/types'

export const metadata: Metadata = { title: 'Pensions & Your Future — Flourish' }

const lessons: CourseLessonItem[] = [
  { num: 1, title: 'Why pensions matter even at 19',                                   duration: '8 min'  },
  { num: 2, title: 'Workplace pensions and auto-enrolment — the free money explained', duration: '12 min' },
  { num: 3, title: 'What is a SIPP? Taking control of your own pension',               duration: '11 min' },
  { num: 4, title: 'The Lifetime ISA — a pension alternative for first-time buyers',   duration: '9 min'  },
  { num: 5, title: 'How much do you actually need to retire?',                         duration: '14 min' },
]

const outcomes = [
  'Understand what a pension actually is and how it grows tax-free over time',
  "See exactly why starting at 20 beats starting at 35 — in real numbers",
  "Know how workplace auto-enrolment works and why it's free money you shouldn't leave behind",
  'Understand what a SIPP is and when it might be the right choice for you',
  'Know whether a Lifetime ISA could work alongside or instead of a pension',
  "Have a realistic, grounded idea of how much you'll need to retire comfortably",
]

const forCards: ForCard[] = [
  { icon: '🎓', title: 'Students approaching graduation', body: "You're about to start your first job. Before you opt out of auto-enrolment or ignore your workplace pension, take this course — it's an hour that could be worth hundreds of thousands." },
  { icon: '💼', title: 'New to the workforce',           body: "You've just started working and your employer is asking about your pension. This course explains exactly what you're signing up for — and why you should stay enrolled." },
  { icon: '🤔', title: "Anyone who's been putting it off", body: "\"I'll think about retirement when I'm older.\" This course is specifically for you. It will show you, in actual numbers, what that delay costs." },
]

const faqs: FaqItem[] = [
  { q: 'I\'m a student — do I really need to think about this now?', a: "Yes — and this course will show you exactly why. A student who puts £50/month into a pension from age 20 will retire with significantly more than someone who puts in £500/month starting at 40. Time is the variable that matters most, and you have more of it than anyone." },
  { q: 'What is auto-enrolment and does it apply to me?',          a: "Auto-enrolment is a UK law that requires employers to automatically enrol eligible workers into a workplace pension. If you're 22 or over, earning more than £10,000/year, and working in the UK, your employer must contribute too. That's free money — Lesson 2 covers it in full." },
  { q: 'Can I have an ISA and a pension at the same time?',         a: 'Absolutely — and for most young people, doing both is the smart approach. ISAs are flexible and accessible at any age. Pensions are locked in until retirement but come with tax relief. Lesson 4 explains how to think about balancing the two.' },
  { q: 'What\'s the difference between a workplace pension and a SIPP?', a: "A workplace pension is set up by your employer and they contribute alongside you. A SIPP (Self-Invested Personal Pension) is one you open yourself — more control, more investment choices, but no employer contributions. Lesson 3 covers when each makes sense." },
]

const related: RelatedCourse[] = [
  { emoji: '🚀', tag: 'Beginner · 8 lessons',   title: 'Investing from Scratch', body: 'New to investing? Start here — covers the foundational concepts that underpin everything in this course.', href: '/dashboard/courses/investing-from-scratch' },
  { emoji: '🏦', tag: 'Essentials · 6 lessons', title: 'ISAs & Tax-Free Saving', body: 'Learn how ISAs and the Lifetime ISA work alongside your pension for a complete tax-efficient strategy.', href: '/dashboard/courses/isas-and-tax-free-saving' },
]

const statCards = [
  { num: '£', big: '240k', label: 'extra retirement pot from starting at 20 vs 30, investing just £100/month' },
  { num: '',  big: '8%',   label: 'of your salary your employer must contribute under auto-enrolment — on top of yours' },
  { num: '',  big: '25%',  label: 'tax relief on every pension contribution — the government tops up what you put in' },
]

export default function PensionsDashboardPage() {
  return (
    <div className="course-page">
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag">Long-term</span>
                <span className="course-meta-item">📚 5 lessons</span>
                <span className="course-meta-item">⏱ ~55 mins</span>
                <span className="course-meta-item">🎯 All levels</span>
              </div>
              <h1 className="course-hero__headline">Pensions &amp; Your Future</h1>
              <p className="course-hero__sub">
                Pensions feel like something to think about at 40. They&apos;re not. Every year you delay is money you can never get back. This course explains why — and makes it simple to do something about it now.
              </p>
              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
                <span className="course-badge course-badge--grey">No prior knowledge needed</span>
              </div>
            </div>
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">🔮</div>
              <div className="course-signup-card__progress">
                <div className="course-signup-card__progress-label">
                  <span>Your progress</span>
                  <span>0 / 5 lessons</span>
                </div>
                <div className="course-signup-card__progress-bar">
                  <div className="course-signup-card__progress-fill" />
                </div>
              </div>
              <button className="btn btn--primary btn--lg course-signup-card__cta">Start course</button>
              <ul className="course-signup-card__perks">
                <li>✓ All lessons unlocked</li>
                <li>✓ Learn at your own pace</li>
                <li>✓ Progress saved automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-body">
          <div className="course-body__main">
            <div className="course-section">
              <h2 className="course-section__title">The numbers that should get your attention</h2>
              <div className="course-stat-grid">
                {statCards.map(s => (
                  <div className="course-stat-card" key={s.label}>
                    <div className="course-stat-card__num">{s.num}<span>{s.big}</span></div>
                    <p className="course-stat-card__label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <CourseOutcomes outcomes={outcomes} />
            <CourseForGrid  cards={forCards} />
            <CourseCurriculum lessons={lessons} totalLabel="5 lessons · all unlocked" />
            <CourseFaq     faqs={faqs} />
            <CourseRelated courses={related} />
          </div>
        </div>
      </div>
    </div>
  )
}
