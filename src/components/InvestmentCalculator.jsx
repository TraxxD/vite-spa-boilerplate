import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './InvestmentCalculator.css'

const presets = [
  { label: '1 Year Ago', years: 1 },
  { label: '5 Years Ago', years: 5 },
  { label: '10 Years Ago', years: 10 },
]

function getDateStr(yearsAgo) {
  const d = new Date()
  d.setFullYear(d.getFullYear() - yearsAgo)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

function formatInputDate(yearsAgo) {
  const d = new Date()
  d.setFullYear(d.getFullYear() - yearsAgo)
  return d.toISOString().split('T')[0]
}

function fireConfetti() {
  const defaults = {
    colors: ['#F7931A', '#f9a94b', '#00d672', '#ffffff'],
    spread: 80,
    ticks: 100,
    gravity: 0.8,
    scalar: 1.2,
    shapes: ['circle', 'square'],
  }

  confetti({ ...defaults, particleCount: 40, origin: { x: 0.3, y: 0.6 } })
  confetti({ ...defaults, particleCount: 40, origin: { x: 0.7, y: 0.6 } })

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 25, origin: { x: 0.5, y: 0.5 }, spread: 120 })
  }, 150)
}

export default function InvestmentCalculator({ currentPrice, getPriceAtDate }) {
  const [amount, setAmount] = useState('1000')
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [customDate, setCustomDate] = useState('')
  const [result, setResult] = useState(null)
  const [calculating, setCalculating] = useState(false)

  const handleCalculate = async () => {
    if (!amount || (!selectedPreset && !customDate)) return
    setCalculating(true)
    setResult(null)

    let dateStr
    if (selectedPreset !== null) {
      dateStr = getDateStr(presets[selectedPreset].years)
    } else if (customDate) {
      const [yyyy, mm, dd] = customDate.split('-')
      dateStr = `${dd}-${mm}-${yyyy}`
    }

    const pastPrice = await getPriceAtDate(dateStr)

    if (pastPrice && currentPrice) {
      const invested = parseFloat(amount)
      const btcBought = invested / pastPrice
      const currentValue = btcBought * currentPrice
      const gain = ((currentValue - invested) / invested) * 100

      setResult({
        invested,
        pastPrice,
        btcBought,
        currentValue,
        gain,
      })

      // Fire confetti on positive gains
      if (gain > 0) {
        fireConfetti()
      }
    } else {
      setResult({ error: true })
    }
    setCalculating(false)
  }

  return (
    <section className="calculator section grid-bg" id="calculator">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// time_machine</span>
          <h2 className="section-title">What If You Invested?</h2>
          <p className="section-subtitle">
            See how your investment would have grown over time.
          </p>
        </motion.div>

        <motion.div
          className="calculator__card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="calculator__inputs">
            <div className="calculator__field">
              <label className="calculator__label">Investment Amount</label>
              <div className="calculator__input-wrapper">
                <span className="calculator__currency">$</span>
                <input
                  type="number"
                  className="calculator__input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1000"
                  min="1"
                />
              </div>
            </div>

            <div className="calculator__field">
              <label className="calculator__label">When?</label>
              <div className="calculator__presets">
                {presets.map((p, i) => (
                  <button
                    key={p.label}
                    className={`calculator__preset ${selectedPreset === i ? 'calculator__preset--active' : ''}`}
                    onClick={() => {
                      setSelectedPreset(i)
                      setCustomDate('')
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="calculator__custom-date">
                <span className="calculator__or">or pick a date</span>
                <input
                  type="date"
                  className="calculator__date-input"
                  value={customDate}
                  onChange={(e) => {
                    setCustomDate(e.target.value)
                    setSelectedPreset(null)
                  }}
                  max={formatInputDate(0)}
                  min="2010-07-18"
                />
              </div>
            </div>
          </div>

          <button
            className="calculator__submit"
            onClick={handleCalculate}
            disabled={calculating || (!selectedPreset && selectedPreset !== 0 && !customDate)}
          >
            {calculating ? 'Calculating...' : 'Calculate'}
          </button>

          <AnimatePresence>
            {result && !result.error && (
              <motion.div
                className="calculator__result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="calculator__result-row">
                  <span className="calculator__result-label">You invested</span>
                  <span className="calculator__result-value mono">${result.invested.toLocaleString()}</span>
                </div>
                <div className="calculator__result-row">
                  <span className="calculator__result-label">BTC price then</span>
                  <span className="calculator__result-value mono">${result.pastPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="calculator__result-row">
                  <span className="calculator__result-label">BTC purchased</span>
                  <span className="calculator__result-value mono">{result.btcBought.toFixed(6)} BTC</span>
                </div>
                <div className="calculator__result-divider" />
                <div className="calculator__result-row calculator__result-row--highlight">
                  <span className="calculator__result-label">Current value</span>
                  <span className="calculator__result-value calculator__result-value--gold mono">
                    ${result.currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="calculator__result-row">
                  <span className="calculator__result-label">Return</span>
                  <span className={`calculator__result-value mono ${result.gain >= 0 ? 'calculator__result-value--green' : 'calculator__result-value--red'}`}>
                    {result.gain >= 0 ? '+' : ''}{result.gain.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            )}
            {result?.error && (
              <motion.div
                className="calculator__error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Could not fetch price data for that date. Try a different date.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
