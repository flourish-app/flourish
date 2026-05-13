'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { lessons } from '@/lib/lessons/stocks-etfs-and-funds'
import CourseProgressCard from '@/components/CourseOverview/CourseProgressCard'
import CourseCurriculum   from '@/components/CourseOverview/CourseCurriculum'
import CourseOutcomes     from '@/components/CourseOverview/CourseOutcomes'
import CourseFaq          from '@/components/CourseOverview/CourseFaq'
import CourseForGrid      from '@/components/CourseOverview/CourseForGrid'
import CourseRelated      from '@/components/CourseOverview/CourseRelated'
import type { FaqItem, ForCard, RelatedCourse } from '@/components/CourseOverview/types'

const COURSE_SLUG = 'stocks-etfs-and-funds'
const TOTAL       = lessons.length

const outcomes = [
  'Understand what a stock is and how stock markets actually work',
  'Know the difference between stocks, funds, index funds and ETFs',
  "Understand active vs passive investing — and what decades of evidence shows",
  "Know how to assess a fund's costs and what numbers to look for",
  'Understand diversification and why it reduces your risk',
  'Be ready to build a simple, low-cost portfolio that suits your situation',
]

const forCards: ForCard[] = [
  { icon: '🎓', title: 'Post-beginner investors',       body: "You understand the basics — compound interest, risk, ISAs — and are ready to go deeper into the actual investment vehicles available to you." },
  { icon: '🏦', title: 'ISA holders unsure what to buy', body: "You've opened a Stocks & Shares ISA but don't know what to actually put inside it. This course answers exactly that question." },
  { icon: '📰', title: 'Curious about the news',         body: 'You hear terms like "the FTSE 100 fell today" or "index fund" and want to actually understand what they mean — not just nod along.' },
]

const faqs: FaqItem[] = [
  { q: 'Should I buy individual stocks or funds?',            a: "For most beginners, funds — especially index funds — are the smarter starting point. Picking individual stocks requires significant research and carries more risk. This course walks you through the evidence on both approaches so you can decide for yourself." },
  { q: "What's the difference between an ETF and an index fund?", a: "They're closely related — most index funds are available as ETFs. The main difference is how you buy them: ETFs trade on the stock market like shares, while index funds are typically bought directly from a fund provider. Lesson 5 covers this in full." },
  { q: 'Do I need to have completed "Investing from Scratch" first?', a: "It's strongly recommended. This course is pitched at intermediate level and assumes you already understand basic concepts like risk, return and compound interest. If those terms are unfamiliar, start with Investing from Scratch first." },
  { q: 'How do I actually choose which fund to invest in?',   a: "Lessons 8 and 9 cover exactly this — how to read a fund factsheet, what the key metrics mean, and how to compare costs. By the end of the course you'll know what to look for." },
]

const related: RelatedCourse[] = [
  { emoji: '🚀', tag: 'Beginner · 8 lessons · Prerequisite', title: 'Investing from Scratch', body: "New to investing? Start here before this course — covers the core concepts you'll need.", href: '/dashboard/courses/investing-from-scratch' },
  { emoji: '🏦', tag: 'Essentials · 6 lessons',              title: 'ISAs & Tax-Free Saving', body: 'Know what to buy — now learn the best tax-efficient wrapper to put it in.',              href: '/dashboard/courses/isas-and-tax-free-saving' },
]

export default function StocksEtfsDashboardPage() {
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
                <span className="course-tag">Intermediate</span>
                <span className="course-meta-item">📚 10 lessons</span>
                <span className="course-meta-item">⏱ ~90 mins</span>
                <span className="course-meta-item">📈 Some basics helpful</span>
              </div>
              <h1 className="course-hero__headline">Stocks, ETFs &amp; Funds</h1>
              <p className="course-hero__sub">
                Most people have heard of stocks and funds but couldn&apos;t tell you the difference. This course changes that — covering everything from how markets actually work to building your first real portfolio.
              </p>
              <div className="course-hero__badges">
                <span className="course-badge course-badge--green">Free forever</span>
                <span className="course-badge course-badge--grey">UK-specific</span>
                <span className="course-badge course-badge--grey">Recommends: Investing from Scratch</span>
              </div>
              <div className="course-prereq">
                <span className="course-prereq__icon">💡</span>
                <p>
                  New to investing? We recommend starting with{' '}
                  <Link href="/dashboard/courses/investing-from-scratch">Investing from Scratch</Link>{' '}
                  before this course.
                </p>
              </div>
            </div>
            <CourseProgressCard
              emoji="📊"
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
            <CourseCurriculum lessons={lessons} totalLabel="10 lessons · all unlocked" courseSlug={COURSE_SLUG} completedSlugs={completedSlugs} />
            <CourseFaq     faqs={faqs} />
            <CourseRelated title="Related courses" courses={related} />
          </div>
        </div>
      </div>
    </div>
  )
}
