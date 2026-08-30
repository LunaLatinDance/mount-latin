export default function Classes() {
  type ScheduleItem = {
    time: string
    style: string
    level: string
    tag?: string
  }

  type ClassCard = {
    id: string
    month?: string
    level: string
    title: string
    desc: string
    schedule: ScheduleItem[]
    location: string
    popular: boolean
    price: { qty: string; detail: string; amount: string }[]
    priceNote: string
  }

  const classes: ClassCard[] = [
    {
      id: 'tuesday',
      level: 'Tuesday',
      title: 'Mount Community Hall',
      desc: 'Three levels to find your rhythm. From improvers to intermediate.',
      schedule: [
        { time: '6:30pm', style: 'Bachata', level: 'Improvers' },
        { time: '7:30pm', style: 'Salsa', level: 'Intermediate' },
        { time: '8:30pm', style: 'Bachata', level: 'Intermediate' },
      ],
      location: 'Mount Community Hall',
      popular: true,
      price: [],
      priceNote: '',
    },
    {
      id: 'wednesday',
      month: 'September',
      level: 'Wednesday',
      title: 'Arataki Community Center',
      desc: 'The brand new absolute beginner course — start fresh, no experience or partner needed.',
      schedule: [
        { time: '7:30pm', style: 'Salsa', level: 'Beginners', tag: 'NEW!' },
        { time: '8:30pm', style: 'Bachata', level: 'Beginners' },
      ],
      location: 'Arataki Community Center',
      popular: false,
      price: [
        { qty: '1 course', detail: 'Salsa OR Bachata · 4 weeks', amount: '$70' },
        { qty: '2 courses', detail: 'Salsa AND Bachata · 4 weeks', amount: '$110' },
      ],
      priceNote: 'You save $30 when you do both courses.',
    },
    {
      id: 'firstdance',
      level: 'Private',
      title: 'First Dance / Wedding',
      desc: 'Personalized choreography for your first dance together. Create a magical, unforgettable moment.',
      schedule: [{ time: 'By arrangement', style: 'Custom', level: 'session' }],
      location: 'Mount Maunganui',
      popular: false,
      price: [],
      priceNote: '',
    },
  ]

  return (
    <section id="classes" className="py-24 md:py-32 bg-dark-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-turquesa/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Our classes</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Find your <span className="gradient-text">rhythm</span>
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Weekly classes in Mount Maunganui. No experience or dance partner needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {classes.map((c) => (
            <div
              key={c.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 group ${
                c.popular
                  ? 'bg-gradient-to-b from-turquesa/20 to-dark border-2 border-turquesa/50'
                  : 'bg-dark/50 border border-white/5 hover:border-mostaza/30'
              }`}
            >
              {c.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-turquesa to-mostaza text-dark text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most popular
                </div>
              )}
              {c.month && (
                <p className="font-display text-lg font-bold text-white/90 mb-1">{c.month}</p>
              )}
              <span className="text-mostaza text-xs font-semibold uppercase tracking-wider">{c.level}</span>
              <h3 className="font-display text-2xl font-bold text-white mt-2 mb-3">{c.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{c.desc}</p>
              <div className="space-y-2 text-white/50 text-xs mb-6">
                {c.schedule.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {s.time === 'By arrangement' ? (
                      <span className="text-mostaza font-semibold">{s.time}</span>
                    ) : (
                      <>
                        <span className="text-mostaza font-semibold w-16">{s.time}</span>
                        <span className="text-white">{s.style}</span>
                        <span className="text-white/60">{s.level}</span>
                        {s.tag && (
                          <span className="bg-turquesa text-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {s.tag}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                ))}
                <span className="block mt-2">📍 {c.location}</span>
              </div>
              {c.price.length > 0 && (
                <div className="mb-6 rounded-xl border border-mostaza/20 bg-mostaza/5 p-4">
                  {c.price.map((p) => (
                    <div key={p.qty} className="flex items-center justify-between gap-3 py-1 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">{p.qty}</p>
                        <p className="text-white/50 text-[11px]">{p.detail}</p>
                      </div>
                      <span className="font-display text-2xl font-bold gradient-text">{p.amount}</span>
                    </div>
                  ))}
                  {c.priceNote && (
                    <p className="text-mostaza text-xs font-semibold mt-2 border-t border-mostaza/20 pt-2">
                      {c.priceNote}
                    </p>
                  )}
                </div>
              )}
              <a
                href="#contact"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                  c.popular
                    ? 'bg-gradient-to-r from-turquesa to-mostaza text-dark'
                    : 'border border-white/20 text-white hover:border-mostaza hover:text-mostaza'
                }`}
              >
                Book your spot
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
