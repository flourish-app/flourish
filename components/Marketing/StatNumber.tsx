'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  prefix?: string
  value: number
  suffix?: string
  /** Display string for values like "50k" — if set, count goes 0→value then appends suffix */
  displaySuffix?: string
}

export default function StatNumber({ prefix, value, suffix, displaySuffix }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 1 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, motionVal, value])

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)))
  }, [spring])

  return (
    <div ref={ref} className="stat__num">
      {prefix && prefix}
      <span>
        {display}
        {displaySuffix ?? ''}
      </span>
      {suffix && suffix}
    </div>
  )
}
