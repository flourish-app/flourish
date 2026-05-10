'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.fade-up').forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${(i % 4) * 70}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
