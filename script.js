const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

// Playlist
const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "music1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "music2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "music3.mp3",
    cover: "cover3.jpg"
  }
];

let songIndex = 0;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}
loadSong(songs[songIndex]);

// Play/Pause
function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}
playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

// Next/Prev
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
});

// Seek song
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Auto play next
audio.addEventListener("ended", () => {
  nextBtn.click();
});