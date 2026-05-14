import { z } from 'zod'

// ── Shared Zod schemas ────────────────────────────────────────────────────────

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Enter a valid email address')

export const passwordLoginSchema = z
  .string()
  .min(1, 'Password is required')

export const passwordSignupSchema = z
  .string()
  .min(8,            'At least 8 characters')
  .refine(p => /[a-z]/.test(p) && /[A-Z]/.test(p), 'Upper & lowercase letters')
  .refine(p => /[0-9]/.test(p),        'One number')
  .refine(p => /[^a-zA-Z0-9]/.test(p), 'One symbol')

export const loginSchema = z.object({
  email:    emailSchema,
  password: passwordLoginSchema,
})

export const signupStep2Schema = z.object({
  email:    emailSchema,
  password: passwordSignupSchema,
})

export type LoginFormData    = z.infer<typeof loginSchema>
export type SignupStep2Data  = z.infer<typeof signupStep2Schema>

// ── Component prop types ──────────────────────────────────────────────────────

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
