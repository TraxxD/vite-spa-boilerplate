import { motion } from 'framer-motion'
import './FeatureGrid.css'

const features = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="36" height="28" rx="3" />
        <path d="M6 18h36" />
        <circle cx="24" cy="30" r="5" />
        <path d="M22 30h4M24 28v4" />
      </svg>
    ),
    title: 'Digital Gold',
    description: 'A store of value for the digital age. Bitcoin\'s scarcity and durability make it the modern equivalent of precious metals.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <circle cx="16" cy="20" r="3" />
        <circle cx="32" cy="20" r="3" />
        <circle cx="24" cy="32" r="3" />
        <path d="M18.5 21.5l4 8.5M29.5 21.5l-4 8.5M19 20h10" />
      </svg>
    ),
    title: 'Decentralized',
    description: 'No single entity controls Bitcoin. A global network of nodes ensures transparency, security, and censorship resistance.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 38V22l16-12 16 12v16" />
        <path d="M14 38V26h8v12" />
        <path d="M28 30h6M28 34h6" />
        <path d="M8 38h32" />
      </svg>
    ),
    title: 'Limited Supply',
    description: 'Only 21 million Bitcoin will ever exist. This mathematical scarcity creates a deflationary asset unlike any fiat currency.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M6 24h36" />
        <ellipse cx="24" cy="24" rx="10" ry="18" />
        <path d="M10 14h28M10 34h28" />
      </svg>
    ),
    title: 'Borderless',
    description: 'Send value anywhere in the world, anytime. No intermediaries, no borders, no restrictions on financial freedom.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function FeatureGrid() {
  return (
    <section className="features section grid-bg" id="features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// why_bitcoin</span>
          <h2 className="section-title">Built Different</h2>
        </motion.div>
        <div className="features__grid">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="features__card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
            >
              <div className="features__icon">{feature.icon}</div>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
