'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { lessons } from '@/lib/lessons/investing-from-scratch'

const COURSE_SLUG = 'investing-from-scratch'
const TOTAL = lessons.length

const outcomes = [
  'Understand what investing actually is — in plain, jargon-free English',
  'Know why inflation means saving alone is not enough',
  'Understand the link between risk and return, and what it means for you',
  'See exactly how compound interest grows wealth over time',
  'Know the difference between stocks, bonds, funds and ETFs',
  'Feel genuinely ready to take your first real investing step',
]

const faqs = [
  {
    q: 'Do I need money to start this course?',
    a: 'No — this is an education course, not a platform to invest real money. You\'ll learn everything you need before you spend a single penny.',
  },
  {
    q: 'I failed maths at school. Is this going to go over my head?',
    a: 'Absolutely not. This course uses plain English throughout. The only number that matters is compound interest, and we explain it with real examples — not formulas.',
  },
  {
    q: 'How much money do I actually need to start investing?',
    a: 'Some UK platforms let you start with as little as £1. This course will help you understand what\'s right for your situation before you put any money in.',
  },
  {
    q: 'Is this course specific to the UK?',
    a: 'Yes. All examples, products, platforms and tax rules covered are UK-specific. We focus on ISAs, UK brokers and the UK market.',
  },
]

export default function InvestingFromScratchDashboardPage() {
  const router = useRouter()
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)
  const [retaking, setRetaking] = useState(false)

  const loadCompletions = useCallback(async () => {
    const { data } = await supabase
      .from('lesson_completions')
      .select('lesson_slug')
      .eq('course_slug', COURSE_SLUG)
    setCompletedSlugs(new Set((data ?? []).map(r => r.lesson_slug)))
    setLoaded(true)
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        supabase.auth.signOut()
        router.replace('/login')
        return
      }
      loadCompletions()
    })
    return () => subscription.unsubscribe()
  }, [router, loadCompletions])

  async function retakeCourse() {
    setRetaking(true)
    await supabase
      .from('lesson_completions')
      .delete()
      .eq('course_slug', COURSE_SLUG)
    router.push(`/dashboard/courses/${COURSE_SLUG}/lesson-1`)
  }

  const completedCount = completedSlugs.size
  const allDone = completedCount === TOTAL
  const fillPct = TOTAL > 0 ? Math.round((completedCount / TOTAL) * 100) : 0

  // First lesson that hasn't been completed yet
  const nextLesson = lessons.find(l => !completedSlugs.has(l.slug)) ?? lessons[0]

  const ctaHref = `/dashboard/courses/${COURSE_SLUG}/${nextLesson.slug}`
  const ctaLabel = completedCount === 0 ? 'Start course' : 'Continue course'

  return (
    <div className="course-page">

      {/* ── Hero ── */}
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

            {/* Progress card */}
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">🚀</div>
              <div className="course-signup-card__progress">
                <div className="course-signup-card__progress-label">
                  <span>Your progress</span>
                  <span>{loaded ? `${completedCount} / ${TOTAL} lessons` : `— / ${TOTAL} lessons`}</span>
                </div>
                <div className="course-signup-card__progress-bar">
                  <div
                    className="course-signup-card__progress-fill"
                    style={{ width: loaded ? `${fillPct}%` : '0%' }}
                  />
                </div>
              </div>

              {allDone ? (
                <button
                  className="btn btn--outline btn--lg course-signup-card__cta"
                  onClick={retakeCourse}
                  disabled={retaking}
                >
                  {retaking ? 'Resetting...' : 'Retake course'}
                </button>
              ) : (
                <Link
                  href={ctaHref}
                  className="btn btn--primary btn--lg course-signup-card__cta"
                >
                  {ctaLabel}
                </Link>
              )}

              <ul className="course-signup-card__perks">
                <li>✓ All lessons unlocked</li>
                <li>✓ Learn at your own pace</li>
                <li>✓ Progress saved automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">
        <div className="course-body">
          <div className="course-body__main">

            {/* What you'll learn */}
            <div className="course-section">
              <h2 className="course-section__title">What you&apos;ll learn</h2>
              <ul className="course-outcomes">
                {outcomes.map((o) => (
                  <li key={o} className="course-outcome">
                    <span className="course-outcome__tick">✓</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div className="course-section">
              <h2 className="course-section__title">Who this is for</h2>
              <div className="course-for-grid">
                {[
                  {
                    icon: '🧩',
                    title: 'Complete beginners',
                    body: 'You\'ve heard words like "stocks" and "ISA" but have no idea what they mean. This course is literally designed for you — no assumptions, no jargon.',
                  },
                  {
                    icon: '💰',
                    title: 'Students with savings',
                    body: 'You\'ve got money sitting in a current account and a vague sense that you should be doing something smarter with it. This course shows you what.',
                  },
                  {
                    icon: '⏰',
                    title: 'People who keep putting it off',
                    body: '"I\'ll sort my finances when I\'m older." Sound familiar? This course will show you exactly how much that delay costs — and make it easy to start today.',
                  },
                ].map((c) => (
                  <div className="course-for-card" key={c.title}>
                    <div className="course-for-card__icon">{c.icon}</div>
                    <div className="course-for-card__title">{c.title}</div>
                    <p className="course-for-card__body">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="course-section">
              <h2 className="course-section__title">Course curriculum</h2>
              <p className="course-section__sub">8 lessons · all unlocked</p>
              <div className="course-curriculum">
                {lessons.map((lesson) => {
                  const done = completedSlugs.has(lesson.slug)
                  return (
                    <Link
                      key={lesson.num}
                      href={`/dashboard/courses/${COURSE_SLUG}/${lesson.slug}`}
                      className={`course-lesson course-lesson--free${done ? ' course-lesson--completed' : ''}`}
                    >
                      <div className="course-lesson__num">
                        {done ? <span className="course-lesson__check">✓</span> : lesson.num}
                      </div>
                      <div className="course-lesson__info">
                        <div className="course-lesson__title">{lesson.title}</div>
                        <div className="course-lesson__duration">{lesson.duration} read</div>
                      </div>
                      <div className="course-lesson__status">
                        <span className="course-lesson__preview">
                          {done ? 'Review' : 'Start →'}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* FAQ */}
            <div className="course-section">
              <h2 className="course-section__title">Common questions</h2>
              <div className="course-faq">
                {faqs.map((faq) => (
                  <div className="course-faq__item" key={faq.q}>
                    <div className="course-faq__q">{faq.q}</div>
                    <p className="course-faq__a">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related courses */}
            <div className="course-section">
              <h2 className="course-section__title">Up next after this course</h2>
              <div className="course-related">
                <Link href="/dashboard/courses/isas-and-tax-free-saving" className="course-related-card">
                  <div className="course-related-card__emoji">🏦</div>
                  <div>
                    <div className="course-related-card__tag">Essentials · 6 lessons</div>
                    <div className="course-related-card__title">ISAs &amp; Tax-Free Saving</div>
                    <p className="course-related-card__body">Put your knowledge to work — learn how to invest tax-free using your £20,000 annual allowance.</p>
                  </div>
                  <div className="course-related-card__arrow">→</div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
