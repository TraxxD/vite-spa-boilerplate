import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

// Hardcoded monthly BTC prices (USD) for reliable calculator fallback
// Source: CoinGecko historical data (approximate monthly close prices)
const HISTORICAL_MONTHLY = {
  '2010-07': 0.08, '2010-10': 0.10, '2010-12': 0.25,
  '2011-01': 0.30, '2011-02': 1.00, '2011-04': 1.40, '2011-06': 15.00,
  '2011-09': 5.00, '2011-12': 4.25,
  '2012-01': 6.00, '2012-06': 6.50, '2012-09': 12.00, '2012-12': 13.50,
  '2013-01': 13.30, '2013-03': 93.00, '2013-04': 135.00, '2013-06': 100.00,
  '2013-09': 140.00, '2013-11': 1100.00, '2013-12': 750.00,
  '2014-01': 800.00, '2014-03': 450.00, '2014-06': 640.00,
  '2014-09': 380.00, '2014-12': 320.00,
  '2015-01': 215.00, '2015-03': 245.00, '2015-05': 237.00, '2015-06': 250.00,
  '2015-09': 235.00, '2015-10': 315.00, '2015-12': 430.00,
  '2016-01': 370.00, '2016-03': 415.00, '2016-06': 670.00,
  '2016-09': 610.00, '2016-12': 960.00,
  '2017-01': 970.00, '2017-03': 1050.00, '2017-05': 2300.00,
  '2017-06': 2500.00, '2017-08': 4700.00, '2017-09': 4200.00,
  '2017-11': 11000.00, '2017-12': 14000.00,
  '2018-01': 10200.00, '2018-03': 7000.00, '2018-06': 6400.00,
  '2018-09': 6600.00, '2018-12': 3700.00,
  '2019-01': 3500.00, '2019-03': 4100.00, '2019-06': 11800.00,
  '2019-09': 8300.00, '2019-12': 7200.00,
  '2020-01': 9400.00, '2020-03': 6400.00, '2020-06': 9200.00,
  '2020-09': 10800.00, '2020-11': 19700.00, '2020-12': 29000.00,
  '2021-01': 33100.00, '2021-02': 45200.00, '2021-03': 58800.00,
  '2021-04': 57700.00, '2021-05': 37300.00, '2021-06': 35000.00,
  '2021-07': 41500.00, '2021-08': 47100.00, '2021-09': 43800.00,
  '2021-10': 61300.00, '2021-11': 57000.00, '2021-12': 46300.00,
  '2022-01': 38500.00, '2022-03': 45500.00, '2022-05': 31800.00,
  '2022-06': 19800.00, '2022-09': 19400.00, '2022-11': 17200.00,
  '2022-12': 16500.00,
  '2023-01': 23100.00, '2023-03': 28500.00, '2023-06': 30400.00,
  '2023-09': 27000.00, '2023-10': 34500.00, '2023-12': 42500.00,
  '2024-01': 42600.00, '2024-02': 52200.00, '2024-03': 71300.00,
  '2024-04': 60700.00, '2024-06': 62700.00, '2024-07': 66800.00,
  '2024-09': 63300.00, '2024-10': 72300.00, '2024-11': 96400.00,
  '2024-12': 93400.00,
  '2025-01': 102400.00, '2025-02': 96500.00,
}

function getHistoricalFallbackPrice(date) {
  const d = new Date(date)
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

  // Exact month match
  if (HISTORICAL_MONTHLY[key]) return HISTORICAL_MONTHLY[key]

  // Find closest month
  const keys = Object.keys(HISTORICAL_MONTHLY).sort()
  let closest = null
  let minDiff = Infinity

  for (const k of keys) {
    const [y, m] = k.split('-').map(Number)
    const kDate = new Date(y, m - 1, 15)
    const diff = Math.abs(kDate - d)
    if (diff < minDiff) {
      minDiff = diff
      closest = k
    }
  }

  return closest ? HISTORICAL_MONTHLY[closest] : null
}

function getCache(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { data, expiry } = JSON.parse(raw)
    if (Date.now() > expiry) {
      sessionStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

function setCache(key, data, ttlMs = 60000) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, expiry: Date.now() + ttlMs }))
  } catch {
    // storage full, ignore
  }
}

