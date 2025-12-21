
document.addEventListener("DOMContentLoaded", () => {
  const trackCards = document.querySelectorAll('.track-card');
  const nowPlayingBar = document.getElementById('nowPlayingBar');
  const nowPlayingTitle = document.getElementById('nowPlayingTitle');
  const nowPlayingFill = document.getElementById('nowPlayingFill');
  const globalPlayButton = document.getElementById('globalPlayButton');
  const trackCounter = document.getElementById('trackCounter');
  const backToTop = document.getElementById('backToTop');

  let currentTrack = null;
  let currentCard = null;

  trackCards.forEach(card => {
    const audio = card.querySelector('audio');
    const playButton = card.querySelector('.play-button');

    playButton.addEventListener('click', () => {
      if (audio === currentTrack && !audio.paused) {
        audio.pause();
        playButton.textContent = '▶';
        globalPlayButton.textContent = '▶';
        return;
      }

      document.querySelectorAll('audio').forEach(a => a.pause());
      document.querySelectorAll('.play-button').forEach(btn => btn.textContent = '▶');

      audio.play();
      currentTrack = audio;
      currentCard = card;

      playButton.textContent = '⏸';
      globalPlayButton.textContent = '⏸';
      nowPlayingTitle.textContent = card.querySelector('.track-name').textContent;
    });

    audio.addEventListener('ended', () => {
      playButton.textContent = '▶';
    });
  });

  globalPlayButton.addEventListener('click', () => {
    if (!currentTrack) return;
    const playBtn = currentCard.querySelector('.play-button');
    playBtn.click();
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
