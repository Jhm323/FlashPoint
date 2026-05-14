const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function renderCard(event) {
  const date = parseLocalDate(event.date);
  return `
    <article class="event-card">
      <div class="event-card__date">
        <span class="event-card__day text-label">${DAYS[date.getDay()]}</span>
        <span class="event-card__num">${date.getDate()}</span>
        <span class="event-card__month text-label">${MONTHS_SHORT[date.getMonth()]}</span>
      </div>
      <div class="event-card__body">
        <span class="event-card__tag text-label">${event.tag}</span>
        <h3 class="event-card__title">${event.title}</h3>
        <p class="event-card__desc">${event.description}</p>
        <span class="event-card__time text-label">${event.time} · Free</span>
      </div>
    </article>
  `;
}

function groupByMonth(events) {
  const groups = new Map();
  events.forEach(event => {
    const date = parseLocalDate(event.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!groups.has(key)) {
      groups.set(key, { label: `${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`, events: [] });
    }
    groups.get(key).events.push(event);
  });
  return [...groups.values()];
}

function render(data) {
  const container = document.getElementById('events-container');
  if (!container) return;

  if (data.coming_soon) {
    container.innerHTML = `
      <div class="events-coming-soon">
        <p class="events-coming-soon__body">Calendar is being put together — check back soon or <a href="connect.html">get in touch</a> to stay in the loop.</p>
      </div>
    `;
    return;
  }

  const sorted = [...data.events].sort((a, b) => a.date.localeCompare(b.date));

  if (!sorted.length) {
    container.innerHTML = '<p class="events-empty text-label">Nothing scheduled right now — check back soon.</p>';
    return;
  }

  container.innerHTML = groupByMonth(sorted).map(group => `
    <div class="events-month">
      <h2 class="events-month__heading">${group.label}</h2>
      <div class="events-month__items">
        ${group.events.map(renderCard).join('')}
      </div>
    </div>
  `).join('');
}

fetch('data/events.json')
  .then(r => r.json())
  .then(render)
  .catch(() => {
    const container = document.getElementById('events-container');
    if (container) container.innerHTML = '<p class="events-empty text-label">Events couldn\'t load — try refreshing.</p>';
  });
