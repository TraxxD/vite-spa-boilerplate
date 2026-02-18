import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'
import './PricingPackages.css'

const packages = [
  {
    name: 'Starter',
    price: 100,
    label: 'Begin Your Journey',
    features: [
      'Introduction to Bitcoin fundamentals and blockchain technology',
      'Learn how to set up and secure your first crypto wallet',
      'Understand market basics: reading charts, order types, and exchanges',
      'Access to beginner-friendly community forum and Q&A sessions',
    ],
    accent: 'starter',
  },
  {
    name: 'Professional',
    price: 250,
    label: 'Most Popular',
    featured: true,
    features: [
      'Advanced technical analysis: candlestick patterns, indicators, and signals',
      'Portfolio management strategies and risk assessment frameworks',
      'DeFi deep-dive: yield farming, liquidity pools, and staking protocols',
      'Weekly live trading sessions with professional analysts',
      'On-chain analysis tools and whale tracking dashboards',
    ],
    accent: 'pro',
  },
  {
    name: 'Elite',
    price: 550,
    label: 'Full Mastery',
    features: [
      'Institutional-grade trading strategies and algorithmic trading basics',
      'Private 1-on-1 mentorship sessions with industry veterans',
      'Early access to market research reports and alpha signals',
      'Tax optimization strategies and compliance guidance for crypto',
      'Lifetime access to all course updates and premium content vault',
      'Exclusive networking events with fund managers and founders',
    ],
    accent: 'elite',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function PricingPackages() {
  const [modalPkg, setModalPkg] = useState(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const openModal = (pkg) => {
    setModalPkg(pkg)
    setEmail('')
    setSubmitted(false)
    setError('')
  }

  const closeModal = () => {
    setModalPkg(null)
    setEmail('')
    setSubmitted(false)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="pricing section grid-bg" id="pricing">
      <div className="container">
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// course_packages</span>
          <h2 className="section-title">
            Invest in Your <span className="gold-text">Knowledge</span>
          </h2>
          <p className="section-subtitle">
            Choose the package that matches your experience level. From beginner fundamentals to elite trading mastery.
          </p>
        </motion.div>

        <div className="pricing__grid">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`pricing__card pricing__card--${pkg.accent} ${pkg.featured ? 'pricing__card--featured' : ''}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
            >
              {pkg.featured && <div className="pricing__badge">Most Popular</div>}
              <div className="pricing__card-header">
                <span className="pricing__name">{pkg.name}</span>
                <span className="pricing__label">{pkg.label}</span>
              </div>
              <div className="pricing__price">
                <span className="pricing__currency">$</span>
                <span className="pricing__amount mono">{pkg.price}</span>
              </div>
              <ul className="pricing__features">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="pricing__feature">
                    <svg className="pricing__check" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <MagneticButton
                className={`pricing__cta ${pkg.featured ? 'pricing__cta--gold' : ''}`}
                onClick={() => openModal(pkg)}
              >
                Get Started
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalPkg && (
          <motion.div
            className="pricing__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="pricing__modal glass-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!submitted ? (
                <>
                  <button className="pricing__modal-close" onClick={closeModal}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <h3 className="pricing__modal-title">
                    Sign up for <span className="gold-text">{modalPkg.name}</span>
                  </h3>
                  <p className="pricing__modal-price">
                    <span className="mono">${modalPkg.price}</span> one-time payment
                  </p>
                  <form className="pricing__modal-form" onSubmit={handleSubmit}>
                    <label className="pricing__modal-label" htmlFor="signup-email">
                      Email Address
                    </label>
                    <input
                      id="signup-email"
                      className="pricing__modal-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                    {error && <p className="pricing__modal-error">{error}</p>}
                    <button type="submit" className="pricing__modal-submit">
                      Sign Up Now
                    </button>
                  </form>
                </>
              ) : (
                <div className="pricing__modal-success">
                  <div className="pricing__modal-success-icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="24" cy="24" r="20" />
                      <path d="M14 24l7 7 13-13" />
                    </svg>
                  </div>
                  <h3 className="pricing__modal-title">You're all set!</h3>
                  <p className="pricing__modal-desc">
                    Successfully signed up for the <strong>{modalPkg.name}</strong> package. We'll get back to you at <strong>{email}</strong> with your course access details.
                  </p>
                  <button className="pricing__modal-submit" onClick={closeModal}>
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
