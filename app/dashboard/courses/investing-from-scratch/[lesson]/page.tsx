'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { awardXp, computeLevel, XP } from '@/lib/xp'
import { playXpGain, playCorrectAnswer } from '@/lib/sound'
import {
  getLessonBySlug,
  getAdjacentLessons,
  lessons,
} from '@/lib/lessons/investing-from-scratch'
import type { Section, QuizCheckpoint, ConfidenceCheckpoint, ReflectionCheckpoint } from '@/lib/lessons/investing-from-scratch'

const COURSE_SLUG = 'investing-from-scratch'
const COURSE_HREF = `/dashboard/courses/${COURSE_SLUG}`
const TOTAL = lessons.length

// ── XP Toast ──────────────────────────────────────────────────────────────

function XpToast({ amount }: { amount: number }) {
  return <div className="xp-toast">+{amount} XP</div>
}

// ── Level-up Modal ─────────────────────────────────────────────────────────

function LevelUpModal({ level, title, onClose }: { level: number; title: string; onClose: () => void }) {
  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="level-up-modal__badge">Lv.{level}</div>
        <h2 className="level-up-modal__heading">Level up!</h2>
        <p className="level-up-modal__title">{title}</p>
        <button className="btn btn--primary btn--sm" onClick={onClose}>Keep going</button>
      </div>
    </div>
  )
}

// ── Checkpoint components ──────────────────────────────────────────────────

