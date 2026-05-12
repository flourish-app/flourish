'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { lessons } from '@/lib/lessons/isas-and-tax-free-saving'
import CourseProgressCard from '@/components/CourseOverview/CourseProgressCard'
import CourseCurriculum   from '@/components/CourseOverview/CourseCurriculum'
import CourseOutcomes     from '@/components/CourseOverview/CourseOutcomes'
import CourseFaq          from '@/components/CourseOverview/CourseFaq'
import CourseForGrid      from '@/components/CourseOverview/CourseForGrid'
import CourseRelated      from '@/components/CourseOverview/CourseRelated'
import type { FaqItem, ForCard, RelatedCourse } from '@/components/CourseOverview/types'

const COURSE_SLUG = 'isas-and-tax-free-saving'
const TOTAL       = lessons.length

const outcomes = [
  'Understand what an ISA is and why it beats a standard savings account',
  'Know the difference between a Cash ISA, Stocks & Shares ISA, and Lifetime ISA',
  'Make the most of your £20,000 annual tax-free allowance',
  'Understand how the LISA government bonus works — and the rules around it',
  'Choose the right ISA for your age, income, and goals',
  'Open your first ISA with confidence on an FCA-regulated platform',
]

const forCards: ForCard[] = [
  { icon: '🎓', title: 'University students',  body: "You're earning or receiving a student loan and want to start putting money to work — even if it's just £20 a month." },
  { icon: '🏠', title: 'First-time buyers',    body: "You're saving for a property and want to understand the Lifetime ISA's 25% government bonus before you miss out." },
  { icon: '🧩', title: 'Complete beginners',   body: "You've heard the word \"ISA\" but have no idea what it actually means. This course starts from absolute zero." },
]

const faqs: FaqItem[] = [
  { q: 'Do I need a lot of money to open an ISA?',  a: "No. Most platforms let you open a Stocks & Shares ISA or LISA with as little as £1. The point is to start — even a small regular contribution compounds into something meaningful over time." },
  { q: 'Can I have more than one ISA?',             a: "Yes. Since April 2024, you can open and contribute to multiple ISA types in the same tax year. Your total contributions across all ISAs just can't exceed £20,000 per year." },
  { q: 'What happens if I put too much in my ISA?', a: "HMRC will contact you and the excess contribution will need to be corrected. Most platforms have safeguards, but it's worth tracking your contributions across providers if you use more than one." },
  { q: 'Is this course specific to the UK?',        a: 'Yes, entirely. ISAs are a UK-specific tax wrapper. All examples, allowances, providers, and rules covered are UK-specific.' },
]

const related: RelatedCourse[] = [
  { emoji: '🚀', tag: 'Beginner · 8 lessons',      title: 'Investing from Scratch', body: "New to investing? Start here before this course — covers the core concepts you'll need.", href: '/dashboard/courses/investing-from-scratch' },
  { emoji: '📊', tag: 'Intermediate · 10 lessons', title: 'Stocks, ETFs & Funds',   body: 'Know the tax wrapper — now learn what to put inside it.', href: '/dashboard/courses/stocks-etfs-and-funds' },
]

export default function IsasDashboardPage() {
  const router = useRouter()
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set())
  const [loaded,         setLoaded]         = useState(false)
  const [retaking,       setRetaking]       = useState(false)

  const loadCompletions = useCallback(async () => {
    const { data } = await supabase.from('lesson_completions').select('lesson_slug').eq('course_slug', COURSE_SLUG)
    setCompletedSlugs(new Set((data ?? []).map(r => r.lesson_slug)))
    setLoaded(true)
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) { supabase.auth.signOut(); router.replace('/login'); return }
      loadCompletions()
    })
    return () => subscription.unsubscribe()
  }, [router, loadCompletions])

  async function retakeCourse() {
    setRetaking(true)
    await supabase.from('lesson_completions').delete().eq('course_slug', COURSE_SLUG)
    router.push(`/dashboard/courses/${COURSE_SLUG}/lesson-1`)
  }

  const completedCount = completedSlugs.size
  const allDone        = completedCount === TOTAL
  const nextLesson     = lessons.find(l => !completedSlugs.has(l.slug)) ?? lessons[0]
  const ctaHref        = `/dashboard/courses/${COURSE_SLUG}/${nextLesson.slug}`
  const ctaLabel       = completedCount === 0 ? 'Start course' : 'Continue course'

  return (
    <div className="course-page">
      <div className="course-hero">
        <div className="container">
          <div className="course-hero__inner">
            <div className="course-hero__content">
              <div className="course-hero__meta">
                <span className="course-tag">Essentials</span>
                <span className="course-meta-item">📚 6 lessons</span>
                <span className="course-meta-item">⏱ ~90 min</span>
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
            <CourseProgressCard
              emoji="🏦"
              completedCount={completedCount}
              total={TOTAL}
              loaded={loaded}
              allDone={allDone}
              ctaHref={ctaHref}
              ctaLabel={ctaLabel}
              retaking={retaking}
              onRetake={retakeCourse}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-body">
          <div className="course-body__main">
            <CourseOutcomes outcomes={outcomes} />
            <CourseForGrid  cards={forCards} />
            <CourseCurriculum lessons={lessons} totalLabel="6 lessons · all unlocked" courseSlug={COURSE_SLUG} completedSlugs={completedSlugs} />
            <CourseFaq     faqs={faqs} />
            <CourseRelated courses={related} />
          </div>
        </div>
      </div>
    </div>
  )
}
