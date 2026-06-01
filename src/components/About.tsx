export default function About() {
  const features = [
    { title: 'Salsa LA', desc: 'From the basics to advanced levels. LA On1 style with technique and musicality.' },
    { title: 'Bachata', desc: 'Classic and sensual. Body movement, connection, and plenty of feeling in every class.' },
    { title: 'Socials', desc: 'Community dance nights with stunning views in Mount Maunganui.' },
    { title: 'First Dance', desc: 'Personalized choreography for your wedding. Create a magical, unforgettable moment.' },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-mostaza/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Welcome to M.L.D</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            More than a dance school,<br />
            <span className="gradient-text">a community</span>
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
            At <strong className="text-white">Mount Latin Dance</strong> we believe that dance
            transforms lives. Our classes are designed so that everyone, regardless
            of their level, finds their rhythm and enjoys the journey. From your first step to
            the most complex patterns, we guide you with patience, technique, and plenty of flavor.
          </p>
          <p className="text-white/50 text-base max-w-2xl mx-auto mt-4">
            Classes in Mount Maunganui, Bay of Plenty — Tauranga, New Zealand 🇳🇿
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-dark-light/50 backdrop-blur border border-white/5 rounded-2xl p-8 hover:border-salsa/30 hover:bg-dark-light/80 transition-all duration-300 hover:-translate-y-2 group"
            >
              <h3 className="font-display text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