function Quiz({
  checkpoint,
  xpAlreadyEarned,
  onFirstTryCorrect,
}: {
  checkpoint: QuizCheckpoint
  xpAlreadyEarned: boolean
  onFirstTryCorrect?: () => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const answered = chosen !== null

  function handleChoice(i: number) {
    if (answered) return
    setChosen(i)
    if (checkpoint.options[i].correct) {
      playCorrectAnswer()
      if (!xpAlreadyEarned) onFirstTryCorrect?.()
    }
  }

  return (
    <div className="checkpoint checkpoint--quiz">
      <div className="checkpoint__tag">
        Quick check
        {xpAlreadyEarned && <span className="checkpoint__xp-earned">XP earned</span>}
      </div>
      <p className="checkpoint__question">{checkpoint.question}</p>
      <div className="checkpoint__options">
        {checkpoint.options.map((opt, i) => {
          let cls = 'checkpoint__option'
          if (answered) {
            if (opt.correct) cls += ' checkpoint__option--correct'
            else if (i === chosen) cls += ' checkpoint__option--wrong'
            else cls += ' checkpoint__option--dim'
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => handleChoice(i)}>
              {opt.text}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`checkpoint__feedback checkpoint__feedback--${checkpoint.options[chosen!].correct ? 'correct' : 'nudge'}`}>
          {checkpoint.options[chosen!].correct ? '✓ Exactly.' : 'Not quite —'} {checkpoint.explanation}
        </div>
      )}
    </div>
  )
}

function Confidence({ checkpoint }: { checkpoint: ConfidenceCheckpoint }) {
  const [chosen, setChosen] = useState<string | null>(null)

  return (
    <div className="checkpoint checkpoint--confidence">
      <div className="checkpoint__tag">Check in</div>
      <p className="checkpoint__question">{checkpoint.prompt}</p>
      <div className="checkpoint__confidence-options">
        {[
          { key: 'fuzzy', label: 'Still fuzzy 🤔' },
          { key: 'getting', label: 'Getting it 🙂' },
          { key: 'got', label: 'Got it! 💪' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`checkpoint__confidence-btn${chosen === key ? ' checkpoint__confidence-btn--selected' : ''}`}
            onClick={() => setChosen(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {chosen === 'fuzzy' && checkpoint.fuzzyNote && (
        <p className="checkpoint__fuzzy-note">{checkpoint.fuzzyNote}</p>
      )}
      {chosen && chosen !== 'fuzzy' && (
        <p className="checkpoint__encouragement">
          {chosen === 'got' ? 'Love to hear it — keep going.' : 'That\'s all you need. Keep going.'}
        </p>
      )}
    </div>
  )
}

function Reflection({ checkpoint }: { checkpoint: ReflectionCheckpoint }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="checkpoint checkpoint--reflection">
      <div className="checkpoint__tag">Think about it</div>
      <p className="checkpoint__question">{checkpoint.prompt}</p>
      {!revealed ? (
        <button className="checkpoint__reveal-btn" onClick={() => setRevealed(true)}>
          Reveal answer
        </button>
      ) : (
        <div className="checkpoint__reveal">{checkpoint.reveal}</div>
      )}
    </div>
  )
}

// ── Section renderer ───────────────────────────────────────────────────────

function LessonSection({
  section,
  xpAlreadyEarned,
  onQuizFirstTry,
}: {
  section: Section
  xpAlreadyEarned: boolean
  onQuizFirstTry?: () => void
}) {
  return (
    <div className="lesson-section">
      {section.heading && <h2 className="lesson-section__heading">{section.heading}</h2>}
      {section.paragraphs.map((p, i) => (
        <p key={i} className="lesson-section__p">{p}</p>
      ))}
      {section.list && (
        <ul className="lesson-section__list">
          {section.list.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
      {section.callout && (
        <div className={`lesson-callout lesson-callout--${section.callout.type}`}>
          <div className="lesson-callout__label">
            {section.callout.type === 'key' ? '🔑 Key point'
              : section.callout.type === 'tip' ? '💡 Tip'
              : '📌 Example'}
          </div>
          <p className="lesson-callout__text">{section.callout.text}</p>
        </div>
      )}
      {section.checkpoint && (() => {
        const cp = section.checkpoint!
        if (cp.type === 'quiz') return <Quiz checkpoint={cp} xpAlreadyEarned={xpAlreadyEarned} onFirstTryCorrect={onQuizFirstTry} />
        if (cp.type === 'confidence') return <Confidence checkpoint={cp} />
        if (cp.type === 'reflection') return <Reflection checkpoint={cp} />
        return null
      })()}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.lesson as string

  const [scrollPct, setScrollPct] = useState(0)
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set())
  const [earnedQuizRefs, setEarnedQuizRefs] = useState<Set<string>>(new Set())
  const [completing, setCompleting] = useState(false)
  const [xpToast, setXpToast] = useState<{ amount: number; key: number } | null>(null)
  const [levelUp, setLevelUp] = useState<{ level: number; title: string } | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sessionUserIdRef = useRef<string | null>(null)

  function showXpToast(amount: number) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setXpToast({ amount, key: Date.now() })
    toastTimerRef.current = setTimeout(() => setXpToast(null), 2000)
  }

  async function handleAwardXp(
    eventType: string,
    referenceId: string,
    xpAmount: number,
    prevXp: number,
  ) {
    const userId = sessionUserIdRef.current
    if (!userId) return
    const awarded = await awardXp(userId, eventType, referenceId, xpAmount)
    if (awarded > 0) {
      playXpGain()
      showXpToast(awarded)
      if (eventType === 'quiz_first_try') {
        setEarnedQuizRefs(prev => new Set(prev).add(referenceId))
      }
      const oldLevel = computeLevel(prevXp).level
      const newLevel = computeLevel(prevXp + awarded)
      if (newLevel.level > oldLevel) setLevelUp({ level: newLevel.level, title: newLevel.title })
    }
  }

  const loadCompletions = useCallback(async () => {
    const [{ data: completionData }, { data: xpData }] = await Promise.all([
      supabase.from('lesson_completions').select('lesson_slug').eq('course_slug', COURSE_SLUG),
      supabase.from('xp_events').select('reference_id').eq('event_type', 'quiz_first_try').like('reference_id', `${COURSE_SLUG}:%`),
    ])
    if (completionData) setCompletedSlugs(new Set(completionData.map(r => r.lesson_slug)))
    if (xpData) setEarnedQuizRefs(new Set(xpData.map(r => r.reference_id)))
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
      sessionUserIdRef.current = session.user.id
      loadCompletions()
    })
    return () => {
      subscription.unsubscribe()
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [router, loadCompletions])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setScrollPct(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lesson = getLessonBySlug(slug)
  const { prev, next } = lesson ? getAdjacentLessons(slug) : { prev: null, next: null }

  if (!lesson) {
    return (
      <div className="lesson-not-found">
        <p>Lesson not found.</p>
        <Link href={COURSE_HREF}>← Back to course</Link>
      </div>
    )
  }

  const isCompleted = completedSlugs.has(slug)

  async function markComplete() {
    setCompleting(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setCompleting(false); return }

    const { data: profileData } = await supabase
      .from('profiles').select('total_xp').eq('id', session.user.id).single()
    const prevXp = profileData?.total_xp ?? 0

    await supabase.from('lesson_completions').upsert(
      { user_id: session.user.id, course_slug: COURSE_SLUG, lesson_slug: slug },
      { onConflict: 'user_id,course_slug,lesson_slug' }
    )

    await handleAwardXp('lesson_complete', `${COURSE_SLUG}:${slug}`, XP.LESSON_COMPLETE, prevXp)

    if (!next) {
      await handleAwardXp('course_complete', COURSE_SLUG, XP.COURSE_COMPLETE, prevXp + XP.LESSON_COMPLETE)
    }

    if (next) {
      router.push(`${COURSE_HREF}/${next.slug}`)
    } else {
      router.push(COURSE_HREF)
    }
  }

  return (
    <div className="lesson-page">

      {xpToast && <XpToast key={xpToast.key} amount={xpToast.amount} />}
      {levelUp && (
        <LevelUpModal
          level={levelUp.level}
          title={levelUp.title}
          onClose={() => setLevelUp(null)}
        />
      )}

      {/* Scroll progress */}
      <div className="lesson-progress-bar" style={{ width: `${scrollPct}%` }} />

      {/* Top bar */}
      <div className="lesson-topbar">
        <div className="container">
          <div className="lesson-topbar__inner">
            <Link href={COURSE_HREF} className="lesson-topbar__back">
              ← Investing from Scratch
            </Link>
            <div className="lesson-topbar__breadcrumb">Lesson {lesson.num} of {TOTAL}</div>
            <div className="lesson-topbar__dots">
              {lessons.map((l) => {
                const done = completedSlugs.has(l.slug)
                const active = l.num === lesson.num
                let cls = 'lesson-dot'
                if (active) cls += ' lesson-dot--active'
                else if (done) cls += ' lesson-dot--done'
                return (
                  <Link key={l.num} href={`${COURSE_HREF}/${l.slug}`} className={cls} title={l.title} />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="container">
        <div className="lesson-article">

          <div className="lesson-header">
            <div className="lesson-header__meta">
              <span className="lesson-header__num">Lesson {lesson.num}</span>
              <span className="lesson-header__duration">{lesson.duration} read</span>
              {isCompleted && <span className="lesson-header__done">✓ Completed</span>}
            </div>
            <h1 className="lesson-header__title">{lesson.title}</h1>
            <p className="lesson-header__intro">{lesson.intro}</p>
          </div>

          <div className="lesson-content">
            {lesson.sections.map((section, i) => (
              <LessonSection
                key={i}
                section={section}
                xpAlreadyEarned={earnedQuizRefs.has(`${COURSE_SLUG}:${slug}:${i}`)}
                onQuizFirstTry={async () => {
                  const { data: { session } } = await supabase.auth.getSession()
                  if (!session) return
                  const { data: profileData } = await supabase
                    .from('profiles').select('total_xp').eq('id', session.user.id).single()
                  const prevXp = profileData?.total_xp ?? 0
                  await handleAwardXp('quiz_first_try', `${COURSE_SLUG}:${slug}:${i}`, XP.QUIZ_FIRST_TRY, prevXp)
                }}
              />
            ))}
          </div>

          <div className="lesson-takeaways">
            <div className="lesson-takeaways__heading">Key takeaways</div>
            <ul className="lesson-takeaways__list">
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i}>
                  <span className="lesson-takeaways__tick">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Completion CTA */}
          <div className="lesson-complete-cta">
            {isCompleted ? (
              <div className="lesson-complete-cta__done">
                ✓ You&apos;ve completed this lesson
              </div>
            ) : (
              <button
                className="lesson-complete-cta__btn btn btn--primary btn--lg"
                onClick={markComplete}
                disabled={completing}
              >
                {completing
                  ? 'Saving...'
                  : next
                  ? 'Mark as complete & next lesson →'
                  : 'Complete course →'}
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="lesson-nav">
            <div className="lesson-nav__prev">
              {prev && (
                <Link href={`${COURSE_HREF}/${prev.slug}`} className="lesson-nav__link lesson-nav__link--prev">
                  <span className="lesson-nav__arrow">←</span>
                  <span>
                    <span className="lesson-nav__label">Previous</span>
                    <span className="lesson-nav__title">{prev.title}</span>
                  </span>
                </Link>
              )}
            </div>
            <div className="lesson-nav__next">
              {next ? (
                <Link href={`${COURSE_HREF}/${next.slug}`} className="lesson-nav__link lesson-nav__link--next">
                  <span>
                    <span className="lesson-nav__label">Skip to next</span>
                    <span className="lesson-nav__title">{next.title}</span>
                  </span>
                  <span className="lesson-nav__arrow">→</span>
                </Link>
              ) : (
                <Link href={COURSE_HREF} className="lesson-nav__link lesson-nav__link--prev">
                  <span className="lesson-nav__arrow">←</span>
                  <span>
                    <span className="lesson-nav__label">Back to</span>
                    <span className="lesson-nav__title">Course overview</span>
                  </span>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
