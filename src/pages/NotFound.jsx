import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 700,
        color: '#F7931A',
        marginBottom: '0.5rem',
        lineHeight: 1,
      }}>
        404
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.5)',
        marginBottom: '2rem',
      }}>
        This block doesn&apos;t exist on the chain.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          background: '#F7931A',
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
