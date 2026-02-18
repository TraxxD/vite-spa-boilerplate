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
import CtaBanner from './components/CtaBanner'
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
        title="Your Bank Prints Money. Bitcoin Can't."
        subtitle="Central banks have printed over $13 trillion since 2020. Meanwhile, Bitcoin's supply was coded in stone from day one. Which would you rather hold?"
        ctaText="Explore Our Courses"
        ctaTarget="pricing"
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
        title="Early Adopters Became Millionaires. Smart Learners Become the Next Ones."
        subtitle="The people who understood Bitcoin early changed their lives forever. Our courses give you the same edge — the knowledge that separates spectators from participants."
        ctaText="Start Learning Today"
        ctaTarget="pricing"
      />
      <Timeline />
      <Resources />
      <CtaBanner />
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
