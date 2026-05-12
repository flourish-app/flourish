const phases = [
  {
    num: '1', cls: 'journey__phase-num--1', tag: 'Phase one', title: 'Understand the basics',
    body: "Start from zero - no assumptions, no jargon. You'll learn what money actually does when it sits in different places, why inflation quietly erodes savings, and what investing actually means in plain terms.",
    items: ['What is investing, and why does it matter?', 'Savings accounts vs. investing - the real difference', "Risk, return, and why they're linked", 'How compound interest works (and why it changes everything)'],
  },
  {
    num: '2', cls: 'journey__phase-num--2', tag: 'Phase two', title: "Learn what's available to you",
    body: "The UK has some of the best tax-free investing wrappers in the world - and most students have never heard of them. You'll learn exactly what's available, how to use it, and why it matters for someone your age.",
    items: ["Stocks & Shares ISA - your £20,000 annual tax-free allowance", 'Lifetime ISA - the 25% government bonus for first-time buyers', 'ETFs and index funds - the smart, low-cost way to invest', 'How to choose a platform as a UK student'],
  },
  {
    num: '3', cls: 'journey__phase-num--3', tag: 'Phase three', title: 'Practice with no pressure',
    body: "Before you touch real money, build and manage a virtual portfolio using live market data. Buy stocks, hold ETFs, watch your decisions play out - and understand why they did, without any real consequence.",
    items: ['Virtual £10,000 to invest however you choose', 'Live market prices from UK and global exchanges', 'Weekly challenges to test specific skills', 'Performance tracking against the FTSE 100'],
  },
  {
    num: '4', cls: 'journey__phase-num--4', tag: 'Phase four', title: 'Invest for real, with confidence',
    body: "When you're ready, we'll point you to the best FCA-regulated platforms for UK students - with honest, unbiased guidance on which suits your situation. No affiliate bias. No hidden agenda. Just the facts.",
    items: ['Honest comparison of student-friendly UK platforms', 'Step-by-step guide to opening your first ISA', 'How to invest your first £100 (or £10)', 'Ongoing learning as markets and products evolve'],
  },
]

export default function HowItWorksJourney() {
  return (
    <section className="journey" id="journey">
      <div className="container">
        <div className="section-tag fade-up">Your path</div>
        <h2 className="section-headline fade-up">From zero to confident investor</h2>
        <p className="section-sub fade-up">
          Flourish moves you through four phases - each one building on the last. There&apos;s no rush, no deadlines, and no pressure. Just progress at your own pace.
        </p>
        <div className="journey__phases">
          {phases.map((phase) => (
            <div className="journey__phase fade-up" key={phase.num}>
              <div className="journey__phase-left">
                <div className={`journey__phase-num ${phase.cls}`}>{phase.num}</div>
                <div className="journey__phase-line" />
              </div>
              <div className="journey__phase-content">
                <div className="journey__phase-tag">{phase.tag}</div>
                <div className="journey__phase-title">{phase.title}</div>
                <p className="journey__phase-body">{phase.body}</p>
                <div className="journey__phase-items">
                  {phase.items.map((item) => (
                    <div className="journey__phase-item" key={item}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
