import { useEffect, useRef, useState, type FormEvent } from 'react'

// Tipos para la API global de Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    // Callback global que Turnstile llama cuando el script está listo
    window.onTurnstileLoad = () => {
      if (turnstileRef.current && !widgetIdRef.current && window.turnstile) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => setTurnstileToken(''),
          theme: 'dark',
        })
      }
    }

    // Si el script ya cargó antes de montar el componente
    if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
      window.onTurnstileLoad()
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot: si tiene valor, es un bot
    const honeypot = formData.get('company') as string
    if (honeypot) {
      // Fingimos que se envió para no darle pistas al bot
      setStatus('sent')
      return
    }

    if (!turnstileToken) {
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          turnstileToken,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
        // Resetear el widget para el próximo envío
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
          setTurnstileToken('')
        }
      } else {
        setStatus('error')
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
          setTurnstileToken('')
        }
      }
    } catch {
      const name = formData.get('name')
      const email = formData.get('email')
      const phone = formData.get('phone')
      const message = formData.get('message')
      const subject = encodeURIComponent(`Message from ${name} — Mount Latin Dance`)
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      )
      window.location.href = `mailto:mountlatindance@gmail.com?subject=${subject}&body=${body}`
      setStatus('sent')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-dark-light relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-turquesa/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="gradient-text">dance</span>?
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Drop us a message and we'll get back to you right away. Your first class awaits in Mount Maunganui.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form
            onSubmit={handleSubmit}
            className="bg-dark/50 backdrop-blur border border-white/5 rounded-3xl p-8 md:p-10 reveal-left"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/60 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full bg-dark-light/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-salsa focus:ring-1 focus:ring-salsa transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/60 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-dark-light/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-salsa focus:ring-1 focus:ring-salsa transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white/60 text-sm font-medium mb-2">
                  Phone <span className="text-white/30">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone"
                  className="w-full bg-dark-light/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-salsa focus:ring-1 focus:ring-salsa transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/60 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What would you like to dance? Do you have experience?"
                  className="w-full bg-dark-light/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-salsa focus:ring-1 focus:ring-salsa transition-colors resize-none"
                />
              </div>

              {/* Honeypot: oculto a usuarios reales, los bots lo llenan */}
              <div className="absolute opacity-0 pointer-events-none -left-[9999px]" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Turnstile widget */}
              <div className="flex justify-center">
                <div ref={turnstileRef} />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || !turnstileToken}
                className="w-full bg-gradient-to-r from-turquesa to-mostaza text-dark py-4 rounded-xl font-semibold text-lg transition-all hover:animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send message'
                )}
              </button>

              {status === 'sent' && (
                <p className="text-green-400 text-center text-sm font-medium">
                  Message sent! We'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm font-medium">
                  Something went wrong. Try again or message us on Instagram.
                </p>
              )}
            </div>
          </form>

          <div className="space-y-8 reveal-right flex flex-col h-full">
            <div className="bg-dark/50 backdrop-blur border border-white/5 rounded-3xl p-8 flex-1 flex flex-col">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Contact info</h3>
              <div className="space-y-5 flex-1 flex flex-col justify-around">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-turquesa/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white font-medium">mountlatindance@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-turquesa/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Locations</p>
                    <p className="text-white font-medium">Mount Community Hall</p>
                    <p className="text-white font-medium">Arataki Community Center</p>
                    <p className="text-white/50 text-sm mt-1">Mount Maunganui, Bay of Plenty</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-turquesa/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Schedule</p>
                    <p className="text-white font-medium">Tue: Intermediate Salsa 7:30 · Bachata 8:30</p>
                    <p className="text-white font-medium">Wed: Beginner Salsa 7:30 · Bachata 8:30</p>
                    <p className="text-white font-medium">Thu: Advanced (limited spots)</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/mount_latin_dance/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-500/20 border border-white/10 rounded-3xl p-8 hover:border-pink-500/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center group-hover:animate-pulse transition-transform">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">@mount_latin_dance</p>
                  <p className="text-white/50 text-sm">409 followers · 55 posts</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
