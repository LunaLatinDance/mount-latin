import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Workshop', href: '#workshop' },
    { label: 'Classes', href: '#classes' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/80 backdrop-blur-xl py-1 md:py-2'
            : 'bg-transparent py-1 md:py-2'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img src="/assets/mount_latin_logo.webp" alt="Mount Latin Dance" className="h-20 md:h-32 lg:h-36 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-light/70 hover:text-mostaza transition-colors text-sm font-medium tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-turquesa to-mostaza text-dark px-5 py-2 rounded-full text-sm font-semibold transition-all hover:animate-pulse"
          >
            Start today
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-light p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-light transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-light transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-light transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-dark/95 backdrop-blur-xl mt-3 mx-4 rounded-2xl p-6 border border-light/10">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
onClick={() => setMenuOpen(false)}
              className="text-light/80 hover:text-mostaza transition-colors text-lg font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-gradient-to-r from-turquesa to-mostaza text-dark px-5 py-3 rounded-full text-center font-semibold mt-2"
            >
              Start today
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
