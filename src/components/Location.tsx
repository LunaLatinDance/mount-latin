import { useState } from 'react'

const LOCATIONS = [
  {
    id: 'arataki',
    name: 'Arataki Community Centre',
    address: '12 Zambuk Way, Mount Maunganui',
    query: 'Arataki Community Centre Mount Maunganui',
    schedule: {
      level: 'Beginner Salsa & Bachata',
      day: 'Wednesday',
      time: 'Salsa 7:30pm · Bachata 8:30pm',
    },
  },
  {
    id: 'mount-hall',
    name: 'Mount Community Hall',
    address: '345 Maunganui Road, Mount Maunganui',
    query: 'Mount Community Hall Mount Maunganui',
    schedule: {
      level: 'Intermediate Salsa & Bachata',
      day: 'Tuesday',
      time: 'Salsa 7:30pm · Bachata 8:30pm',
    },
  },
]

export default function Location() {
  const [active, setActive] = useState(0)
  const current = LOCATIONS[active]

  return (
    <section id="location" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Our locations</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Find us in <span className="gradient-text">Mount Maunganui</span>
          </h2>
          <div className="gold-line mx-auto mb-8" />
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {LOCATIONS.map((loc, i) => (
            <button
              key={loc.id}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                i === active
                  ? 'bg-gradient-to-r from-turquesa to-mostaza text-dark'
                  : 'border border-white/20 text-white/70 hover:text-white hover:border-white/40'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger">
          <div className="rounded-2xl overflow-hidden border border-white/5 shadow-xl h-full min-h-[400px]">
            <iframe
              title={current.name}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(current.query)}&output=embed`}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6 flex flex-col h-full">
            <div className="bg-dark/50 backdrop-blur border border-white/5 rounded-2xl p-8 flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-turquesa/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-display text-xl font-bold mb-1">{current.name}</p>
                  <p className="text-white/60 text-sm">{current.address}</p>
                </div>
              </div>

              <div className="bg-dark-light/50 border border-white/5 rounded-xl p-5">
                <p className="text-mostaza text-xs font-semibold uppercase tracking-wider mb-3">Class schedule</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-white/40 w-12 text-xs uppercase tracking-wider">Level</span>
                    <span className="text-white font-medium">{current.schedule.level}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-white/40 w-12 text-xs uppercase tracking-wider">Day</span>
                    <span className="text-white/80">{current.schedule.day}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-white/40 w-12 text-xs uppercase tracking-wider">Time</span>
                    <span className="text-mostaza">{current.schedule.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-turquesa/10 to-mostaza/10 border border-turquesa/20 rounded-2xl p-6 text-center">
              <p className="text-white/80 text-sm mb-3">
                Looking for <strong className="text-white">Advanced</strong> or{' '}
                <strong className="text-white">Private</strong> classes?
              </p>
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-turquesa to-mostaza text-dark px-6 py-3 rounded-full text-sm font-semibold hover:animate-pulse transition-all"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
