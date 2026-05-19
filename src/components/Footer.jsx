import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer" id="footer">
      <div className="footer-links">
        <a href="/privacy.html">{t.footer.privacy}</a>
        <a href="/terms">{t.footer.terms}</a>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>

        <a href="mailto:dekock.matt@gmail.com" className="footer-contact-item">
          <img src="/Images/email-icon-transparent.png" alt="" />
          <span>Email: Place@holderemail.ca</span>
        </a>

        <a
          href="https://www.instagram.com/wyld_perspective.ca/"
          target="_blank"
          rel="noreferrer"
          className="footer-contact-item"
        >
          <img src="/Images/instagram-icon-transparent.png" alt="" />
          <span>Instagram</span>
        </a>

        <a
          href="https://www.youtube.com/@WYLDPERSPECTIVESTUDIOSINC"
          target="_blank"
          rel="noreferrer"
          className="footer-contact-item"
        >
          <img src="/Images/youtube-icon-transparent.png" alt="" />
          <span>YouTube</span>
        </a>
      </div>

      <p className="footer-copy">{t.footer.copyright}</p>
    </footer>
  )
}

export default Footer