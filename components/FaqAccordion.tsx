'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Is Flourish actually free?',
    a: 'Yes - completely. Every lesson, tool, and simulator feature is free to access. We will never ask for a card. There is no premium tier that locks the good stuff away.',
  },
  {
    q: 'Do I need any prior knowledge?',
    a: 'None whatsoever. Flourish is designed from the ground up for people who have never thought seriously about investing. The very first lesson starts with "what is money?" - and builds from there.',
  },
  {
    q: 'Is any real money involved?',
    a: 'No. The simulator uses virtual money only. Flourish is a purely educational platform - we do not hold funds, facilitate transactions, or provide regulated financial advice. When you are ready to invest for real, we will point you to FCA-regulated platforms to do that safely.',
  },
  {
    q: 'How long does it take to complete a course?',
    a: 'Most lessons take between 5 and 15 minutes. A full course typically takes 1-3 hours spread across multiple sessions. There are no deadlines - you go at your own pace, and your progress is saved automatically.',
  },
  {
    q: 'Is this only for students, or can anyone use it?',
    a: 'Flourish is built with UK students in mind - the examples, amounts, and products covered are all relevant to student life. That said, if you are a recent graduate or young professional starting from scratch, everything here applies equally to you.',
  },
  {
    q: 'Does Flourish give financial advice?',
    a: 'No. Flourish is an education platform only. Nothing on this site constitutes regulated financial advice. All investing decisions should be made based on your own research, or with the guidance of an FCA-regulated financial adviser. With investing, your capital is at risk.',
  },
]

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="faq__list">
      {faqs.map((faq, i) => (
        <div key={i} className={`faq__item${openIndex === i ? ' open' : ''}`}>
          <button className="faq__question" onClick={() => toggle(i)}>
            {faq.q}
            <span className="faq__icon">+</span>
          </button>
          <div className="faq__answer">{faq.a}</div>
        </div>
      ))}
    </div>
  )
}
