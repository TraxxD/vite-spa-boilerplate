import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-section)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-sans)',
      textAlign: 'center',
      padding: 'var(--space-8)',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 700,
        color: 'var(--color-accent)',
        marginBottom: 'var(--space-2)',
        lineHeight: 1,
      }}>
        404
      </h1>
      <p style={{
        fontSize: 'var(--text-lg)',
        color: 'var(--color-text-tertiary)',
        marginBottom: 'var(--space-8)',
      }}>
        This block doesn&apos;t exist on the chain.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          minHeight: '48px',
          padding: '0.75rem 2rem',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--color-bg-primary)',
          background: 'var(--color-accent)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          lineHeight: '24px',
          transition: 'opacity 0.2s',
        }}
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
