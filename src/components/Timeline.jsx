import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: '2009',
    title: 'Genesis Block',
    description: 'Satoshi Nakamoto mines the first Bitcoin block, embedding a newspaper headline about bank bailouts.',
    price: '$0',
  },
  {
    year: '2010',
    title: 'Pizza Day',
    description: 'Laszlo Hanyecz pays 10,000 BTC for two pizzas — the first real-world Bitcoin transaction, valued at $41.',
    price: '$0.0025',
  },
  {
    year: '2013',
    title: 'First $1,000',
    description: 'Bitcoin crosses $1,000 for the first time, gaining mainstream media attention worldwide.',
    price: '$1,000',
  },
  {
    year: '2017',
    title: 'The Bull Run',
    description: 'Bitcoin reaches nearly $20,000, ICO mania peaks, and crypto enters the public consciousness.',
    price: '$19,783',
  },
  {
    year: '2021',
    title: 'Institutional Adoption',
    description: 'Bitcoin hits $69,000. Tesla, MicroStrategy, and El Salvador embrace Bitcoin. NFTs explode.',
    price: '$69,000',
  },
  {
    year: '2024',
    title: 'Six Figures',
    description: 'Bitcoin ETFs approved, halving event occurs, and BTC surpasses $100,000 for the first time.',
    price: '$100,000+',
  },
]

export default function Timeline() {
  const trackRef = useRef(null)
  const lineRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!trackRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      // Animate the gold line growing downward
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      )

      // Animate each card
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const isLeft = i % 2 === 0

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -60 : 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Animate the dot
        const dot = card.querySelector('.timeline__dot')
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, trackRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="timeline section grid-bg" id="timeline">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// protocol_history</span>
          <h2 className="section-title">The Bitcoin Journey</h2>
          <p className="section-subtitle">
            From $0 to $100,000+ in 15 years. Every milestone was called "too late" by skeptics. The next chapter is unwritten — will you be in it?
          </p>
        </motion.div>

        <div className="timeline__track" ref={trackRef}>
          <div className="timeline__line" ref={lineRef} />
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className="timeline__dot" />
              <div className="timeline__card glass-card">
                <div className="timeline__card-header">
                  <span className="timeline__year">{m.year}</span>
                  <span className="timeline__price">{m.price}</span>
                </div>
                <h3 className="timeline__card-title">{m.title}</h3>
                <p className="timeline__card-desc">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="timeline__conclusion"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="timeline__conclusion-text">
            At every milestone, people said it was too late. They were wrong every single time.
          </p>
          <button
            className="timeline__conclusion-cta"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Don't Be Late This Time
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 9h10M10 5l4 4-4 4" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
