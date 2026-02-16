import { motion } from 'framer-motion'
import './Resources.css'

const resources = [
  {
    title: 'Learn Bitcoin',
    description: 'Understand the technology, economics, and philosophy behind the world\'s first cryptocurrency.',
    cta: 'Start Learning',
    href: 'https://bitcoin.org/en/getting-started',
  },
  {
    title: 'Start Investing',
    description: 'Ready to buy your first Bitcoin? Learn about wallets, exchanges, and best practices.',
    cta: 'Get Started',
    href: 'https://bitcoin.org/en/buy',
  },
  {
    title: 'Security Guide',
    description: 'Protect your investment. Learn about cold storage, seed phrases, and operational security.',
    cta: 'Stay Safe',
    href: 'https://bitcoin.org/en/secure-your-wallet',
  },
]

export default function Resources() {
  return (
    <section className="resources section grid-bg" id="resources">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// get_started</span>
          <h2 className="section-title">Resources</h2>
        </motion.div>

        <div className="resources__grid">
          {resources.map((r, i) => (
            <motion.a
              key={r.title}
              className="resources__card"
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="resources__card-title">{r.title}</h3>
              <p className="resources__card-desc">{r.description}</p>
              <span className="resources__cta">
                {r.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
