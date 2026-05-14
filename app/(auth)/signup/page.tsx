'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import SignupStep1          from '@/components/Auth/SignupStep1'
import SignupStep2          from '@/components/Auth/SignupStep2'
import SignupEmailSent      from '@/components/Auth/SignupEmailSent'
import SignupBenefitsPanel  from '@/components/Auth/SignupBenefitsPanel'

function TrustBadge() {
  return (
    <p className="signup-trust">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1L2 3.5V8C2 11.5 5 14.2 8 15C11 14.2 14 11.5 14 8V3.5L8 1Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M5.5 8l2 2 3-3"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Your data is safe with us. We&apos;ll never share your information.
    </p>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)

  const [name,       setName]       = useState('')
  const [ageRange,   setAgeRange]   = useState('')
  const [university, setUniversity] = useState('')
  const [course,     setCourse]     = useState('')
  const [notInHE,    setNotInHE]    = useState(false)

  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [emailSent,    setEmailSent]    = useState(false)

  const strength = (() => {
    if (!password) return 0
    let s = 0
    if (password.length >= 8)           s++
    if (/[A-Z]/.test(password))         s++
    if (/[0-9]/.test(password))         s++
    if (/[^A-Za-z0-9]/.test(password))  s++
    return s
  })()
  const strengthLabel  = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColour = ['', '#f87171', '#f59e0b', '#4caf82', '#2e7d5e'][strength]

  const handleStep1 = (e: React.FormEvent) => { e.preventDefault(); setStep(2) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const firstName = name.trim().split(' ')[0]
      const { data, error: signUpError } = await supabase.auth.signUp({
        email, password, options: { data: { first_name: firstName } },
      })
      if (signUpError) { setError(signUpError.message); return }
      if (!data.user)  { setError('Something went wrong. Please try again.'); return }
      await supabase.from('profiles').upsert({
        id: data.user.id, email, first_name: firstName,
        age_range: ageRange, university: notInHE ? null : university,
        course: notInHE ? null : course, not_in_he: notInHE,
      })
      if (!data.session) { setEmailSent(true); return }
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const firstName = name.trim().split(' ')[0]

  const progressWidth = emailSent ? '100%' : step === 1 ? '50%' : '100%'
  const progressLabel = emailSent ? 'Step 2 of 2' : step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'

  return (
    <div className="signup-wrapper">
      <div className="signup-step2-layout">
        <SignupBenefitsPanel />
        <div className="signup-step2-form">
          <div className="signup-progress">
            <div className="signup-progress__track">
              <div className="signup-progress__fill" style={{ width: progressWidth }} />
            </div>
            <span className="signup-progress__label">{progressLabel}</span>
          </div>
          {step === 1 && !emailSent && (
            <SignupStep1
              name={name}           onName={setName}
              ageRange={ageRange}   onAgeRange={setAgeRange}
              university={university} onUniversity={v => setUniversity(v)}
              course={course}       onCourse={v => setCourse(v)}
              notInHE={notInHE}     onNotInHE={checked => { setNotInHE(checked); if (checked) { setUniversity(''); setCourse('') } }}
              onSubmit={handleStep1}
            />
          )}
          {step === 2 && !emailSent && (
            <SignupStep2
              firstName={firstName}
              email={email}         onEmail={setEmail}
              password={password}   onPassword={setPassword}
              showPassword={showPassword} onShowPassword={() => setShowPassword(!showPassword)}
              strength={strength}   strengthLabel={strengthLabel} strengthColour={strengthColour}
              loading={loading}     error={error}
              onSubmit={handleSubmit} onBack={() => setStep(1)}
            />
          )}
          {emailSent && <SignupEmailSent email={email} />}
        </div>
      </div>
      <TrustBadge />
    </div>
  )
}
