export type AuthStep = 1 | 2

export type SignupStep1Props = {
  name:        string
  onName:      (v: string) => void
  ageRange:    string
  onAgeRange:  (v: string) => void
  university:  string
  onUniversity:(v: string) => void
  course:      string
  onCourse:    (v: string) => void
  notInHE:     boolean
  onNotInHE:   (checked: boolean) => void
  onSubmit:    (e: React.FormEvent) => void
}

export type SignupStep2Props = {
  firstName:        string
  email:            string
  onEmail:          (v: string) => void
  password:         string
  onPassword:       (v: string) => void
  showPassword:     boolean
  onShowPassword:   () => void
  strength:         number
  strengthLabel:    string
  strengthColour:   string
  loading:          boolean
  error:            string
  onSubmit:         (e: React.FormEvent) => void
  onBack:           () => void
}
