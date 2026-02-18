import { motion } from 'framer-motion'
import './CandlestickChart.css'

export default function CandlestickChart() {
  return (
    <section className="candlestick section" id="candlestick" aria-labelledby="candlestick-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">// live_market_feed</span>
          <h2 className="section-title" id="candlestick-heading">Trading View</h2>
        </motion.div>
      </div>

      <div className="candlestick__fullwidth">
        <motion.div
          className="candlestick__card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="candlestick__header">
            <span className="candlestick__live-badge">
              <span className="candlestick__live-dot" />
              LIVE
            </span>
          </div>
          <iframe
            className="candlestick__chart"
            src="https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22frameElementId%22%3A%22tradingview_btc%22%2C%22interval%22%3A%22D%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22calendar%22%3A%220%22%2C%22studies%22%3A%5B%5D%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22withdateranges%22%3A%221%22%7D"
            frameBorder="0"
            allowTransparency="true"
            allowFullScreen
            title="TradingView BTCUSDT Chart"
          />
        </motion.div>
      </div>
    </section>
  )
}
