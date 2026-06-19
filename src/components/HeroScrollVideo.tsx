import { useEffect, useRef, useState, useCallback } from 'react'

const VIDEOS = [
  { src: '/assets/hero-salsa.webm', poster: '/assets/hero-salsa.webp', label: 'Salsa class' },
  { src: '/assets/hero-salsa-2.webm', poster: '/assets/hero-salsa-2.webp', label: 'Dancing together' },
]

const INTERVAL = 6000
// If onLoadedData doesn't fire within this time, show content anyway
const LOAD_TIMEOUT_MS = 4000

export default function HeroScrollVideo() {
  const [active, setActive] = useState(0)
  const [wiping, setWiping] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const [contentVisible, setContentVisible] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fallback: show content even if video never loads
  useEffect(() => {
    loadTimeoutRef.current = setTimeout(() => {
      setContentVisible(true)
    }, LOAD_TIMEOUT_MS)

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current)
    }
  }, [])

  const advance = useCallback(() => {
    setWiping(true)
    setTimeout(() => {
      setActive((prev) => (prev + 1) % VIDEOS.length)
      setWiping(false)
    }, 800)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(advance, INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [advance])

  // Play/pause videos based on active index
  // Only reset currentTime on first play to avoid re-fetch on mobile
  const hasPlayedRef = useRef<Record<number, boolean>>({})

  useEffect(() => {
    VIDEOS.forEach((_, i) => {
      const video = videoRefs.current[i]
      if (!video) return
      if (i === active) {
        if (!hasPlayedRef.current[i]) {
          // First time: reset to start
          video.currentTime = 0
          hasPlayedRef.current[i] = true
        }
        video.play().catch(() => {
          // Autoplay blocked — content is still shown via contentVisible
        })
      } else {
        video.pause()
      }
    })
  }, [active])

  const handleLoaded = (index: number) => {
    setLoaded((prev) => ({ ...prev, [index]: true }))
    setContentVisible(true)

    // Clear the fallback timeout since at least one video loaded
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }

    if (index === 0) {
      videoRefs.current[0]?.play().catch(() => {})
    }
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {VIDEOS.map((video, i) => (
        <div
          key={video.src}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            zIndex: i === active ? 2 : 1,
            clipPath:
              i === active
                ? wiping
                  ? 'inset(0 100% 0 0)'
                  : 'inset(0 0% 0 0)'
                : 'inset(0 0% 0 0)',
            opacity: i === active ? 1 : 0,
          }}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el }}
            className="absolute inset-0 w-full h-full object-cover"
            poster={video.poster}
            muted
            loop
            playsInline
            // Only preload the first video eagerly; the second loads lazily
            // This halves the initial bandwidth demand on mobile
            preload={i === 0 ? 'auto' : 'none'}
            onLoadedData={() => handleLoaded(i)}
          >
            <source src={video.src} type="video/webm" />
            <source src={video.src.replace('.webm', '.mp4')} type="video/mp4" />
          </video>
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/30 to-transparent z-10" />

      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-script text-mostaza text-2xl md:text-3xl mb-4">
          Let's keep dancing
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
          Feel the rhythm.<br />
          <span className="gradient-text">Live the dance.</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 font-light">
          Salsa and bachata classes in Mount Maunganui, Bay of Plenty.
          <br className="hidden md:block" />
          All levels — from beginners to advanced.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#classes"
            className="bg-gradient-to-r from-turquesa to-turquesa-dark text-dark px-8 py-4 rounded-full text-lg font-semibold transition-all hover:animate-pulse"
          >
            View classes
          </a>
          <a
            href="#contact"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-mostaza/50 transition-all"
          >
            Contact us
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current)
              setActive(i)
              setWiping(false)
              // Lazy-load the second video on demand when user clicks
              const video = videoRefs.current[i]
              if (video && video.preload === 'none') {
                video.preload = 'auto'
                video.load()
              }
              intervalRef.current = setInterval(advance, INTERVAL)
            }}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === active ? 'w-8 bg-mostaza' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
