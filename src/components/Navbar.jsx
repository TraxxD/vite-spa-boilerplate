import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Explore', target: 'features' },
  { label: 'Markets', target: 'dashboard' },
  { label: 'Calculator', target: 'calculator' },
  { label: 'Timeline', target: 'timeline' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SATOSHI NOIR
        </button>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ label, target }) => (
            <button key={target} className="navbar__link" onClick={() => scrollTo(target)}>
              {label}
            </button>
          ))}
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
