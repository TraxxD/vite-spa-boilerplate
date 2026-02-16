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
      { label: 'Not financial advice' },
      { label: 'Open source' },
      { label: 'MIT License' },
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
            &copy; {new Date().getFullYear()} SATOSHI NOIR. All data is for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
