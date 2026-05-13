import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer" id="footer">
      <div className="footer-links">
        <a href="/privacy.html">{t.footer.privacy}</a>
        <a href="/Terms of service.html">{t.footer.terms}</a>
      </div>
      <p className="footer-copy">{t.footer.copyright}</p>
    </footer>
  )
}

export default Footer
