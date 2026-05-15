import { supabase } from './supabase'
import { availableCourses } from './curriculum'

// ─── Public contract ──────────────────────────────────────────────────────────
// Components depend only on this type and getSuggestedNextStep().
// The underlying strategy can be swapped without touching any component.

export interface NextStepSuggestion {
  type: 'lesson' | 'course_start' | 'simulator' | 'tool'
  title: string
  description: string
  href: string
  ctaLabel: string
  /** Short label shown above the card, e.g. "Up next · Investing from Scratch" */
  context: string
  courseSlug?: string
  lessonSlug?: string
}

// ─── Entry point ─────────────────────────────────────────────────────────────
// Swap ACTIVE_STRATEGY here when the AI logic is ready.
// Everything else stays the same.

export async function getSuggestedNextStep(userId: string): Promise<NextStepSuggestion> {
  return strategySimple(userId)
  // return strategyAI(userId)  // uncomment when ready
}

// ─── Strategy: simple rule-based ─────────────────────────────────────────────
// Walks available courses in order. Returns the first incomplete lesson found.
// Falls back to the simulator once every course is finished.

async function strategySimple(userId: string): Promise<NextStepSuggestion> {
  const { data } = await supabase
    .from('lesson_completions')
    .select('course_slug, lesson_slug')
    .eq('user_id', userId)

  const completions = data ?? []

  for (const course of availableCourses) {
    const slug = course.slug!
    const doneInCourse = completions.filter(r => r.course_slug === slug).length

    if (doneInCourse === 0) {
      return {
        type: 'course_start',
        title: course.title,
        description: `Start with ${course.emoji} ${course.title} — ${course.lessons} lessons, ${course.duration}.`,
        href: `/dashboard/courses/${slug}`,
        ctaLabel: 'Start course',
        context: `New course · ${course.tag}`,
        courseSlug: slug,
      }
    }

    if (doneInCourse < course.lessons) {
      const nextNum    = doneInCourse + 1
      const lessonSlug = `lesson-${nextNum}`
      return {
        type: 'lesson',
        title: `Lesson ${nextNum} of ${course.lessons}`,
        description: `Pick up where you left off in ${course.emoji} ${course.title}.`,
        href: `/dashboard/courses/${slug}/${lessonSlug}`,
        ctaLabel: 'Continue lesson',
        context: `Up next · ${course.title}`,
        courseSlug: slug,
        lessonSlug,
      }
    }
  }

  // All courses complete — nudge toward the simulator
  return {
    type: 'simulator',
    title: 'Try the Stock Simulator',
    description: "You've finished every course. Put your knowledge to work — trade with virtual £10,000.",
    href: '/dashboard/simulator',
    ctaLabel: 'Open simulator',
    context: 'All courses complete',
  }
}

// ─── Strategy: AI (placeholder) ──────────────────────────────────────────────
// Swap in when ready. Must return NextStepSuggestion.
//
// async function strategyAI(userId: string): Promise<NextStepSuggestion> {
//   const habits   = await fetchRecentHabits(userId)
//   const progress = await fetchCourseProgress(userId)
//   const response = await callAI({ habits, progress })
//   return mapAIResponseToSuggestion(response)
// }
