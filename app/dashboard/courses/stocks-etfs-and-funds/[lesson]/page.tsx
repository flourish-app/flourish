'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { awardXp, computeLevel, XP } from '@/lib/xp'
import { playXpGain } from '@/lib/sound'
import { getLessonBySlug, getAdjacentLessons, lessons } from '@/lib/lessons/stocks-etfs-and-funds'
import XpToast       from '@/components/Lesson/XpToast'
import LevelUpModal  from '@/components/Lesson/LevelUpModal'
import LessonTopbar  from '@/components/Lesson/LessonTopbar'
import LessonSection from '@/components/Lesson/LessonSection'
import LessonFooter  from '@/components/Lesson/LessonFooter'
import { recordHabit } from '@/lib/habits'

const COURSE_SLUG = 'stocks-etfs-and-funds'
const COURSE_HREF = `/dashboard/courses/${COURSE_SLUG}`
const TOTAL       = lessons.length

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const slug   = params.lesson as string

  const [scrollPct,      setScrollPct]      = useState(0)
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set())
  const [earnedQuizRefs, setEarnedQuizRefs] = useState<Set<string>>(new Set())
  const [completing,     setCompleting]     = useState(false)
  const [xpToast,        setXpToast]        = useState<{ amount: number; key: number } | null>(null)
  const [levelUp,        setLevelUp]        = useState<{ level: number; title: string } | null>(null)
  const toastTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sessionUserIdRef = useRef<string | null>(null)

  function showXpToast(amount: number) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setXpToast({ amount, key: Date.now() })
    toastTimerRef.current = setTimeout(() => setXpToast(null), 2000)
  }

  async function handleAwardXp(eventType: string, referenceId: string, xpAmount: number, prevXp: number) {
    const userId = sessionUserIdRef.current
    if (!userId) return
    const awarded = await awardXp(userId, eventType, referenceId, xpAmount)
    if (awarded > 0) {
      playXpGain()
      showXpToast(awarded)
      if (eventType === 'quiz_first_try') setEarnedQuizRefs(prev => new Set(prev).add(referenceId))
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
    if (xpData)         setEarnedQuizRefs(new Set(xpData.map(r => r.reference_id)))
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) { supabase.auth.signOut(); router.replace('/login'); return }
      sessionUserIdRef.current = session.user.id
      loadCompletions()
    })
    return () => { subscription.unsubscribe(); if (toastTimerRef.current) clearTimeout(toastTimerRef.current) }
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
    const { data: profileData } = await supabase.from('profiles').select('total_xp').eq('id', session.user.id).single()
    const prevXp = profileData?.total_xp ?? 0
    await supabase.from('lesson_completions').upsert(
      { user_id: session.user.id, course_slug: COURSE_SLUG, lesson_slug: slug },
      { onConflict: 'user_id,course_slug,lesson_slug' }
    )
    await handleAwardXp('lesson_complete', `${COURSE_SLUG}:${slug}`, XP.LESSON_COMPLETE, prevXp)
    if (!next) await handleAwardXp('course_complete', COURSE_SLUG, XP.COURSE_COMPLETE, prevXp + XP.LESSON_COMPLETE)
    await recordHabit('lesson_finish', { course_slug: COURSE_SLUG, lesson_slug: slug })
    if (!next) await recordHabit('course_complete', { course_slug: COURSE_SLUG })
    if (next) router.push(`${COURSE_HREF}/${next.slug}`)
    else      router.push(COURSE_HREF)
  }

  return (
    <div className="lesson-page">
      {xpToast && <XpToast key={xpToast.key} amount={xpToast.amount} />}
      {levelUp  && <LevelUpModal level={levelUp.level} title={levelUp.title} onClose={() => setLevelUp(null)} />}
      <div className="lesson-progress-bar" style={{ width: `${scrollPct}%` }} />
      <LessonTopbar
        courseHref={COURSE_HREF}
        courseName="Stocks, ETFs &amp; Funds"
        lessonNum={lesson.num}
        total={TOTAL}
        lessons={lessons}
        completedSlugs={completedSlugs}
      />
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
                section={section as any}
                xpAlreadyEarned={earnedQuizRefs.has(`${COURSE_SLUG}:${slug}:${i}`)}
                onQuizFirstTry={async () => {
                  const { data: { session } } = await supabase.auth.getSession()
                  if (!session) return
                  const { data: profileData } = await supabase.from('profiles').select('total_xp').eq('id', session.user.id).single()
                  const prevXp = profileData?.total_xp ?? 0
                  await handleAwardXp('quiz_first_try', `${COURSE_SLUG}:${slug}:${i}`, XP.QUIZ_FIRST_TRY, prevXp)
                }}
              />
            ))}
          </div>
          <LessonFooter
            keyTakeaways={lesson.keyTakeaways}
            isCompleted={isCompleted}
            completing={completing}
            hasNext={!!next}
            onMarkComplete={markComplete}
            prev={prev}
            next={next}
            courseHref={COURSE_HREF}
          />
        </div>
      </div>
    </div>
  )
}
