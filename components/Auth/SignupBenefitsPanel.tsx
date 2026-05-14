function GradCapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L22 8.5L12 14L2 8.5L12 3Z" fill="currentColor" />
      <path d="M6 11.5V16.5C6 16.5 8 19.5 12 19.5C16 19.5 18 16.5 18 16.5V11.5L12 14L6 11.5Z" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

function BarChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="13" width="5" height="9"  rx="1.5" fill="currentColor" />
      <rect x="9.5" y="8"  width="5" height="14" rx="1.5" fill="currentColor" />
      <rect x="17" y="2"  width="5" height="20" rx="1.5" fill="currentColor" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="2"  width="9" height="9"  rx="2" fill="currentColor" />
      <rect x="13" y="2"  width="9" height="9"  rx="2" fill="currentColor" />
      <rect x="2"  y="13" width="9" height="9"  rx="2" fill="currentColor" />
      <rect x="13" y="13" width="9" height="9"  rx="2" fill="currentColor" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2H17V11C17 14.3 14.8 17 12 17C9.2 17 7 14.3 7 11V2Z" fill="currentColor" />
      <path d="M7 5H4C4 5 3 6.5 4 8.5C5 10 7 10 7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M17 5H20C20 5 21 6.5 20 8.5C19 10 17 10 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="10" y="17" width="4" height="3" fill="currentColor" />
      <rect x="7"  y="20" width="10" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="11" fill="#d4ece0" />
      <path d="M6.5 11l3 3 6-6" stroke="#1e6b46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="11" rx="3" fill="currentColor" />
      <path d="M8 11V7C8 4.8 9.8 3 12 3S16 4.8 16 7V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="17" r="1.5" fill="white" opacity="0.6" />
    </svg>
  )
}

const FEATURES = [
  { Icon: GradCapIcon,  title: 'Learn',    desc: 'Bite-sized lessons on investing basics and beyond.' },
  { Icon: BarChartIcon, title: 'Practise', desc: 'Use our simulator to build confidence risk-free.' },
  { Icon: GridIcon,     title: 'Track',    desc: 'Access powerful tools to plan and analyse.' },
  { Icon: TrophyIcon,   title: 'Grow',     desc: 'Track progress, earn XP and achieve your goals.' },
]

export default function SignupBenefitsPanel() {
  return (
    <div className="signup-benefits">
      <div className="signup-benefits__content">
        <h2 className="signup-benefits__headline">
          Create your account<br />
          <em className="signup-benefits__headline-em">and start flourishing</em> 🌱
        </h2>
        <p className="signup-benefits__sub">
          Join thousands of UK students building real investing skills — completely free.
        </p>

        <ul className="signup-benefits__list">
          {FEATURES.map(({ Icon, title, desc }) => (
            <li key={title} className="signup-benefits__item">
              <div className="signup-benefits__icon-wrap">
                <Icon />
              </div>
              <div className="signup-benefits__text">
                <span className="signup-benefits__item-title">{title}</span>
                <span className="signup-benefits__item-desc">{desc}</span>
              </div>
              <CheckCircleIcon />
            </li>
          ))}
        </ul>

        <div className="signup-benefits__footer">
          <div className="signup-benefits__footer-icon">
            <LockIcon />
          </div>
          <div>
            <span className="signup-benefits__footer-title">100% free. No card required.</span>
            <span className="signup-benefits__footer-sub">For education only.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
