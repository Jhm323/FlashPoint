const NAV_LINKS = [
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Events',  href: 'events.html'  },
  { label: 'About',   href: 'about.html'   },
  { label: 'Connect', href: 'connect.html' },
];

function buildNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const desktopLinks = NAV_LINKS.map(({ label, href }) => {
    const active = currentPage === href ? ' is-active' : '';
    return `<a class="nav__link${active}" href="${href}">${label}</a>`;
  }).join('');

  const overlayLinks = NAV_LINKS.map(({ label, href }) =>
    `<a class="nav__overlay-link" href="${href}">${label}</a>`
  ).join('');

  const html = `
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <a class="nav__logo" href="index.html">FLASH<span>POINT</span></a>
      <div class="nav__links">${desktopLinks}</div>
      <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
    </nav>
    <div class="nav__overlay" role="dialog" aria-label="Mobile navigation">
      ${overlayLinks}
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);
  initNavToggle();
}

function initNavToggle() {
  const toggle  = document.querySelector('.nav__toggle');
  const overlay = document.querySelector('.nav__overlay');

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

document.addEventListener('DOMContentLoaded', buildNav);
