export type QuizOption        = { text: string; correct: boolean }
export type QuizCheckpoint     = { type: 'quiz';       question: string; options: QuizOption[]; explanation: string }
export type ConfidenceCheckpoint = { type: 'confidence'; prompt: string; fuzzyNote?: string }
export type ReflectionCheckpoint = { type: 'reflection'; prompt: string; reveal: string }
export type Checkpoint         = QuizCheckpoint | ConfidenceCheckpoint | ReflectionCheckpoint
export type Callout            = { type: 'key' | 'tip' | 'example'; text: string }

export type Section = {
  heading?:    string
  paragraphs:  string[]
  list?:       string[]
  callout?:    Callout
  checkpoint?: Checkpoint
}

export type LessonDot      = { num: number; slug: string; title: string }
export type AdjacentLesson = { num: number; slug: string; title: string } | null
