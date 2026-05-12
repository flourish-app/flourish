'use client'

const AGE_RANGES = ['Under 18', '18–21', '22–25', '26–30', '31+']

type Draft = { first_name: string; age_range: string; university: string; course: string }

type Props = {
  draft:      Draft
  onDraft:    (d: Draft) => void
  saveError:  string | null
  saving:     boolean
  onSave:     () => void
  onCancel:   () => void
}

export default function ProfileEditForm({ draft, onDraft, saveError, saving, onSave, onCancel }: Props) {
  return (
    <div className="profile-edit-form">
      <h2 className="profile-edit-form__title">Edit profile</h2>

      <div className="profile-form-grid">
        <div className="profile-field">
          <label className="profile-field__label" htmlFor="pf-name">First name</label>
          <input
            id="pf-name"
            className="profile-field__input"
            type="text"
            placeholder="e.g. Alex"
            value={draft.first_name}
            onChange={e => onDraft({ ...draft, first_name: e.target.value })}
          />
        </div>

        <div className="profile-field">
          <label className="profile-field__label" htmlFor="pf-age">Age range</label>
          <select
            id="pf-age"
            className="profile-field__input profile-field__select"
            value={draft.age_range}
            onChange={e => onDraft({ ...draft, age_range: e.target.value })}
          >
            <option value="">Select age range</option>
            {AGE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="profile-field">
          <label className="profile-field__label" htmlFor="pf-uni">University</label>
          <input
            id="pf-uni"
            className="profile-field__input"
            type="text"
            placeholder="e.g. University of Edinburgh"
            value={draft.university}
            onChange={e => onDraft({ ...draft, university: e.target.value })}
          />
        </div>

        <div className="profile-field">
          <label className="profile-field__label" htmlFor="pf-course">Course</label>
          <input
            id="pf-course"
            className="profile-field__input"
            type="text"
            placeholder="e.g. Economics"
            value={draft.course}
            onChange={e => onDraft({ ...draft, course: e.target.value })}
          />
        </div>
      </div>

      {saveError && <p className="profile-form-error">{saveError}</p>}

      <div className="profile-form-actions">
        <button className="btn btn--primary" onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button className="btn btn--outline" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  )
}
