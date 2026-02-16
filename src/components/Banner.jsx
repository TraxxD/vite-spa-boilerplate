import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Banner.css'

const variants = {
  gold: {
    gradient: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 30%, #1a1000 70%, #0d0800 100%)',
    accent: 'radial-gradient(ellipse at 50% 50%, rgba(247, 147, 26, 0.15) 0%, transparent 70%)',
  },
  purple: {
    gradient: 'linear-gradient(135deg, #0d0015 0%, #1a0030 30%, #0d0015 70%, #050008 100%)',
    accent: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
  },
}

export default function Banner({ variant = 'gold', title, subtitle }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const style = variants[variant]

  return (
    <section className="banner" ref={ref}>
      <motion.div className="banner__bg" style={{ y, background: style.gradient }} />
      <div className="banner__accent" style={{ background: style.accent }} />
      <div className="banner__content container">
        <motion.h2
          className="banner__title"
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
      </div>
    </section>
  )
}
