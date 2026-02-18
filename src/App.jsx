import { Routes, Route } from 'react-router-dom'
import useBitcoinData from './hooks/useBitcoinData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import Banner from './components/Banner'
import PriceDashboard from './components/PriceDashboard'
import CandlestickChart from './components/CandlestickChart'
import PricingPackages from './components/PricingPackages'
import InvestmentCalculator from './components/InvestmentCalculator'
import Timeline from './components/Timeline'
import Resources from './components/Resources'
import Footer from './components/Footer'
import BitcoinCursor from './components/BitcoinCursor'
import BitcoinParticles from './components/BitcoinParticles'
import NotFound from './pages/NotFound'
import './App.css'

function MainPage({ data }) {
  return (
    <div className="app">
      <BitcoinParticles />
      <BitcoinCursor />
      <Navbar />
      <Hero currentPrice={data.currentPrice} change24h={data.change24h} />
      <FeatureGrid />
      <Banner
        variant="gold"
        title="Sound Money for a Digital World"
        subtitle="In an era of unlimited money printing, Bitcoin offers mathematical certainty. 21 million — forever."
      />
      <PriceDashboard
        currentPrice={data.currentPrice}
        change24h={data.change24h}
        historicalPrices={data.historicalPrices}
        marketData={data.marketData}
      />
      <CandlestickChart />
      <PricingPackages />
      <InvestmentCalculator
        currentPrice={data.currentPrice}
        getPriceAtDate={data.getPriceAtDate}
      />
      <Banner
        variant="purple"
        title="Every Block Tells a Story"
        subtitle="From the genesis block to today, Bitcoin's blockchain is an immutable record of financial revolution."
      />
      <Timeline />
      <Resources />
      <Footer />
    </div>
  )
}

function App() {
  const data = useBitcoinData()

  return (
    <Routes>
      <Route path="/" element={<MainPage data={data} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
