const testimonials = [
  { initials: 'JM', bg: '#2e7d5e', quote: "I opened my first Stocks & Shares ISA the week after finishing the ISA module. I'd been putting it off for two years because it seemed complicated. It's not.", name: 'Jamie M.', meta: 'Economics, University of Leeds' },
  { initials: 'PK', bg: '#1e3a8a', quote: "The simulator is addictive. I've been competing with my flatmates for the top return each week - and we've all accidentally learned a ton about portfolio diversification.", name: 'Priya K.', meta: 'Computer Science, UCL' },
  { initials: 'TC', bg: '#92400e', quote: "I came in knowing nothing. Now I actually understand what my mum is talking about when she mentions her pension. The compound interest calculator broke my brain in the best way.", name: 'Tom C.', meta: 'History, University of Edinburgh' },
]

export default function HomeTestimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-tag fade-up">Student stories</div>
        <h2 className="section-headline fade-up">Real students, real results</h2>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div className="testi-card fade-up" key={t.name}>
              <div className="testi-card__stars">★★★★★</div>
              <p className="testi-card__quote">&quot;{t.quote}&quot;</p>
              <div className="testi-card__author">
                <div className="testi-card__avatar" style={{ background: t.bg }}>{t.initials}</div>
                <div>
                  <div className="testi-card__name">{t.name}</div>
                  <div className="testi-card__meta">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
