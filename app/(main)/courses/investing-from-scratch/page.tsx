import type { Metadata } from 'next'
import CourseOutcomes              from '@/components/CourseOverview/CourseOutcomes'
import CourseFaq                   from '@/components/CourseOverview/CourseFaq'
import CourseForGrid               from '@/components/CourseOverview/CourseForGrid'
import CourseRelated               from '@/components/CourseOverview/CourseRelated'
import MarketingCourseSignupCard   from '@/components/Marketing/MarketingCourseSignupCard'
import MarketingCourseCurriculum   from '@/components/Marketing/MarketingCourseCurriculum'
import MarketingCourseCTABlock     from '@/components/Marketing/MarketingCourseCTABlock'
import type { FaqItem, ForCard, RelatedCourse } from '@/components/CourseOverview/types'
import type { MarketingLesson } from '@/components/Marketing/types'

export const metadata: Metadata = {
  title: 'Investing from Scratch - Flourish',
  description: "The complete beginner's guide to investing. Learn what investing is, how compound interest works, and how to take your first step — built for UK students.",
}

const lessons: MarketingLesson[] = [
  { num: 1, title: "What is investing — and what it isn't",                      duration: '5 min',  free: true  },
  { num: 2, title: 'Why your money loses value sitting still',                    duration: '7 min',  free: false },
  { num: 3, title: 'Risk and return — the relationship that drives everything',   duration: '8 min',  free: false },
  { num: 4, title: 'Compound interest — and why starting early changes everything', duration: '10 min', free: false },
  { num: 5, title: 'Saving vs investing — when to do which',                     duration: '6 min',  free: false },
  { num: 6, title: 'Stocks, bonds, funds and ETFs — what they actually are',     duration: '12 min', free: false },
  { num: 7, title: 'How to think about your first investment',                   duration: '9 min',  free: false },
  { num: 8, title: 'Your next steps — getting started in the UK',               duration: '8 min',  free: false },
]

const outcomes = [
  'Understand what investing actually is — in plain, jargon-free English',
  'Know why inflation means saving alone is not enough',
  'Understand the link between risk and return, and what it means for you',
  'See exactly how compound interest grows wealth over time',
  'Know the difference between stocks, bonds, funds and ETFs',
  'Feel genuinely ready to take your first real investing step',
]

const forCards: ForCard[] = [
  { icon: '🧩', title: 'Complete beginners',           body: 'You\'ve heard words like "stocks" and "ISA" but have no idea what they mean. This course is literally designed for you — no assumptions, no jargon.' },
  { icon: '💰', title: 'Students with savings',         body: "You've got money sitting in a current account and a vague sense that you should be doing something smarter with it. This course shows you what." },
  { icon: '⏰', title: 'People who keep putting it off', body: '"I\'ll sort my finances when I\'m older." Sound familiar? This course will show you exactly how much that delay costs — and make it easy to start today.' },
]

const faqs: FaqItem[] = [
  { q: 'Do I need money to start this course?',              a: "No — this is an education course, not a platform to invest real money. You'll learn everything you need before you spend a single penny." },
  { q: 'I failed maths at school. Is this going to go over my head?', a: 'Absolutely not. This course uses plain English throughout. The only number that matters is compound interest, and we explain it with real examples — not formulas.' },
  { q: 'How much money do I actually need to start investing?', a: "Some UK platforms let you start with as little as £1. This course will help you understand what's right for your situation before you put any money in." },
  { q: 'Is this course specific to the UK?',                 a: 'Yes. All examples, products, platforms and tax rules covered are UK-specific. We focus on ISAs, UK brokers and the UK market.' },
]

const related: RelatedCourse[] = [
  { emoji: '🏦', tag: 'Essentials · 6 lessons', title: 'ISAs & Tax-Free Saving', body: 'Put your knowledge to work — learn how to invest tax-free using your £20,000 annual allowance.', href: '/courses/isas-and-tax-free-saving' },
]

export default function InvestingFromScratchPage() {
  return (
    <div className="course-page">
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag course-tag--featured">Most popular</span>
                <span className="course-meta-item">📚 8 lessons</span>
                <span className="course-meta-item">⏱ ~65 mins</span>
                <span className="course-meta-item">🎯 Beginner</span>
              </div>
              <h1 className="course-hero__headline">Investing from Scratch</h1>
              <p className="course-hero__sub">
                You don&apos;t need to understand finance to start this course. That&apos;s the whole point. We go from &quot;what even is investing?&quot; to &quot;I&apos;m ready to start&quot; — in eight short lessons.
              </p>
              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">Zero prior knowledge needed</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
              </div>
            </div>
            <MarketingCourseSignupCard emoji="🚀" total={8} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-body">
          <div className="course-body__main">
            <CourseOutcomes outcomes={outcomes} />
            <CourseForGrid  cards={forCards} />
            <MarketingCourseCurriculum lessons={lessons} subText="Lesson 1 is free to preview. Create a free account to unlock all 8 lessons." />
            <MarketingCourseCTABlock
              headline="The best time to start was yesterday. The second best time is right now."
              sub="Every year you wait costs more than you think. Create a free account and start Lesson 1 in the next two minutes."
            />
            <CourseFaq     faqs={faqs} />
            <CourseRelated title="Up next after this course" courses={related} />
          </div>
        </div>
      </div>
    </div>
  )
}
