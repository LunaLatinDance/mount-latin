import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroScrollVideo from './components/HeroScrollVideo'
import Workshop from './components/Workshop'
import About from './components/About'
import Classes from './components/Classes'
import Gallery from './components/Gallery'
import Location from './components/Location'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import Metrics from './components/Metrics'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger')
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroScrollVideo />
      <Workshop />
      <About />
      <Classes />
      <Gallery />
      <Location />
      <FAQ />
      <Testimonials />
      <Metrics />
      <Contact />
      <Footer />
    </main>
  )
}
