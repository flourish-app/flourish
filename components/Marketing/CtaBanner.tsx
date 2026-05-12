interface Props {
  headline: string
  sub:      string
  children: React.ReactNode
}

export default function CtaBanner({ headline, sub, children }: Props) {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2 className="cta-banner__headline fade-up">{headline}</h2>
        <p className="cta-banner__sub fade-up">{sub}</p>
        <div className="cta-banner__actions fade-up">
          {children}
        </div>
      </div>
    </section>
  )
}
