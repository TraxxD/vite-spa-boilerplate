import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Banner.css'

const variants = {
  gold: {
    gradient: 'linear-gradient(135deg, rgba(12, 10, 6, 0.85) 0%, rgba(26, 18, 8, 0.7) 30%, rgba(12, 10, 6, 0.85) 70%, rgba(9, 9, 11, 0.85) 100%)',
    accent: 'radial-gradient(ellipse at 50% 50%, rgba(247, 147, 26, 0.1) 0%, transparent 70%)',
  },
  purple: {
    gradient: 'linear-gradient(135deg, rgba(9, 9, 14, 0.85) 0%, rgba(17, 13, 26, 0.7) 30%, rgba(9, 9, 14, 0.85) 70%, rgba(9, 9, 11, 0.85) 100%)',
    accent: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
  },
}

export default function Banner({ variant = 'gold', title, subtitle, ctaText, ctaTarget }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  const style = variants[variant]

  return (
    <section className="banner" ref={ref} aria-labelledby={`banner-${variant}-title`}>
      <motion.div className="banner__bg" style={{ y, background: style.gradient }} />
      <motion.div className="banner__accent" style={{ opacity, background: style.accent }} />
      <div className="banner__content container">
        <motion.h2
          className="banner__title"
          id={`banner-${variant}-title`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="banner__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        )}
        {ctaText && (
          <motion.button
            className={`banner__cta banner__cta--${variant}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onClick={() => document.getElementById(ctaTarget)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {ctaText}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 9h10M10 5l4 4-4 4" />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  )
}
