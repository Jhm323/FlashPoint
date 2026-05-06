function render(data) {
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
