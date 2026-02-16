import { motion } from 'framer-motion'
import './Timeline.css'

const milestones = [
  {
    year: '2009',
    title: 'Genesis Block',
    description: 'Satoshi Nakamoto mines the first Bitcoin block, embedding a newspaper headline about bank bailouts.',
  },
  {
    year: '2010',
    title: 'Pizza Day',
    description: 'Laszlo Hanyecz pays 10,000 BTC for two pizzas — the first real-world Bitcoin transaction, valued at $41.',
  },
  {
    year: '2013',
    title: 'First $1,000',
    description: 'Bitcoin crosses $1,000 for the first time, gaining mainstream media attention worldwide.',
  },
  {
    year: '2017',
    title: 'The Bull Run',
    description: 'Bitcoin reaches nearly $20,000, ICO mania peaks, and crypto enters the public consciousness.',
  },
  {
    year: '2021',
    title: 'Institutional Adoption',
    description: 'Bitcoin hits $69,000. Tesla, MicroStrategy, and El Salvador embrace Bitcoin. NFTs explode.',
  },
  {
    year: '2024',
    title: 'Six Figures',
    description: 'Bitcoin ETFs approved, halving event occurs, and BTC surpasses $100,000 for the first time.',
  },
]

export default function Timeline() {
  return (
    <section className="timeline section" id="timeline">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">History</span>
          <h2 className="section-title">The Bitcoin Journey</h2>
        </motion.div>

        <div className="timeline__track">
          <div className="timeline__line" />
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="timeline__dot" />
              <div className="timeline__card">
                <span className="timeline__year">{m.year}</span>
                <h3 className="timeline__card-title">{m.title}</h3>
                <p className="timeline__card-desc">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
