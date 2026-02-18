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
    description: 'While fiat currencies lose purchasing power every year, Bitcoin holders have seen their wealth multiply. It\'s not just an asset — it\'s the hardest money ever created.',
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
    description: 'No government, no CEO, no single point of failure. Over 50,000 nodes worldwide ensure no one can freeze your funds, censor your transactions, or inflate away your savings.',
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
    description: 'Only 21 million will ever exist — and over 19.5 million are already mined. Every day you wait, the remaining supply shrinks. Mathematically scarce, permanently deflationary.',
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
    description: 'Send $1 or $1 billion anywhere on Earth in minutes, 24/7, for a fraction of traditional fees. True financial sovereignty with no permission needed.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function FeatureGrid() {
  return (
    <section className="features section" id="features" aria-labelledby="features-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">// why_bitcoin</span>
          <h2 className="section-title" id="features-heading">Built Different</h2>
          <p className="section-subtitle">
            Every other asset can be printed, diluted, or seized. Bitcoin can't. Here's why the world's sharpest investors are paying attention.
          </p>
        </motion.div>
        <div className="features__grid">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              className="features__card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
            >
              <div className="features__icon-container">
                <div className="features__icon">{feature.icon}</div>
              </div>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-desc">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
