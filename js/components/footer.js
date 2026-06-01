const FOOTER_LINKS = [
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Events',  href: 'events.html'  },
  { label: 'About',   href: 'about.html'   },
  { label: 'Connect', href: 'connect.html' },
];

function buildFooter() {
  const year = new Date().getFullYear();

  const navLinks = FOOTER_LINKS.map(({ label, href }) =>
    `<a class="footer__nav-link" href="${href}">${label}</a>`
  ).join('');

  const html = `
    <footer class="footer" role="contentinfo">
      <div class="footer__inner">
        <div class="footer__brand">
          <a class="footer__logo" href="index.html" aria-label="Flashpoint — home">FLASH<span>POINT</span></a>
          <p class="footer__tagline">A South Philly home for outsider art and community gatherings.</p>
          <address class="footer__address">
            <a href="mailto:flashpointphilly@gmail.com">flashpointphilly@gmail.com</a>
          </address>
        </div>
        <nav class="footer__nav" aria-label="Footer navigation">
          ${navLinks}
        </nav>
      </div>
      <div class="footer__bottom">
        <p class="footer__copy text-label">© ${year} Flashpoint Gallery & Community Space</p>
        <a class="footer__credit text-label" href="https://github.com/jhm323" target="_blank" rel="noopener">Site by JHM ↗</a>
      </div>
    </footer>
  `;

  const main = document.querySelector('main');
  main.insertAdjacentHTML('afterend', html);
}

document.addEventListener('DOMContentLoaded', buildFooter);
