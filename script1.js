// Demo playlist - replace with your own songs and audio files
const songs = [
  {
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
  },
  {
    title: "Sunny",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
  },
  {
    title: "Creative Minds",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
  }
];

// DOM elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeSlider = document.getElementById('volume');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const playlistEl = document.getElementById('playlist');
const autoplayCheckbox = document.getElementById('autoplay');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

let currentSong = 0;
let isPlaying = false;
let autoplay = false;

// Render playlist
function renderPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, idx) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    if (idx === currentSong) li.classList.add('active');
    li.onclick = () => {
      loadSong(idx);
      playSong();
    };
    playlistEl.appendChild(li);
  });
}

// Load song
function loadSong(idx) {
  currentSong = idx;
  audio.src = songs[idx].src;
  songTitle.textContent = songs[idx].title;
  songArtist.textContent = songs[idx].artist;
  renderPlaylist();
}

// Play & Pause
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<span>&#10073;&#10073;</span>'; // pause icon
}
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<span>&#9654;</span>'; // play icon
}

// Next/Prev controls
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

// Progress bar update
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(currentTime);
  totalDurationEl.textContent = isNaN(duration) ? "0:00" : formatTime(duration);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Format time helper
function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Volume control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Autoplay toggle
autoplayCheckbox.addEventListener('change', () => {
  autoplay = autoplayCheckbox.checked;
});

// Event listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', () => {
  if (autoplay) nextSong();
  else pauseSong();
});

// Init
function init() {
  loadSong(currentSong);
  audio.volume = volumeSlider.value;
}
init();
