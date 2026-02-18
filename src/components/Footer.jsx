import './Footer.css'

const columns = [
  {
    title: 'About',
    links: [
      { label: 'What is Bitcoin', href: 'https://bitcoin.org/en/how-it-works' },
      { label: 'Whitepaper', href: 'https://bitcoin.org/bitcoin.pdf' },
      { label: 'Network Stats', href: 'https://mempool.space' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Markets', target: 'dashboard' },
      { label: 'Calculator', target: 'calculator' },
      { label: 'Timeline', target: 'timeline' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Bitcoin.org', href: 'https://bitcoin.org' },
      { label: 'Lightning Network', href: 'https://lightning.network' },
      { label: 'Block Explorer', href: 'https://mempool.space' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Risk Disclosure', target: 'disclaimer' },
      { label: 'Terms of Service' },
      { label: 'Privacy Policy' },
      { label: 'Refund Policy' },
    ],
  },
]

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__separator" />
      <div className="container">
        <div className="footer__grid">
          {columns.map((col) => (
            <div key={col.title} className="footer__column">
              <h4 className="footer__column-title">{col.title}</h4>
              <ul className="footer__list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a className="footer__link" href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : link.target ? (
                      <button className="footer__link" onClick={() => scrollTo(link.target)}>
                        {link.label}
                      </button>
                    ) : (
                      <span className="footer__link footer__link--static">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__attribution">
            Market data provided by <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko</a>
          </p>
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} SATOSHI NOIR. All rights reserved.
          </p>
        </div>

        <div className="footer__disclaimer" id="disclaimer">
          <div className="footer__disclaimer-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h4 className="footer__disclaimer-title">Risk Disclosure & Legal Disclaimer</h4>
          <p className="footer__disclaimer-text">
            <strong>No Financial Advice:</strong> The information provided on this website and within our course materials is for educational and informational purposes only. Nothing on this site constitutes financial advice, investment advice, trading advice, or any other form of professional advice. You should not treat any of the content as such.
          </p>
          <p className="footer__disclaimer-text">
            <strong>Investment Risk Warning:</strong> Cryptocurrency markets are highly volatile and carry significant risk. The value of Bitcoin and other digital assets can fluctuate dramatically, and you may lose some or all of your invested capital. Past performance is not indicative of future results. Never invest more than you can afford to lose.
          </p>
          <p className="footer__disclaimer-text">
            <strong>No Guarantees:</strong> SATOSHI NOIR does not guarantee any specific outcomes or profits from the use of our educational materials. Any examples of past earnings or performance shown on this website are not guarantees that you will achieve similar results. Individual results will vary based on market conditions, experience, and effort.
          </p>
          <p className="footer__disclaimer-text">
            <strong>Do Your Own Research:</strong> Before making any financial decisions, you should conduct your own due diligence and consult with a licensed financial advisor. We strongly recommend seeking independent financial advice that is tailored to your specific circumstances.
          </p>
          <p className="footer__disclaimer-text">
            <strong>Regulatory Notice:</strong> Cryptocurrency regulations vary by jurisdiction. It is your responsibility to ensure compliance with all applicable laws and regulations in your country or region. SATOSHI NOIR is not registered as a securities broker-dealer or investment adviser with any financial regulatory authority.
          </p>
          <p className="footer__disclaimer-text footer__disclaimer-text--muted">
            By using this website and purchasing any course materials, you acknowledge that you have read, understood, and agree to this disclaimer. You accept full responsibility for your own investment decisions and their outcomes.
          </p>
        </div>
      </div>
    </footer>
  )
}
