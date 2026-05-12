import type { Metadata } from 'next'
import CourseOutcomes              from '@/components/CourseOverview/CourseOutcomes'
import CourseForGrid               from '@/components/CourseOverview/CourseForGrid'
import MarketingCourseSignupCard   from '@/components/Marketing/MarketingCourseSignupCard'
import MarketingCourseCurriculum   from '@/components/Marketing/MarketingCourseCurriculum'
import MarketingCourseCTABlock     from '@/components/Marketing/MarketingCourseCTABlock'
import type { ForCard } from '@/components/CourseOverview/types'
import type { MarketingLesson } from '@/components/Marketing/types'

export const metadata: Metadata = {
  title: 'ISAs & Tax-Free Saving - Flourish',
  description: 'Learn everything about ISAs — Cash ISAs, Stocks & Shares ISAs, Lifetime ISAs and your £20,000 annual allowance. Free course for UK students.',
}

const lessons: MarketingLesson[] = [
  { num: 1, title: 'What is an ISA and why does it matter?',           duration: '6 min',  free: true  },
  { num: 2, title: 'Cash ISA vs Stocks & Shares ISA',                  duration: '8 min',  free: false },
  { num: 3, title: 'The Lifetime ISA — the 25% government bonus',       duration: '10 min', free: false },
  { num: 4, title: 'Your £20,000 annual allowance explained',           duration: '7 min',  free: false },
  { num: 5, title: 'How to choose the right ISA for your situation',    duration: '9 min',  free: false },
  { num: 6, title: 'Opening your first ISA — a step-by-step walkthrough', duration: '12 min', free: false },
]

const outcomes = [
  'Understand what an ISA is and why it beats a standard savings account',
  'Know the difference between a Cash ISA, Stocks & Shares ISA, and Lifetime ISA',
  'Make the most of your £20,000 annual tax-free allowance',
  'Understand how the LISA government bonus works for first-time buyers',
  'Choose the right ISA for your age, income, and goals',
  'Open your first ISA with confidence on an FCA-regulated platform',
]

const forCards: ForCard[] = [
  { icon: '🎓', title: 'University students',  body: "You're earning or receiving a student loan and want to start putting money to work — even if it's just £20 a month." },
  { icon: '🏠', title: 'First-time buyers',    body: "You're saving for a property and want to understand the Lifetime ISA's 25% government bonus before you miss out." },
  { icon: '🧩', title: 'Complete beginners',   body: 'You\'ve heard the word "ISA" but have no idea what it actually means. This course starts from absolute zero.' },
]

export default function IsasCoursePage() {
  return (
    <div className="course-page">
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag">Essentials</span>
                <span className="course-meta-item">📚 6 lessons</span>
                <span className="course-meta-item">⏱ ~50 mins</span>
                <span className="course-meta-item">🎯 Beginner</span>
              </div>
              <h1 className="course-hero__headline">ISAs &amp; Tax-Free Saving</h1>
              <p className="course-hero__sub">
                The UK gives every adult a £20,000 tax-free investing allowance every year. Most students have never heard of it. This course changes that — and shows you exactly how to use it.
              </p>
              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">No prior knowledge needed</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
              </div>
            </div>
            <MarketingCourseSignupCard emoji="🏦" total={6} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-body">
          <div className="course-body__main">
            <CourseOutcomes outcomes={outcomes} />
            <CourseForGrid  cards={forCards} />
            <MarketingCourseCurriculum lessons={lessons} subText="Lesson 1 is free to preview. Create a free account to unlock the full course." />
            <MarketingCourseCTABlock
              headline="Ready to understand your ISA options?"
              sub="Create a free account and unlock all 6 lessons instantly. No card, no catch — just clear, honest education."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
