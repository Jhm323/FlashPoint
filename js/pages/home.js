const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function renderNowShowing(gallery) {
  const title = document.getElementById('now-showing-title');
  const subtitle = document.getElementById('now-showing-subtitle');

  if (gallery.coming_soon) {
    if (title) title.textContent = 'Coming Soon';
    if (subtitle) subtitle.textContent = 'New exhibition on the way.';
    const section = document.querySelector('.now-showing');
    if (section) section.classList.add('now-showing--coming-soon');
    return;
  }

  if (title) title.textContent = gallery.current.artist;
  if (subtitle) subtitle.textContent = gallery.current.title;
}

function renderEventsPreview(data) {
  const list = document.getElementById('events-preview-list');
  if (!list) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [...data.events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter(e => parseLocalDate(e.date) >= today)
    .slice(0, 3);

  if (!upcoming.length) {
    list.innerHTML = '<li class="event-item"><div class="event-item__body"><h3 class="event-item__name">No upcoming events</h3><p class="event-item__detail">Check back soon</p></div></li>';
    return;
  }

  list.innerHTML = upcoming.map(event => {
    const date = parseLocalDate(event.date);
    return `
      <li class="event-item">
        <span class="event-item__date text-label">${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}</span>
        <div class="event-item__body">
          <h3 class="event-item__name">${event.title}</h3>
          <p class="event-item__detail">${event.description}</p>
        </div>
        <span class="event-item__time text-label">${event.time}</span>
      </li>
    `;
  }).join('');
}

Promise.all([
  fetch('data/events.json').then(r => r.json()),
  fetch('data/gallery.json').then(r => r.json())
]).then(([events, gallery]) => {
  renderEventsPreview(events);
  renderNowShowing(gallery);
}).catch(console.error);
