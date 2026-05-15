// ─── Course registry ────────────────────────────────────────────────────────
// Single source of truth for all course metadata.
// Add a new entry here when launching a new course; all listing pages derive
// from this array automatically.

export type CourseStatus = 'available' | 'coming-soon'

export interface CourseEntry {
  /** URL-safe slug; only set for 'available' courses */
  slug?: string
  emoji: string
  /** Level/type label, e.g. 'Beginner', 'Intermediate' */
  tag: string
  tagStyle?: 'featured' | 'default'
  /** Optional badge, e.g. 'Most popular' */
  badge?: string
  title: string
  body: string
  lessons: number
  duration: string
  status: CourseStatus
}

export const courses: CourseEntry[] = [
  {
    slug: 'investing-from-scratch',
    emoji: '🚀',
    tag: 'Beginner',
    tagStyle: 'featured',
    badge: 'Most popular',
    title: 'Investing from Scratch',
    body: "The complete beginner's guide. What investing actually is, why it beats savings accounts, and how to start with as little as £1.",
    lessons: 8,
    duration: '~65 mins',
    status: 'available',
  },
  {
    slug: 'isas-and-tax-free-saving',
    emoji: '🏦',
    tag: 'Essentials',
    tagStyle: 'default',
    title: 'ISAs & Tax-Free Saving',
    body: 'Cash ISA, Stocks & Shares ISA, Lifetime ISA — know the difference and make the most of your £20,000 annual tax-free allowance.',
    lessons: 6,
    duration: '~50 mins',
    status: 'available',
  },
  {
    slug: 'stocks-etfs-and-funds',
    emoji: '📊',
    tag: 'Intermediate',
    tagStyle: 'default',
    title: 'Stocks, ETFs & Funds',
    body: 'Understand the difference between individual stocks, index funds, and ETFs — and how to build a simple low-cost portfolio.',
    lessons: 10,
    duration: '~90 mins',
    status: 'available',
  },
  {
    slug: 'pensions-and-your-future',
    emoji: '🔮',
    tag: 'Long-term',
    tagStyle: 'default',
    title: 'Pensions & Your Future',
    body: 'Why pensions matter even at 19, how workplace auto-enrolment works, and why time is your greatest financial asset.',
    lessons: 5,
    duration: '~55 mins',
    status: 'available',
  },
  {
    emoji: '🧮',
    tag: 'Practical',
    title: 'Budgeting on a Student Income',
    body: "Turn your maintenance loan into a foundation. Saving strategies that actually work when you're living off £800 a month.",
    lessons: 7,
    duration: '~2 hrs',
    status: 'coming-soon',
  },
  {
    emoji: '🌍',
    tag: 'Advanced',
    title: 'Understanding Markets',
    body: 'How global markets move, what inflation means for your money, and how to think about economic cycles without panicking.',
    lessons: 9,
    duration: '~2.5 hrs',
    status: 'coming-soon',
  },
]

export const availableCourses  = courses.filter(c => c.status === 'available')
export const comingSoonCourses = courses.filter(c => c.status === 'coming-soon')

/** Total lesson count across all courses (available + coming-soon). */
export const totalLessons = courses.reduce((sum, c) => sum + c.lessons, 0)

// ─── Lesson tags ─────────────────────────────────────────────────────────────

export type LessonTag =
  | 'ISAs'
  | 'ETFs'
  | 'Equities'
  | 'Bonds'
  | 'Pensions'
  | 'Tax'
  | 'Compound Interest'
  | 'Diversification'
  | 'Fundamentals'

export interface CurriculumLesson {
  lessonId: string
  title: string
  tags: LessonTag[]
  dependencies: string[]
  estimatedMinutes: number
  free: boolean
  /** Links to an existing dashboard course route, e.g. 'investing-from-scratch' */
  courseSlug?: string
}

export interface CurriculumMap {
  version: string
  lessons: CurriculumLesson[]
}

export const curriculumMap: CurriculumMap = {
  version: '1.0.0',
  lessons: [
    {
      lessonId: 'investing-fundamentals',
      title: "What Is Investing? A UK Beginner's Guide",
      tags: ['Fundamentals'],
      dependencies: [],
      estimatedMinutes: 8,
      free: true,
      courseSlug: 'investing-from-scratch',
    },
    {
      lessonId: 'compound-interest',
      title: 'The Power of Compound Interest',
      tags: ['Compound Interest', 'Fundamentals'],
      dependencies: ['investing-fundamentals'],
      estimatedMinutes: 10,
      free: true,
      courseSlug: 'investing-from-scratch',
    },
    {
      lessonId: 'isa-basics',
      title: 'ISAs Explained: Cash, Stocks & Shares, and Lifetime ISAs',
      tags: ['ISAs', 'Tax'],
      dependencies: ['investing-fundamentals'],
      estimatedMinutes: 12,
      free: true,
      courseSlug: 'isas-and-tax-free-saving',
    },
    {
      lessonId: 'etf-introduction',
      title: 'What Are ETFs and Why Do Investors Love Them?',
      tags: ['ETFs', 'Diversification'],
      dependencies: ['investing-fundamentals', 'compound-interest'],
      estimatedMinutes: 12,
      free: false,
      courseSlug: 'stocks-etfs-and-funds',
    },
    {
      lessonId: 'uk-equities',
      title: 'Buying UK Shares: The London Stock Exchange and Beyond',
      tags: ['Equities'],
      dependencies: ['investing-fundamentals', 'compound-interest'],
      estimatedMinutes: 15,
      free: false,
      courseSlug: 'stocks-etfs-and-funds',
    },
    {
      lessonId: 'diversification',
      title: "Don't Put All Your Eggs in One Basket: Portfolio Diversification",
      tags: ['Diversification', 'Equities', 'ETFs'],
      dependencies: ['etf-introduction', 'uk-equities'],
      estimatedMinutes: 10,
      free: false,
      courseSlug: 'stocks-etfs-and-funds',
    },
    {
      lessonId: 'bonds-explained',
      title: 'Bonds and Gilts: The UK Investor\'s Safety Net',
      tags: ['Bonds', 'Diversification'],
      dependencies: ['diversification'],
      estimatedMinutes: 12,
      free: false,
      courseSlug: 'stocks-etfs-and-funds',
    },
    {
      lessonId: 'uk-pensions',
      title: 'Workplace Pensions, SIPPs, and the State Pension',
      tags: ['Pensions', 'Tax', 'ISAs'],
      dependencies: ['isa-basics', 'compound-interest'],
      estimatedMinutes: 15,
      free: false,
      courseSlug: 'pensions-and-your-future',
    },
  ],
}

export function getLessonById(id: string): CurriculumLesson | undefined {
  return curriculumMap.lessons.find(l => l.lessonId === id)
}

/** Returns all lessons whose dependencies are fully satisfied by the given completed set. */
export function getUnlockedLessons(completedIds: Set<string>): CurriculumLesson[] {
  return curriculumMap.lessons.filter(
    l => l.dependencies.every(dep => completedIds.has(dep)),
  )
}

/** Returns the dependency chain (in order) required to reach a target lesson. */
export function getDependencyChain(
  targetId: string,
  chain: string[] = [],
): string[] {
  const lesson = getLessonById(targetId)
  if (!lesson) return chain
  for (const dep of lesson.dependencies) {
    if (!chain.includes(dep)) {
      getDependencyChain(dep, chain)
      chain.push(dep)
    }
  }
  return chain
}
