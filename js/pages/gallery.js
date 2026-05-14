function renderComingSoon() {
  const main = document.getElementById('main');
  if (!main) return;

  const exhibition = main.querySelector('.exhibition');
  const works = main.querySelector('.gallery-works');
  const artist = main.querySelector('.gallery-artist');

  [exhibition, works, artist].forEach(el => { if (el) el.style.display = 'none'; });

  const placeholder = document.createElement('section');
  placeholder.className = 'gallery-coming-soon';
  placeholder.innerHTML = `
    <div class="gallery-coming-soon__inner">
      <span class="text-label">Next Exhibition</span>
      <h2 class="gallery-coming-soon__heading">Coming Soon</h2>
      <p class="gallery-coming-soon__body">We're putting together the next show. Photos on their way.</p>
      <a class="btn btn--outline" href="connect.html">Get in Touch</a>
    </div>
  `;

  if (exhibition) {
    exhibition.parentNode.insertBefore(placeholder, exhibition);
  } else {
    main.appendChild(placeholder);
  }

  const pastList = document.getElementById('past-shows-list');
  if (pastList) {
    const { past } = window.__galleryData || {};
    if (past && past.length) {
      pastList.innerHTML = past.map(show => `
        <li class="past-show">
          <span class="past-show__year text-label">${show.year}</span>
          <h3 class="past-show__title">${show.title}</h3>
          <span class="past-show__artist text-label">${show.artist}</span>
        </li>
      `).join('');
    }
  }
}

function render(data) {
  if (data.coming_soon) {
    window.__galleryData = data;
    renderComingSoon();
    return;
  }

  const { current, past } = data;

  const img = document.getElementById('exhibition-img');
  if (img) { img.src = current.image; img.alt = `${current.title} by ${current.artist}`; }

  const dates = document.getElementById('exhibition-dates');
  if (dates) dates.textContent = current.dates;

  const title = document.getElementById('exhibition-title');
  if (title) title.textContent = current.title;

  const artist = document.getElementById('exhibition-artist');
  if (artist) artist.textContent = current.artist;

  const worksGrid = document.getElementById('works-grid');
  if (worksGrid) {
    worksGrid.innerHTML = current.works.map(work => {
      const mod = work.size === 'tall' ? ' work-item--tall' : work.size === 'wide' ? ' work-item--wide' : '';
      return `<div class="work-item${mod}"><img class="work-item__img" src="${work.src}" alt="${work.alt}" loading="lazy" /></div>`;
    }).join('');
  }

  const artistName = document.getElementById('artist-name');
  if (artistName) artistName.textContent = current.artist;

  const artistBio = document.getElementById('artist-bio');
  if (artistBio) artistBio.textContent = current.bio;

  const pastList = document.getElementById('past-shows-list');
  if (pastList) {
    pastList.innerHTML = past.map(show => `
      <li class="past-show">
        <span class="past-show__year text-label">${show.year}</span>
        <h3 class="past-show__title">${show.title}</h3>
        <span class="past-show__artist text-label">${show.artist}</span>
      </li>
    `).join('');
  }
}

fetch('data/gallery.json')
  .then(r => r.json())
  .then(render)
  .catch(console.error);
