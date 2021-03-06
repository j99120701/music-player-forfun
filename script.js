const img = document.querySelector("img");
// const video = document.querySelector("video");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

//Music
const songs = [
  {
    name: "weekend",
    displayName: "Weekend",
    artist: "Taeyeon 김태연",
  },
  {
    name: "愛在馬來西亞",
    displayName: "愛在馬來西亞",
    artist: "Luyi & anima_jinx",
  },
];

//Ckeck playing
let isPlaying = false;

//play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("Pause", "title");
  music.pause();
}

//Event Listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

//Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
  // video.src = `video/${song.name}.mp4`;
}
//current Song
let songIndex = 0;
loadSong(songs[songIndex]);
//Prev Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

///updateProgressBar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculate 時間
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    //4:06 的 0
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //處理切換歌曲時 duration NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculate 時間 for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    //:0 處理
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}
//setProgressBar
function setProgressBar(e) {
  const width = this.clientWidth;
  const offsetX = e.offsetX;
  const { duration } = music;
  music.currentTime = (offsetX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
