import { useState } from 'react'

const FAQ_DATA = [
  {
    q: 'Do I need a partner?',
    a: 'Not at all! You can come solo or with a friend. We rotate partners during class so everyone gets to practice with different people. No partner required — just bring yourself and your energy.',
  },
  {
    q: 'What should I wear?',
    a: 'Comfortable clothes you can move in and any clean shoes with smooth soles (no black marks). Dance shoes or sneakers work great. Most importantly, wear something that makes you feel good!',
  },
  {
    q: 'I have no experience. Can I still join?',
    a: 'Absolutely! Our Beginner class is designed specifically for absolute beginners. No prior dance experience needed — just bring your enthusiasm and we\'ll take care of the rest.',
  },
  {
    q: 'How do I book?',
    a: 'Just show up on the day! You can also reach out through our contact form below to secure your spot or ask any questions. We\'re always happy to help.',
  },
  {
    q: 'What levels do you offer?',
    a: 'We offer Beginner (Wednesdays at Arataki Community Centre), Intermediate (Tuesdays at Mount Community Hall), and Advanced (Thursdays). We also do private sessions for weddings and special events.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="py-24 md:py-32 bg-dark-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-mostaza/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-3xl mx-auto px-6 relative">
        <div className="text-center mb-16 reveal">
          <p className="font-script text-mostaza text-2xl mb-3">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Got <span className="gradient-text">questions</span>?
          </h2>
          <div className="gold-line mx-auto mb-8" />
        </div>

        <div className="space-y-4 stagger">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className="bg-dark/50 backdrop-blur border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-white font-display font-bold text-lg pr-4">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-mostaza flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-white/60 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
