import { useEffect, useRef, useState } from 'react'

const photos = [
  { src: '/assets/instagram/post-3.jpg', caption: 'Our amazing team 💃' },
  { src: '/assets/instagram/post-5.jpg', caption: 'Why dance Salsa & Bachata 💕' },
  { src: '/assets/instagram/post-6.jpg', caption: 'Dancing together ✨' },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = activeIndex !== null

  const close = () => setActiveIndex(null)
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
  const showNext = () => setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length))

  // Lock body scroll and move focus to the close button while the lightbox is open
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard navigation: ESC closes, arrows navigate
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 stagger">
          {photos.map((photo, i) => (
            <div
              key={photo.caption}
              role="button"
              tabIndex={0}
              aria-label={`Open image: ${photo.caption}`}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveIndex(i)
                }
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-dark-light transition-transform duration-500 cursor-pointer hover:animate-pulse"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-sm font-medium">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          <button
            ref={closeButtonRef}
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-turquesa"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-turquesa"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].caption}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            />
            <p className="text-white/80 text-sm font-medium text-center">{photos[activeIndex].caption}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-turquesa"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
