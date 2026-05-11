'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { lessons } from '@/lib/lessons/isas-and-tax-free-saving'

const COURSE_SLUG = 'isas-and-tax-free-saving'
const TOTAL = lessons.length

const outcomes = [
  'Understand what an ISA is and why it beats a standard savings account',
  'Know the difference between a Cash ISA, Stocks & Shares ISA, and Lifetime ISA',
  'Make the most of your £20,000 annual tax-free allowance',
  'Understand how the LISA government bonus works — and the rules around it',
  'Choose the right ISA for your age, income, and goals',
  'Open your first ISA with confidence on an FCA-regulated platform',
]

const faqs = [
  {
    q: 'Do I need a lot of money to open an ISA?',
    a: 'No. Most platforms let you open a Stocks & Shares ISA or LISA with as little as £1. The point is to start — even a small regular contribution compounds into something meaningful over time.',
  },
  {
    q: 'Can I have more than one ISA?',
    a: 'Yes. Since April 2024, you can open and contribute to multiple ISA types in the same tax year. Your total contributions across all ISAs just can\'t exceed £20,000 per year.',
  },
  {
    q: 'What happens if I put too much in my ISA?',
    a: 'HMRC will contact you and the excess contribution will need to be corrected. Most platforms have safeguards, but it\'s worth tracking your contributions across providers if you use more than one.',
  },
  {
    q: 'Is this course specific to the UK?',
    a: 'Yes, entirely. ISAs are a UK-specific tax wrapper. All examples, allowances, providers, and rules covered are UK-specific.',
  },
]

export default function IsasDashboardPage() {
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

            {/* Progress card */}
            <div className="course-signup-card">
              <div className="course-signup-card__emoji">🏦</div>
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
                    icon: '🎓',
                    title: 'University students',
                    body: 'You\'re earning or receiving a student loan and want to start putting money to work — even if it\'s just £20 a month.',
                  },
                  {
                    icon: '🏠',
                    title: 'First-time buyers',
                    body: 'You\'re saving for a property and want to understand the Lifetime ISA\'s 25% government bonus before you miss out.',
                  },
                  {
                    icon: '🧩',
                    title: 'Complete beginners',
                    body: 'You\'ve heard the word "ISA" but have no idea what it actually means. This course starts from absolute zero.',
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
              <p className="course-section__sub">6 lessons · all unlocked</p>
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
              <h2 className="course-section__title">Related courses</h2>
              <div className="course-related">
                <Link href="/dashboard/courses/investing-from-scratch" className="course-related-card">
                  <div className="course-related-card__emoji">🚀</div>
                  <div>
                    <div className="course-related-card__tag">Beginner · 8 lessons</div>
                    <div className="course-related-card__title">Investing from Scratch</div>
                    <p className="course-related-card__body">New to investing? Start here before this course — covers the core concepts you&apos;ll need.</p>
                  </div>
                  <div className="course-related-card__arrow">→</div>
                </Link>
                <Link href="/dashboard/courses/stocks-etfs-and-funds" className="course-related-card">
                  <div className="course-related-card__emoji">📊</div>
                  <div>
                    <div className="course-related-card__tag">Intermediate · 10 lessons</div>
                    <div className="course-related-card__title">Stocks, ETFs &amp; Funds</div>
                    <p className="course-related-card__body">Know the tax wrapper — now learn what to put inside it.</p>
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
