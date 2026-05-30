import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// 2. Masukkan data konfigurasi asli milikmu yang tadi
const firebaseConfig = {
  apiKey: "AIzaSyBShcwMM71GBEsHQHwZ2sGAterr4IFwp-4",
  authDomain: "rori-4fa84.firebaseapp.com",
  projectId: "rori-4fa84",
  storageBucket: "rori-4fa84.firebasestorage.app",
  messagingSenderId: "667748597168",
  appId: "1:667748597168:web:467e3beeb4dc1d1ea9ea75",
  measurementId: "G-07HM98WVD5"
};

// 3. Jalankan Firebase
const app = initializeApp(firebaseConfig);

const songs = [
  {
    title: "Berhasil",
    artist: "Perunggu",
    src: "assets/music/Perunggu - Berhasil (Official Lyric Video).mp3",
    cover: "assets/images/perunggu berhasil.png"
  },
  {
    title: "Love Ephipany",
    artist: "Reality Club",
    src: "assets/music/Reality Club - Love Epiphany (Official Lyric Video).mp3",
    cover: "assets/images/love ephi.jpg"
  },
  {
    title: "Ini Abadi",
    artist: "Perunggu",
    src: "assets/music/Perunggu - Ini Abadi (Video Lirik).mp3",
    cover: "assets/music/ini abadi.jpg"
  },
  {
    title: "Linger",
    artist: "The Cranberries",
    src: "assets/music/The Cranberries â__ Linger (Lyrics).mp3",
    cover: "assets/music/linger.jpg"
  },
  {
    title: "Are You My Valentine?",
    artist: "SIVIA",
    src: "assets/music/SIVIA - ARE YOU MY VALENTINE_  (OFFICIAL MUSIC VIDEO).mp3",
    cover: "assets/music/are you my valentine.png"
  },
  {
    title: "Sebetulnya",
    artist: "Uncle Wire",
    src: "assets/music/Sebetulnya.mp3",
    cover: "assets/music/uncle wire new.jpg"
  },
  {
    title: "Timur",
    artist: "The Adams",
    src: "assets/music/The Adams - Timur (Lirik).mp3",
    cover: "assets/music/timur.jpg"
  },
  {
    title: "Alexandra",
    artist: "Reality Club",
    src: "assets/music/Alexandra - Reality Club (Official Lyric Video) (2).mp3",
    cover: "assets/music/alexandra.jpg"
  },
  {
    title: "Baldarina",
    artist: "Uncle Wire",
    src: "assets/music/Baldarina.mp3",
    cover: "assets/images/baldarina.jpg"
  }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playTriggers = document.querySelectorAll(".play-trigger");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const widgetNext = document.getElementById("widget-next");
const widgetPrev = document.getElementById("widget-prev");

const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const cover = document.getElementById("cover");
const progressBar = document.querySelector(".progress-bar span");
const progressArea = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelector(".current");
const durationEl = document.querySelector(".duration");


const widgetTitle = document.getElementById("widget-title");
const widgetArtist = document.getElementById("widget-artist");
const widgetCover = document.getElementById("hero-widget-cover");
const widgetBarFill = document.querySelector(".widget-bar-fill");
const widgetDurationEl = document.getElementById("widget-duration");
const widgetCurrentTimeEl = document.getElementById("widget-current-time");

function loadSong(song){
  if(title) title.textContent = song.title;
  if(artist) artist.textContent = song.artist;
  if(cover) cover.src = song.cover;

  if(widgetTitle) widgetTitle.textContent = song.title;
  if(widgetArtist) widgetArtist.textContent = song.artist;
  if(widgetCover) widgetCover.src = song.cover;

  audio.src = song.src;
}

loadSong(songs[currentSong]);

function playSong(){
  audio.play();
  isPlaying = true;
  playTriggers.forEach(btn => btn.textContent = "⏸");
}

function pauseSong(){
  audio.pause();
  isPlaying = false;
  playTriggers.forEach(btn => btn.textContent = "▶");
}

playTriggers.forEach(btn => {
  btn.addEventListener("click", () => {
    if(isPlaying) pauseSong();
    else playSong();
  });
});

function changeSong(next = true) {
  if (next) {
    currentSong++;
    if(currentSong > songs.length - 1) currentSong = 0;
  } else {
    currentSong--;
    if(currentSong < 0) currentSong = songs.length - 1;
  }
  loadSong(songs[currentSong]);
  playSong();
}

nextBtn.addEventListener("click", () => changeSong(true));
prevBtn.addEventListener("click", () => changeSong(false));
if(widgetNext) widgetNext.addEventListener("click", () => changeSong(true));
if(widgetPrev) widgetPrev.addEventListener("click", () => changeSong(false));

audio.addEventListener("loadedmetadata", () => {
  let durationMin = Math.floor(audio.duration / 60);
  let durationSec = Math.floor(audio.duration % 60);
  if(durationSec < 10) durationSec = `0${durationSec}`;
  const formattedDuration = `${durationMin}:${durationSec}`;
  if(durationEl) durationEl.textContent = formattedDuration;
  if(widgetDurationEl) widgetDurationEl.textContent = formattedDuration;
});

audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  if(progressBar) progressBar.style.width = `${progressWidth}%`;
  if(widgetBarFill) widgetBarFill.style.width = `${progressWidth}%`;

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10) currentSec = `0${currentSec}`;
  if(currentTimeEl) currentTimeEl.textContent = `${currentMin}:${currentSec}`;
  if(widgetCurrentTimeEl) widgetCurrentTimeEl.textContent = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

audio.addEventListener("ended", () => changeSong(true));

// COUNTDOWN TIMER
const anniversaryDate = new Date("May 26, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = now - anniversaryDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// VIEW ALL PHOTOS CLICK INTERACTION
const viewAllBtn = document.getElementById("view-all-btn");
const expandedGallery = document.getElementById("expanded-gallery");

if (viewAllBtn && expandedGallery) {
  viewAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    expandedGallery.classList.toggle("show");
    if (expandedGallery.classList.contains("show")) {
      viewAllBtn.innerHTML = "Show less ↑";
    } else {
      viewAllBtn.innerHTML = "View all photos →";
    }
  });
}

// --- LOGIKA UTAMA SCROLL REVEAL ANIMATION ---
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("appear");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.15)) {
      displayScrollElement(el);
    }
  });
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

// Pemicu pertama kali saat web dibuka agar elemen terdekat langsung muncul jika terlihat
handleScrollAnimation();