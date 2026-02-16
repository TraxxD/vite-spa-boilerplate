import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

export default function PriceChart({ historicalPrices, range = '1Y' }) {
  const filteredData = useMemo(() => {
    if (!historicalPrices) return null

    const now = Date.now()
    const ranges = {
      '24H': 1,
      '7D': 7,
      '30D': 30,
      '1Y': 365,
    }
    const days = ranges[range] || 365
    const cutoff = now - days * 24 * 60 * 60 * 1000

    return historicalPrices.filter((p) => new Date(p.date).getTime() >= cutoff)
  }, [historicalPrices, range])

  if (!filteredData || filteredData.length === 0) {
    return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading chart data...</div>
  }

  const labels = filteredData.map((p) => {
    const d = new Date(p.date)
    if (range === '24H') return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (range === '7D' || range === '30D') return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
    return d.toLocaleDateString([], { month: 'short', year: '2-digit' })
  })

  const prices = filteredData.map((p) => p.price)

  const data = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: '#F7931A',
        borderWidth: 2,
        fill: true,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height)
          gradient.addColorStop(0, 'rgba(247, 147, 26, 0.2)')
          gradient.addColorStop(1, 'rgba(247, 147, 26, 0)')
          return gradient
        },
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a1a',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: 'rgba(255,255,255,0.5)',
        bodyColor: '#F7931A',
        bodyFont: { size: 14, weight: 'bold' },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: 'rgba(255,255,255,0.3)',
          font: { size: 11 },
          maxTicksLimit: 8,
        },
        border: { display: false },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
        ticks: {
          color: 'rgba(255,255,255,0.3)',
          font: { size: 11 },
          callback: (val) => `$${(val / 1000).toFixed(0)}k`,
          maxTicksLimit: 6,
        },
        border: { display: false },
      },
    },
  }

  return (
    <div style={{ height: 300, position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  )
}
