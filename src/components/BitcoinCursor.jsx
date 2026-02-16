import { useEffect, useRef, useState } from 'react'

export default function BitcoinCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(${hovering ? 1.5 : 1})`
      requestAnimationFrame(animate)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, input, select, [role="button"]')) {
        setHovering(true)
      }
    }
    const onOut = () => setHovering(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [hovering])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#F7931A',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(247, 147, 26, 0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'transform 0.15s ease, opacity 0.2s',
          opacity: hovering ? 0.8 : 0.4,
        }}
      />
    </>
  )
}
