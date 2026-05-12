export default function CourseOutcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <div className="course-section">
      <h2 className="course-section__title">What you&apos;ll learn</h2>
      <ul className="course-outcomes">
        {outcomes.map(o => (
          <li key={o} className="course-outcome">
            <span className="course-outcome__tick">✓</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
