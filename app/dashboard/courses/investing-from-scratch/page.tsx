'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { lessons } from '@/lib/lessons/investing-from-scratch'
import CourseProgressCard from '@/components/CourseOverview/CourseProgressCard'
import CourseCurriculum   from '@/components/CourseOverview/CourseCurriculum'
import CourseOutcomes     from '@/components/CourseOverview/CourseOutcomes'
import CourseFaq          from '@/components/CourseOverview/CourseFaq'
import CourseForGrid      from '@/components/CourseOverview/CourseForGrid'
import CourseRelated      from '@/components/CourseOverview/CourseRelated'
import type { FaqItem, ForCard, RelatedCourse } from '@/components/CourseOverview/types'

const COURSE_SLUG = 'investing-from-scratch'
const TOTAL       = lessons.length

const outcomes = [
  'Understand what investing actually is — in plain, jargon-free English',
  'Know why inflation means saving alone is not enough',
  'Understand the link between risk and return, and what it means for you',
  'See exactly how compound interest grows wealth over time',
  'Know the difference between stocks, bonds, funds and ETFs',
  'Feel genuinely ready to take your first real investing step',
]

const forCards: ForCard[] = [
  { icon: '🧩', title: 'Complete beginners',          body: "You've heard words like \"stocks\" and \"ISA\" but have no idea what they mean. This course is literally designed for you — no assumptions, no jargon." },
  { icon: '💰', title: 'Students with savings',        body: "You've got money sitting in a current account and a vague sense that you should be doing something smarter with it. This course shows you what." },
  { icon: '⏰', title: 'People who keep putting it off', body: "\"I'll sort my finances when I'm older.\" Sound familiar? This course will show you exactly how much that delay costs — and make it easy to start today." },
]

const faqs: FaqItem[] = [
  { q: 'Do I need money to start this course?',              a: "No — this is an education course, not a platform to invest real money. You'll learn everything you need before you spend a single penny." },
  { q: 'I failed maths at school. Is this going to go over my head?', a: 'Absolutely not. This course uses plain English throughout. The only number that matters is compound interest, and we explain it with real examples — not formulas.' },
  { q: 'How much money do I actually need to start investing?', a: "Some UK platforms let you start with as little as £1. This course will help you understand what's right for your situation before you put any money in." },
  { q: 'Is this course specific to the UK?',                 a: 'Yes. All examples, products, platforms and tax rules covered are UK-specific. We focus on ISAs, UK brokers and the UK market.' },
]

const related: RelatedCourse[] = [
  { emoji: '🏦', tag: 'Essentials · 6 lessons', title: 'ISAs & Tax-Free Saving', body: 'Put your knowledge to work — learn how to invest tax-free using your £20,000 annual allowance.', href: '/dashboard/courses/isas-and-tax-free-saving' },
]

export default function InvestingFromScratchDashboardPage() {
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
            <CourseProgressCard
              emoji="🚀"
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
            <CourseCurriculum lessons={lessons} totalLabel="8 lessons · all unlocked" courseSlug={COURSE_SLUG} completedSlugs={completedSlugs} />
            <CourseFaq     faqs={faqs} />
            <CourseRelated title="Up next after this course" courses={related} />
          </div>
        </div>
      </div>
    </div>
  )
}
