export default function Gallery() {
  const captions = [
    'June schedule - New classes! 📅',
    'Course wrap-up — Welcome to the family 💃✨',
    'Our amazing team 💃',
    'Social dance with stunning views 🌅',
    'Why dance Salsa & Bachata 💕',
    'Dancing together ✨',
  ]

  return (
    <section id="gallery" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Moments that <span className="gradient-text">inspire</span>
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Follow us on{' '}
            <a
              href="https://www.instagram.com/mount_latin_dance/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mostaza hover:text-mostaza transition-colors underline underline-offset-4"
            >
              @mount_latin_dance
            </a>{' '}
            to see all our content.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 stagger">
          {captions.map((caption, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-dark-light transition-transform duration-500 cursor-pointer hover:animate-pulse"
            >
              <img
                src={`/assets/instagram/post-${i + 1}.jpg`}
                alt={caption}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-sm font-medium">{caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
