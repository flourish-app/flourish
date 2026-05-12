import type { FaqItem } from './types'

export default function CourseFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="course-section">
      <h2 className="course-section__title">Common questions</h2>
      <div className="course-faq">
        {faqs.map(faq => (
          <div className="course-faq__item" key={faq.q}>
            <div className="course-faq__q">{faq.q}</div>
            <p className="course-faq__a">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
