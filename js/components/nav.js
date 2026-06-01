const NAV_LINKS = [
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Events',  href: 'events.html'  },
  { label: 'About',   href: 'about.html'   },
  { label: 'Connect', href: 'connect.html' },
];

function buildNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const desktopLinks = NAV_LINKS.map(({ label, href }) => {
    const isActive = currentPage === href;
    const activeAttrs = isActive ? ' class="nav__link is-active" aria-current="page"' : ' class="nav__link"';
    return `<a${activeAttrs} href="${href}">${label}</a>`;
  }).join('');

  const overlayLinks = NAV_LINKS.map(({ label, href }) =>
    `<a class="nav__overlay-link" href="${href}">${label}</a>`
  ).join('');

  const html = `
    <a class="skip-link" href="#main">Skip to main content</a>
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <a class="nav__logo" href="index.html" aria-label="Flashpoint — home">FLASH<span>POINT</span></a>
      <div class="nav__links">${desktopLinks}</div>
      <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-overlay">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
    </nav>
    <div class="nav__overlay" id="nav-overlay" role="dialog" aria-label="Mobile navigation" aria-modal="true">
      <div class="nav__overlay-links">${overlayLinks}</div>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);
  initNavToggle();
}

function initNavToggle() {
  const toggle  = document.querySelector('.nav__toggle');
  const overlay = document.querySelector('.nav__overlay');
  const firstLink = overlay.querySelector('a');

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen && firstLink) firstLink.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      overlay.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', buildNav);
