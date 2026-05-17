// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
}

export interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  associatedTool?: string;
  tags: string[];
  modules: string[];
  courses: Course[];
  featuredOnDashboard?: boolean;
}

// ─── Mock data generators ────────────────────────────────────────────────────

const LESSON_MINUTES = [6, 8, 10, 12] as const;
const LESSON_XP      = [10, 15, 20, 25] as const;

function makeLessons(courseId: string, count: number): Lesson[] {
  return Array.from({ length: count }, (_, i) => ({
    id:               `${courseId}-l${i + 1}`,
    title:            `Lesson ${i + 1}`,
    description:      `Core concept ${i + 1} for ${courseId}.`,
    estimatedMinutes: LESSON_MINUTES[i % LESSON_MINUTES.length],
    xpReward:         LESSON_XP[i % LESSON_XP.length],
  }));
}

function makeCourse(
  pathId: string,
  index: number,
  title: string,
  lessonCount: 3 | 4,
): Course {
  const id = `${pathId}-c${index}`;
  return { id, title, lessons: makeLessons(id, lessonCount) };
}

// ─── Learning paths ───────────────────────────────────────────────────────────

export const flourishPaths: LearningPath[] = [
  {
    id:                 'beginner-to-investor',
    title:              'Beginner to Investor',
    description:        'Start from scratch and build your investing confidence.',
    imageUrl:           '/images/paths/beginner-to-investor.png',
    category:           'Foundations',
    associatedTool:     'compound-calculator',
    tags:               ['beginner', 'isa', 'etfs', 'foundations'],
    modules:            ['Money Basics', 'Your First Investment'],
    featuredOnDashboard: true,
    courses: [
      makeCourse('beginner-to-investor', 1, 'How Money & Markets Work', 4),
      makeCourse('beginner-to-investor', 2, 'Your First ISA & ETF',     3),
    ],
  },
  {
    id:                 'build-wealth',
    title:              'Build Wealth',
    description:        'Learn strategies to grow your money over the long term.',
    imageUrl:           '/images/paths/build-wealth.png',
    category:           'Strategy',
    associatedTool:     'isa-tracker',
    tags:               ['wealth', 'compounding', 'diversification', 'strategy'],
    modules:            ['Growth Mindset', 'Portfolio Strategy'],
    featuredOnDashboard: true,
    courses: [
      makeCourse('build-wealth', 1, 'The Power of Compounding', 4),
      makeCourse('build-wealth', 2, 'Diversification & Risk',   3),
    ],
  },
  {
    id:                 'financial-freedom',
    title:              'Financial Freedom',
    description:        'Master advanced concepts and take control of your future.',
    imageUrl:           '/images/paths/financial-freedom.png',
    category:           'Advanced',
    associatedTool:     'lisa-calculator',
    tags:               ['advanced', 'pension', 'lisa', 'tax', 'fire'],
    modules:            ['Tax Efficiency', 'Long-Term Planning'],
    featuredOnDashboard: true,
    courses: [
      makeCourse('financial-freedom', 1, 'Pensions, LISA & Tax Wrappers', 4),
      makeCourse('financial-freedom', 2, 'Planning Your Financial Future', 4),
    ],
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const featuredPaths = flourishPaths.filter(p => p.featuredOnDashboard);

export function getPathById(id: string): LearningPath | undefined {
  return flourishPaths.find(p => p.id === id);
}

export function totalLessonsInPath(path: LearningPath): number {
  return path.courses.reduce((sum, c) => sum + c.lessons.length, 0);
}

export function totalXpInPath(path: LearningPath): number {
  return path.courses.reduce(
    (sum, c) => sum + c.lessons.reduce((s, l) => s + l.xpReward, 0),
    0,
  );
}
