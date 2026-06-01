import { useEffect, useRef, useState } from 'react'

const TESTIMONIALS = [
  {
    text: 'You are absolutely amazing. You are definitely the light of the party. You carry so much positive energy. Everyone has a lot of respect for you. So happy I got to meet you and learn from you.',
    name: 'Lucas S.',
  },
  {
    text: 'Class was a lot of fun. I think you two are great teachers, perfect pace!',
    name: 'Tom H.',
  },
  {
    text: 'Thanks for your encouragement, your excellent teaching skills and your warm personality.',
    name: 'Jake R.',
  },
  {
    text: 'I never thought I could dance salsa! After just a few classes I\'m already feeling the rhythm. The teachers make everything so fun and accessible.',
    name: 'Maria G.',
  },
  {
    text: 'The social nights are incredible. Dancing with a view of the Mount is something everyone should experience.',
    name: 'James T.',
  },
  {
    text: 'We used Mount Latin Dance for our wedding first dance and it was MAGICAL. Our choreography was beautiful and our guests were blown away.',
    name: 'Sarah & Chris',
  },
  {
    text: 'Best decision I ever made was joining these classes. The community is so welcoming and supportive. Feels like family.',
    name: 'Emma W.',
  },
  {
    text: 'I\'ve danced bachata in several countries and the level here is top notch. Luna and the team really know their stuff.',
    name: 'Carlos M.',
  },
  {
    text: 'Started as a complete beginner and now I can lead confidently in socials. The progression is well structured and patient.',
    name: 'David L.',
  },
  {
    text: 'Such a welcoming environment. No judgment, just good vibes and great music. Wednesday nights are the highlight of my week!',
    name: 'Sophie K.',
  },
]

const SPEED = 55

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragStartX = useRef(0)
  const dragStartOffset = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    function animate(timestamp: number) {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const dt = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      if (!isDraggingRef.current && trackRef.current) {
        offsetRef.current -= SPEED * (dt / 1000)
        const half = trackRef.current.scrollWidth / 2
        if (Math.abs(offsetRef.current) >= half) {
          offsetRef.current += half
        }
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function handleDragStart(clientX: number) {
    isDraggingRef.current = true
    setIsDragging(true)
    dragStartX.current = clientX
    dragStartOffset.current = offsetRef.current
  }

  function handleDragMove(clientX: number) {
    if (!isDraggingRef.current || !trackRef.current) return
    const delta = clientX - dragStartX.current
    offsetRef.current = dragStartOffset.current + delta
    const half = trackRef.current.scrollWidth / 2

    if (Math.abs(offsetRef.current) >= half) {
      offsetRef.current += half
      dragStartOffset.current += half
      dragStartX.current = clientX
    }

    if (offsetRef.current > 0) offsetRef.current = 0
    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`
  }

  function handleDragEnd() {
    isDraggingRef.current = false
    setIsDragging(false)
  }

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-turquesa/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative mb-16">
        <div className="text-center reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            What our <span className="gradient-text">community</span> says
          </h2>
          <div className="gold-line mx-auto mb-8" />
        </div>
      </div>

      <div
        className={`overflow-hidden ${isDragging ? 'carousel-grabbing' : ''}`}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-6 w-fit"
          style={{ transform: 'translateX(0px)' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[340px] h-[260px] bg-dark-light/60 backdrop-blur border border-white/5 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-mostaza" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic flex-1 line-clamp-3">
                "{t.text}"
              </p>
              <div className="mt-auto pt-3 border-t border-white/5">
                <p className="text-mostaza font-display font-bold text-sm">— {t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
