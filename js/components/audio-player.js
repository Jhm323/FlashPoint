(function () {
  const STREAM_URL = 'https://wrti-live.streamguys1.com/jazz-mp3';
  const STORAGE_KEY = 'fp-audio-dismissed';

  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const PLAY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>`;
  const PAUSE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;

  const player = document.createElement('div');
  player.className = 'audio-player';
  player.setAttribute('role', 'region');
  player.setAttribute('aria-label', 'Jazz radio player');
  player.innerHTML = `
    <div class="audio-player__inner">
      <button class="audio-player__play" aria-label="Play jazz radio" aria-pressed="false">
        ${PLAY_ICON}
      </button>
      <div class="audio-player__info">
        <p class="audio-player__station">WRTI Jazz · 90.1 FM</p>
        <p class="audio-player__label">Live Philadelphia Jazz</p>
      </div>
      <span class="audio-player__status" aria-hidden="true"></span>
      <button class="audio-player__dismiss" aria-label="Dismiss player">✕</button>
    </div>
  `;

  document.body.appendChild(player);

  const audio = new Audio();
  audio.preload = 'none';

  const playBtn = player.querySelector('.audio-player__play');
  const statusDot = player.querySelector('.audio-player__status');
  const dismissBtn = player.querySelector('.audio-player__dismiss');

  let playing = false;

  function setPlaying(state) {
    playing = state;
    playBtn.innerHTML = state ? PAUSE_ICON : PLAY_ICON;
    playBtn.setAttribute('aria-label', state ? 'Pause jazz radio' : 'Play jazz radio');
    playBtn.setAttribute('aria-pressed', String(state));
    statusDot.classList.toggle('is-live', state);
  }

  playBtn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
      audio.src = '';
      setPlaying(false);
    } else {
      audio.src = STREAM_URL;
      audio.play().catch(function () {
        setPlaying(false);
      });
      setPlaying(true);
    }
  });

  dismissBtn.addEventListener('click', function () {
    audio.pause();
    audio.src = '';
    player.classList.remove('is-visible');
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(function () { player.remove(); }, 400);
  });

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      player.classList.add('is-visible');
    });
  });
})();
