import { useEffect, useRef } from 'react'

const PARTICLE_COLORS = ['#ff926b', '#87ddfe', '#acaaff', '#1bffc2', '#f9a5fe']
const PARTICLE_COUNT = 10
const BITCOIN_SYMBOL = '\u20BF'

export default function BitcoinParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')

    let animationId
    let particles = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticle() {
      const size = Math.random() * 38 + 2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        speedX: (Math.random() * 0.8),
        speedY: (Math.random() * 0.2),
        opacity: 0.6 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      }
    }

    function init() {
      resize()
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle())
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.font = `bold ${p.size}px "Space Grotesk", "Segoe UI", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = p.color
        ctx.fillText(BITCOIN_SYMBOL, 0, 0)

        ctx.restore()
      }
    }

    function update() {
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        if (p.x > canvas.width + p.size) p.x = -p.size
        if (p.x < -p.size) p.x = canvas.width + p.size
        if (p.y > canvas.height + p.size) p.y = -p.size
        if (p.y < -p.size) p.y = canvas.height + p.size
      }
    }

    function animate() {
      update()
      draw()
      animationId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
