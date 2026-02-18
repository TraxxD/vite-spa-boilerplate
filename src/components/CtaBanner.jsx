import { useState } from 'react'
import { motion } from 'framer-motion'
import './CtaBanner.css'

export default function CtaBanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

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
    <section className="cta-banner">
      <div className="cta-banner__glow" />
      <div className="container">
        <motion.div
          className="cta-banner__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">// don't_miss_out</span>
          <h2 className="cta-banner__title">
            The Best Time to Learn Was Yesterday.<br />
            The Second Best Time Is <span className="gold-text">Now.</span>
          </h2>
          <p className="cta-banner__desc">
            Get free weekly insights on Bitcoin markets, trading strategies, and course updates delivered straight to your inbox. No spam — just alpha.
          </p>

          {!submitted ? (
            <form className="cta-banner__form" onSubmit={handleSubmit}>
              <div className="cta-banner__input-group">
                <input
                  type="email"
                  className="cta-banner__input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="cta-banner__submit">
                  Get Free Insights
                </button>
              </div>
              {error && <p className="cta-banner__error">{error}</p>}
              <p className="cta-banner__privacy">
                Join 12,000+ subscribers. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <motion.div
              className="cta-banner__success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
                <circle cx="24" cy="24" r="20" />
                <path d="M14 24l7 7 13-13" />
              </svg>
              <p>You're in! Check your inbox for a welcome email.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
