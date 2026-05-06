const REVEAL_SELECTORS = [
  '.pillar',
  '.space-item',
  '.event-item',
  '.event-card',
  '.work-item',
  '.past-show',
  '.person',
  '.contact-item',
  '.community-cta__link',
  '.mission__statement',
  '.mission__label',
  '.about-mission__statement',
  '.about-mission__quote',
  '.gallery-artist__name',
  '.gallery-artist__bio',
  '.events-host__title',
  '.events-host__body',
  '.connect-option__title',
  '.connect-option__desc',
];

const STAGGER_GROUPS = [
  '.about-pillars__grid',
  '.about-space__grid',
  '.events-month__items',
  '.community-cta__links',
  '.past-shows__list',
  '.about-people__list',
  '.contact-list',
  '.gallery-works__grid',
  '.events-preview__list',
];

function initReveal() {
  REVEAL_SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fp-reveal');
    });
  });

  STAGGER_GROUPS.forEach(selector => {
    const group = document.querySelector(selector);
    if (!group) return;
    group.querySelectorAll('.fp-reveal').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * 80}ms`);
    });
  });

  const elements = document.querySelectorAll('.fp-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);
