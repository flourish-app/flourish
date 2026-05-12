import Link from 'next/link'

const tools = [
  { icon: '📈', title: 'Compound interest calculator', body: 'See how £50/month grows over 10, 20, 40 years - the numbers will surprise you.',                                                      href: '/tools/compound-calculator' },
  { icon: '🏦', title: 'ISA allowance tracker',         body: 'Track your £20,000 annual ISA allowance across different account types in real time.',                                                href: '/tools/isa-tracker' },
  { icon: '⚖️', title: 'Risk profiler',                 body: 'Answer 5 quick questions to understand what investment risk level suits your goals and timeline.',                                    href: '/tools/risk-profiler' },
  { icon: '🎯', title: 'Savings goal planner',          body: 'Set a target - house deposit, travel fund, emergency pot - and build a weekly plan to get there.',                                    href: '/tools' },
  { icon: '💸', title: 'Fees comparison tool',          body: 'Compare the real long-term cost of platform fees across popular UK investment apps.',                                                  href: '/tools' },
  { icon: '🧾', title: 'Student budget template',       body: "A simple monthly budget built around a student's income sources - loan, part-time work, and parental support.",                       href: '/tools' },
  { icon: '🏠', title: 'LISA calculator',               body: 'Work out how the Lifetime ISA 25% government bonus helps you buy your first home faster.',                                            href: '/tools/lisa-calculator' },
  { icon: '📅', title: 'Pension projection tool',       body: 'Enter your age and monthly contribution to see your projected pension pot at retirement.',                                             href: '/tools' },
]

export default function HomeToolsGrid() {
  return (
    <section className="tools" id="tools">
      <div className="container">
        <div className="section-tag fade-up">Free Tools</div>
        <h2 className="section-headline fade-up">Built for your situation</h2>
        <p className="section-sub fade-up">
          Practical calculators and trackers designed specifically for UK students - no finance degree required.
        </p>
        <div className="tools__grid">
          {tools.map((tool) => (
            <Link className="tool-card fade-up" key={tool.title} href={tool.href}>
              <div className="tool-card__icon">{tool.icon}</div>
              <div>
                <div className="tool-card__title">{tool.title}</div>
                <p className="tool-card__body">{tool.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
