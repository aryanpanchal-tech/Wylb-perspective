import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer" id="footer">
      <div className="footer-links">
        <a href="/privacy.html">{t.footer.privacy}</a>
        <a href="/TermsOfService.html">{t.footer.terms}</a>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>

        <a href="mailto:dekock.matt@gmail.com">
          Email: Place@holderemail.ca
        </a>

        <a href="https://www.instagram.com/wyldstudio/" target="_blank" rel="noreferrer">
          Instagram
        </a>

        <a href="https://www.youtube.com/@WYLDPERSPECTIVESTUDIOSINC" target="_blank" rel="noreferrer">
          YouTube
        </a>
      </div>

      <p className="footer-copy">{t.footer.copyright}</p>
    </footer>
  )
}

export default Footer