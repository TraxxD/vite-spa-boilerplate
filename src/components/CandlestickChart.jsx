import { useEffect, useRef, useState, useCallback } from 'react'
import { createChart, CandlestickSeries } from 'lightweight-charts'
import { motion } from 'framer-motion'
import axios from 'axios'
import './CandlestickChart.css'

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

const ranges = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '180D', days: 180 },
  { label: '1Y', days: 365 },
]

function getOhlcCache(days) {
  try {
    const raw = sessionStorage.getItem(`btc_ohlc_${days}`)
    if (!raw) return null
    const { data, expiry } = JSON.parse(raw)
    if (Date.now() > expiry) {
      sessionStorage.removeItem(`btc_ohlc_${days}`)
      return null
    }
    return data
  } catch {
    return null
  }
}

function setOhlcCache(days, data) {
  try {
    // Cache for 15 minutes
    sessionStorage.setItem(
      `btc_ohlc_${days}`,
      JSON.stringify({ data, expiry: Date.now() + 900000 })
    )
  } catch {
    // storage full
  }
}

export default function CandlestickChart() {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)
  const [activeRange, setActiveRange] = useState('30D')
  const [ohlcData, setOhlcData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  const fetchOHLC = useCallback(async (days) => {
    const cached = getOhlcCache(days)
    if (cached) {
      setOhlcData(cached)
      setLoading(false)
      setFetchError(false)
      return
    }

    setLoading(true)
    setFetchError(false)

    try {
      const { data } = await axios.get(`${COINGECKO_BASE}/coins/bitcoin/ohlc`, {
        params: { vs_currency: 'usd', days },
      })

      // CoinGecko returns [[timestamp, open, high, low, close], ...]
      // lightweight-charts needs { time (unix seconds), open, high, low, close }
      // For daily candles we need to deduplicate by day
      const dayMap = new Map()
      data.forEach(([timestamp, open, high, low, close]) => {
        const dayKey = Math.floor(timestamp / 86400000) * 86400
        if (!dayMap.has(dayKey)) {
          dayMap.set(dayKey, { time: dayKey, open, high, low, close })
        } else {
          const existing = dayMap.get(dayKey)
          existing.high = Math.max(existing.high, high)
          existing.low = Math.min(existing.low, low)
          existing.close = close
        }
      })

      const candles = Array.from(dayMap.values()).sort((a, b) => a.time - b.time)

      setOhlcData(candles)
      setOhlcCache(days, candles)
      setFetchError(false)
    } catch (err) {
      console.error('Failed to fetch OHLC data:', err)
      setFetchError(true)
    }
    setLoading(false)
  }, [])

  // Fetch data when range changes
  useEffect(() => {
    const range = ranges.find((r) => r.label === activeRange)
    if (range) fetchOHLC(range.days)
  }, [activeRange, fetchOHLC])

  // Initialize chart once
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.4)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      crosshair: {
        vertLine: { color: 'rgba(247, 147, 26, 0.3)', width: 1, style: 2 },
        horzLine: { color: 'rgba(247, 147, 26, 0.3)', width: 1, style: 2 },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
      },
      handleScroll: { vertTouchDrag: false },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#00d672',
      downColor: '#ff3b3b',
      borderUpColor: '#00d672',
      borderDownColor: '#ff3b3b',
      wickUpColor: 'rgba(0, 214, 114, 0.5)',
      wickDownColor: 'rgba(255, 59, 59, 0.5)',
    })

    chartRef.current = chart
    seriesRef.current = series

    const el = chartContainerRef.current
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      chart.applyOptions({ width, height })
    })
    resizeObserver.observe(el)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [])

  // Update chart data
  useEffect(() => {
    if (!seriesRef.current || ohlcData.length === 0) return
    seriesRef.current.setData(ohlcData)
    chartRef.current?.timeScale().fitContent()
  }, [ohlcData])

  return (
    <section className="candlestick section grid-bg" id="candlestick">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// live_market_feed</span>
          <h2 className="section-title">Trading View</h2>
        </motion.div>

        <motion.div
          className="candlestick__card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="candlestick__header">
            <div className="candlestick__pair">
              <span className="candlestick__symbol">BTC</span>
              <span className="candlestick__slash">/</span>
              <span className="candlestick__quote">USD</span>
            </div>
            <div className="candlestick__intervals">
              {ranges.map((r) => (
                <button
                  key={r.label}
                  className={`candlestick__interval ${activeRange === r.label ? 'candlestick__interval--active' : ''}`}
                  onClick={() => setActiveRange(r.label)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {fetchError && (
            <div className="candlestick__error">
              Failed to load chart data. CoinGecko API may be rate-limited — try again in a moment.
            </div>
          )}

          <div
            className="candlestick__chart"
            ref={chartContainerRef}
            style={{ opacity: loading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