export default function useBitcoinData() {
  const [currentPrice, setCurrentPrice] = useState(null)
  const [change24h, setChange24h] = useState(null)
  const [historicalPrices, setHistoricalPrices] = useState(null)
  const [marketData, setMarketData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCurrentPrice = useCallback(async () => {
    const cacheKey = 'btc_current'
    const cached = getCache(cacheKey)
    if (cached) {
      setCurrentPrice(cached.price)
      setChange24h(cached.change)
      return
    }
    try {
      const { data } = await axios.get(`${COINGECKO_BASE}/simple/price`, {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd',
          include_24hr_change: true,
        },
      })
      const price = data.bitcoin.usd
      const change = data.bitcoin.usd_24h_change
      setCurrentPrice(price)
      setChange24h(change)
      setCache(cacheKey, { price, change }, 60000)
    } catch (err) {
      console.error('Failed to fetch current price:', err)
      setError('Failed to fetch price data')
    }
  }, [])

  const fetchHistorical = useCallback(async () => {
    const cacheKey = 'btc_historical_365'
    const cached = getCache(cacheKey)
    if (cached) {
      setHistoricalPrices(cached)
      return
    }
    try {
      const { data } = await axios.get(`${COINGECKO_BASE}/coins/bitcoin/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: 365,
          interval: 'daily',
        },
      })
      const prices = data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toISOString(),
        price,
      }))
      setHistoricalPrices(prices)
      setCache(cacheKey, prices, 3600000)
    } catch (err) {
      console.error('Failed to fetch historical data:', err)
    }
  }, [])

  const fetchMarketData = useCallback(async () => {
    const cacheKey = 'btc_market'
    const cached = getCache(cacheKey)
    if (cached) {
      setMarketData(cached)
      return
    }
    try {
      const { data } = await axios.get(`${COINGECKO_BASE}/coins/bitcoin`, {
        params: {
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      })
      const market = {
        marketCap: data.market_data.market_cap.usd,
        volume24h: data.market_data.total_volume.usd,
        ath: data.market_data.ath.usd,
        athDate: data.market_data.ath_date.usd,
        circulatingSupply: data.market_data.circulating_supply,
        maxSupply: data.market_data.max_supply,
      }
      setMarketData(market)
      setCache(cacheKey, market, 300000)
    } catch (err) {
      console.error('Failed to fetch market data:', err)
    }
  }, [])

  const getPriceAtDate = useCallback(async (dateStr) => {
    // dateStr format: "dd-mm-yyyy"
    const cacheKey = `btc_price_${dateStr}`
    const cached = getCache(cacheKey)
    if (cached) return cached

    const [dd, mm, yyyy] = dateStr.split('-').map(Number)
    const target = new Date(yyyy, mm - 1, dd)

    // 1. Check within our 365-day historical chart data
    if (historicalPrices && historicalPrices.length > 0) {
      const closest = historicalPrices.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.date) - target)
        const currDiff = Math.abs(new Date(curr.date) - target)
        return currDiff < prevDiff ? curr : prev
      })
      const dayDiff = Math.abs(new Date(closest.date) - target) / (1000 * 60 * 60 * 24)
      if (dayDiff < 2) {
        setCache(cacheKey, closest.price, 86400000)
        return closest.price
      }
    }

    // 2. Try CoinGecko market_chart/range for dates beyond cached range
    try {
      const fromTs = Math.floor(target.getTime() / 1000)
      const toTs = fromTs + 86400 * 3
      const { data } = await axios.get(`${COINGECKO_BASE}/coins/bitcoin/market_chart/range`, {
        params: { vs_currency: 'usd', from: fromTs, to: toTs },
      })
      if (data.prices && data.prices.length > 0) {
        const price = data.prices[0][1]
        setCache(cacheKey, price, 86400000)
        return price
      }
    } catch (err) {
      console.error('market_chart/range failed:', err.message)
    }

    // 3. Fallback: use embedded historical monthly prices
    const fallback = getHistoricalFallbackPrice(target)
    if (fallback) {
      setCache(cacheKey, fallback, 86400000)
      return fallback
    }

    return null
  }, [historicalPrices])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([fetchCurrentPrice(), fetchHistorical(), fetchMarketData()])
      setLoading(false)
    }
    init()
  }, [fetchCurrentPrice, fetchHistorical, fetchMarketData])

  useEffect(() => {
    const interval = setInterval(fetchCurrentPrice, 60000)
    return () => clearInterval(interval)
  }, [fetchCurrentPrice])

  return {
    currentPrice,
    change24h,
    historicalPrices,
    marketData,
    loading,
    error,
    getPriceAtDate,
  }
}
