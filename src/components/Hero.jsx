import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import BitcoinCoin3D from './BitcoinCoin3D'
import MagneticButton from './MagneticButton'
import './Hero.css'

function formatPrice(price) {
  if (!price) return '---'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function Hero({ currentPrice, change24h }) {
  const isPositive = change24h >= 0
  const [pulse, setPulse] = useState(false)
  const prevPrice = useRef(currentPrice)

  // Trigger pulse animation when price changes
  useEffect(() => {
    if (currentPrice && prevPrice.current && currentPrice !== prevPrice.current) {
      setPulse(true)
      const timer = setTimeout(() => setPulse(false), 1000)
      prevPrice.current = currentPrice
      return () => clearTimeout(timer)
    }
    prevPrice.current = currentPrice
  }, [currentPrice])

  return (
    <section className="hero grid-bg" id="hero">
      <div className="hero__inner container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="section-label">// digital_gold_standard</span>
          <h1 className="hero__title">
            Don't Just Watch<br />History. <span className="gold-text">Own It.</span>
          </h1>
          <div className="hero__price">
            <span className={`hero__price-value mono ${pulse ? 'hero__price-value--pulse' : ''}`}>
              {currentPrice ? formatPrice(currentPrice) : '---'}
            </span>
            {change24h != null && (
              <span className={`hero__price-change ${isPositive ? 'hero__price-change--up' : 'hero__price-change--down'}`}>
                <span className={`hero__price-dot ${isPositive ? 'hero__price-dot--green' : 'hero__price-dot--red'}`} />
                {isPositive ? '+' : ''}{change24h.toFixed(2)}%
              </span>
            )}
          </div>
          <p className="hero__description">
            Bitcoin turned $100 into $75 million in 15 years. The next chapter is being written right now —
            and the only question is whether you'll be part of it. Master the asset that's redefining wealth.
          </p>
          <div className="hero__actions">
            <MagneticButton
              className="hero__cta"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Learning Now
            </MagneticButton>
            <MagneticButton
              className="hero__cta hero__cta--outline"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See What You Missed
            </MagneticButton>
            <MagneticButton
              className="hero__cta hero__cta--outline"
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Live Markets
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="hero__coin"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          <BitcoinCoin3D />
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
