import Link from 'next/link'
import Image from 'next/image'
import { featuredPaths, totalLessonsInPath } from '@/config/learningPaths'
import type { LearningPath } from '@/config/learningPaths'

function PathImageFallback({ title }: { title: string }) {
  const initials = title.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div className="ps-card__img-fallback" aria-hidden="true">
      {initials}
    </div>
  )
}

function PathCard({ path, progress = 0 }: { path: LearningPath; progress?: number }) {
  const courseCount = path.courses.length
  const lessonCount = totalLessonsInPath(path)

  return (
    <article className="ps-card">
      {/* ── Image ── */}
      <div className="ps-card__image-wrap">
        {path.imageUrl ? (
          <Image
            src={path.imageUrl}
            alt={path.title}
            fill
            sizes="80px"
            className="ps-card__image"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <PathImageFallback title={path.title} />
        )}
      </div>

      {/* ── Body ── */}
      <div className="ps-card__body">
        <p className="ps-card__meta">
          {courseCount} {courseCount === 1 ? 'course' : 'courses'}&nbsp;&bull;&nbsp;{lessonCount} lessons
        </p>
        <h3 className="ps-card__title">{path.title}</h3>
        <p className="ps-card__desc">{path.description}</p>

        {/* Progress + CTA share the bottom row */}
        <div className="ps-card__footer">
          <div className="ps-card__progress-col">
            <div className="dashboard-progress ps-card__progress-bar">
              <div className="dashboard-progress__bar" style={{ width: `${progress}%` }} />
            </div>
            <span className="ps-card__progress-label">{progress}% complete</span>
          </div>
          <Link href={`/dashboard/paths/${path.id}`} className="btn btn--green btn--sm ps-card__btn">
            Start path
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function PathSelector() {
  return (
    <section className="path-selector">
      <div className="path-selector__header">
        <div>
          <h2 className="path-selector__heading">Learning paths</h2>
          <p className="path-selector__sub">Follow a structured path to build your skills step by step.</p>
        </div>
        <Link href="/dashboard/paths" className="path-selector__view-all">
          View all paths&nbsp;&rarr;
        </Link>
      </div>

      <div className="path-selector__scroll">
        {featuredPaths.map(path => (
          <PathCard key={path.id} path={path} progress={0} />
        ))}
      </div>
    </section>
  )
}
