import { useEffect, useRef, useState } from 'react'
import { createChart, CandlestickSeries } from 'lightweight-charts'
import { motion } from 'framer-motion'
import './CandlestickChart.css'

// Generate OHLC data from price points
function generateOHLC(prices, interval) {
  if (!prices || prices.length === 0) return []

  const bucketMs = {
    '1H': 3600000,
    '4H': 4 * 3600000,
    '1D': 86400000,
    '1W': 7 * 86400000,
  }
  const ms = bucketMs[interval] || 86400000
  const buckets = new Map()

  prices.forEach((p) => {
    const t = new Date(p.date).getTime()
    const bucket = Math.floor(t / ms) * ms
    if (!buckets.has(bucket)) {
      buckets.set(bucket, { time: bucket / 1000, open: p.price, high: p.price, low: p.price, close: p.price })
    } else {
      const b = buckets.get(bucket)
      b.high = Math.max(b.high, p.price)
      b.low = Math.min(b.low, p.price)
      b.close = p.price
    }
  })

  return Array.from(buckets.values()).sort((a, b) => a.time - b.time)
}

const intervals = ['1D', '1W']

export default function CandlestickChart({ historicalPrices }) {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)
  const [interval, setInterval] = useState('1D')

  // Initialize chart
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
        timeVisible: true,
        secondsVisible: false,
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

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      chart.applyOptions({ width, height })
    })
    resizeObserver.observe(chartContainerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [])

  // Update data when prices or interval changes
  useEffect(() => {
    if (!seriesRef.current || !historicalPrices) return
    const ohlc = generateOHLC(historicalPrices, interval)
    seriesRef.current.setData(ohlc)
    chartRef.current?.timeScale().fitContent()
  }, [historicalPrices, interval])

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
              {intervals.map((iv) => (
                <button
                  key={iv}
                  className={`candlestick__interval ${interval === iv ? 'candlestick__interval--active' : ''}`}
                  onClick={() => setInterval(iv)}
                >
                  {iv}
                </button>
              ))}
            </div>
          </div>
          <div className="candlestick__chart" ref={chartContainerRef} />
        </motion.div>
      </div>
    </section>
  )
}
