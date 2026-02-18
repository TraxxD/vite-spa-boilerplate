import { useState } from 'react'
import { motion } from 'framer-motion'
import PriceChart from './PriceChart'
import './PriceDashboard.css'

const timeRanges = ['24H', '7D', '30D', '1Y']

function formatLargeNumber(num) {
  if (!num) return '---'
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

function formatSupply(num) {
  if (!num) return '---'
  return `${(num / 1e6).toFixed(2)}M BTC`
}

export default function PriceDashboard({ currentPrice, change24h, historicalPrices, marketData }) {
  const [range, setRange] = useState('1Y')
  const isPositive = change24h >= 0

  const stats = [
    { label: 'Market Cap', value: formatLargeNumber(marketData?.marketCap) },
    { label: '24h Volume', value: formatLargeNumber(marketData?.volume24h) },
    { label: 'All-Time High', value: marketData?.ath ? `$${marketData.ath.toLocaleString()}` : '---' },
    { label: 'Circulating Supply', value: formatSupply(marketData?.circulatingSupply) },
  ]

  return (
    <section className="dashboard section" id="dashboard" aria-labelledby="dashboard-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">// live_market_data</span>
          <h2 className="section-title" id="dashboard-heading">Price Dashboard</h2>
          <p className="section-subtitle">
            Real-time data. No delay, no middlemen. Watch the world's most volatile asset move — and learn to read the signals that matter.
          </p>
        </motion.div>

        <motion.div
          className="dashboard__card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="dashboard__header">
            <div className="dashboard__price-group">
              <span className="dashboard__price tabular-nums">
                {currentPrice ? `$${currentPrice.toLocaleString()}` : '---'}
              </span>
              {change24h != null && (
                <span className={`dashboard__change tabular-nums ${isPositive ? 'dashboard__change--up' : 'dashboard__change--down'}`}>
                  {isPositive ? '+' : ''}{change24h.toFixed(2)}%
                </span>
              )}
            </div>
            <div className="dashboard__ranges" role="tablist" aria-label="Time range">
              {timeRanges.map((r) => (
                <button
                  key={r}
                  className={`dashboard__range-btn ${range === r ? 'dashboard__range-btn--active' : ''}`}
                  onClick={() => setRange(r)}
                  role="tab"
                  aria-selected={range === r}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <PriceChart historicalPrices={historicalPrices} range={range} />
        </motion.div>

        <div className="dashboard__stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="dashboard__stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <span className="dashboard__stat-label">{stat.label}</span>
              <span className="dashboard__stat-value tabular-nums">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
