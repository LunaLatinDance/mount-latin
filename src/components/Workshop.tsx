export default function Workshop() {
  const details = [
    {
      label: 'Date',
      value: '5th of September',
      paths: ['M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
    },
    {
      label: 'Time',
      value: '3:00 PM – 5:30 PM',
      paths: ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'],
    },
    {
      label: 'Price',
      value: '$30',
      paths: ['M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'],
    },
    {
      label: 'Partner',
      value: 'No partner needed',
      paths: ['M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'],
    },
    {
      label: 'Location',
      value: 'Mount Community Hall',
      paths: [
        'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
        'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      ],
    },
  ]

  return (
    <section id="workshop" className="py-24 md:py-32 bg-dark-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-mostaza/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Upcoming Event</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Salsa <span className="gradient-text">Workshop</span>
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            One afternoon, zero experience needed. Come and dance your first salsa steps with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <img
              src="/assets/workshop-salsa.webp"
              alt="Absolute Beginner Salsa Workshop flyer — 5th of September, 3:00 PM to 5:30 PM, $30, Mount Community Hall"
              className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_0_60px_-15px_rgba(73,214,232,0.3)]"
            />
          </div>

          <div className="reveal-right">
            <h3 className="font-display text-3xl font-bold text-white mb-2">
              Absolute Beginner <span className="gradient-text">Salsa Workshop</span>
            </h3>
            <p className="text-white/60 leading-relaxed mb-8">
              A one-off workshop designed for absolute beginners. Learn the basics, meet the
              community, and have a great time — no partner and no experience needed.
            </p>

            <div className="space-y-5 mb-10">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-turquesa/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {d.paths.map((p) => (
                        <path key={p} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p} />
                      ))}
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">{d.label}</p>
                    <p className="text-white font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-turquesa to-mostaza text-dark px-8 py-4 rounded-full font-semibold text-lg transition-all hover:animate-pulse"
            >
              Book Your Spot
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
