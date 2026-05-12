import Link from 'next/link'

interface Props {
  headline: string
  sub:      string
}

export default function MarketingCourseCTABlock({ headline, sub }: Props) {
  return (
    <div className="course-cta-block">
      <div className="course-cta-block__inner">
        <div className="course-cta-block__left">
          <h3 className="course-cta-block__headline">{headline}</h3>
          <p className="course-cta-block__sub">{sub}</p>
        </div>
        <div className="course-cta-block__actions">
          <Link href="/start-learning" className="btn btn--primary btn--lg">Start learning free</Link>
          <Link href="/login" className="btn btn--outline btn--lg">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
