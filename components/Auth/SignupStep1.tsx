'use client'

import type { SignupStep1Props } from './types'

const AGE_RANGES = ['Under 18', '18–21', '22–25', '26–30', '31+']

export default function SignupStep1({
  name, onName, ageRange, onAgeRange,
  university, onUniversity, course, onCourse,
  notInHE, onNotInHE, onSubmit,
}: SignupStep1Props) {
  const firstName = name.trim().split(' ')[0]
  return (
    <>
      <div className="auth-card__header">
        <h1 className="auth-card__headline">
          Nice to meet you{firstName ? `, ${firstName}` : ''} 👋
        </h1>
        <p className="auth-card__sub">Tell us a little about yourself to get started.</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Your name</label>
          <input
            id="name" type="text" className="form-input" placeholder="Alex"
            value={name} onChange={(e) => onName(e.target.value)}
            required autoComplete="given-name" autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="age">Age range</label>
          <div className="age-grid">
            {AGE_RANGES.map((r) => (
              <button key={r} type="button" className={`age-option${ageRange === r ? ' age-option--selected' : ''}`} onClick={() => onAgeRange(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {!notInHE && (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="university">University</label>
              <input id="university" type="text" className="form-input" placeholder="e.g. University of Manchester"
                value={university} onChange={e => onUniversity(e.target.value)} autoComplete="organization" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="course">Course</label>
              <input id="course" type="text" className="form-input" placeholder="e.g. Economics"
                value={course} onChange={e => onCourse(e.target.value)} />
            </div>
          </>
        )}

        <label className="form-checkbox-label">
          <input type="checkbox" className="form-checkbox" checked={notInHE}
            onChange={e => onNotInHE(e.target.checked)} />
          <span>I&apos;m not currently in higher education</span>
        </label>

        <button type="submit" className="btn btn--primary btn--lg auth-submit" disabled={!name.trim() || !ageRange}>
          Continue
        </button>
      </form>

      <p className="auth-card__terms" style={{ marginTop: '16px' }}>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </>
  )
}
