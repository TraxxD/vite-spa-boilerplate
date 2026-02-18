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
          <p className="footer__disclaimer-text">
            The information provided on this website and in our courses is for educational and informational purposes only. Nothing presented constitutes financial, investment, legal, or tax advice. Cryptocurrency trading and investing involve significant risk. Prices are highly volatile, and you may lose part or all of your capital. Past performance does not guarantee future results. We do not provide personalized investment recommendations, and we are not registered financial advisors or brokers. You are solely responsible for your financial decisions. Before making any investment, you should conduct your own research and consult with a qualified financial professional. By purchasing or accessing our content, you acknowledge and accept these risks.
          </p>
        </div>
      </div>
    </footer>
  )
}
