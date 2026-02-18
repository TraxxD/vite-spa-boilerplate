import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Explore', target: 'features' },
  { label: 'Markets', target: 'dashboard' },
  { label: 'Trading', target: 'candlestick' },
  { label: 'Calculator', target: 'calculator' },
  { label: 'Timeline', target: 'timeline' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const observerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.target)
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((section) => observerRef.current.observe(section))

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Main navigation">
      <div className="navbar__inner container">
        <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SATOSHI NOIR
        </button>

        <div
          className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
          id="nav-menu"
          role="navigation"
        >
          {navLinks.map(({ label, target }) => (
            <button
              key={target}
              className={`navbar__link ${activeSection === target ? 'navbar__link--active' : ''}`}
              onClick={() => scrollTo(target)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
