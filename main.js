let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  // {
  //   name: "Night Owl",
  //   artist: "Broke For Free",
  //   image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
  //   path: "tracks/Broke_For_Free_-_01_-_Night_Owl.mp3",
  // },
  {
    name: "Cardigan",
    artist: "Taylor Swift",
    path: "tracks/Taylor Swift-Cardigan.mp3",
  },
  {
    name: "Head & Heart",
    artist: "Joel Corry x MNEK",
    path: "tracks/Joel Corry x MNEK-Head & Heart.mp3",
  },
  {
    name: "Take Care Of You",
    artist: "Ella Henderson",
    path: "tracks/Ella Henderson-Take Care Of You.mp3",
  },
  {
    name: "Savage Love",
    artist: "Jason Derulo",
    path: "tracks/Jason Derulo-Savage Love.mp3",
  },
  {
    name: "Holiday",
    artist: "Little Mix",
    path: "tracks/Little Mix-Holiday.mp3",
  },
  {
    name: "Heaven On My Mind",
    artist: "Becky Hill, Sigala",
    path: "tracks/Becky Hill, Sigala-Heaven On My Mind.mp3",
  },
  {
    name: "Me Because Of You",
    artist: "HRVY",
    path: "tracks/HRVY-Me Because Of You.mp3",
  },
  {
    name: "Hallucinate",
    artist: "Dua Lipa",
    path: "tracks/Dua Lipa-Hallucinate.mp3",
  },
  {
    name: "My Oasis",
    artist: "Sam Smith",
    path: "tracks/Sam Smith-My Oasis.mp3",
  },
  {
    name: "Rain On Me",
    artist: "Lady Gaga, Ariana Grande",
    path: "tracks/Lady Gaga, Ariana Grande-Rain On Me.mp3",
  },
  {
    name: "To Be Young",
    artist: "Anne Marie",
    path: "tracks/Anne Marie-To Be Young.mp3",
  },
  {
    name: "Kings & Queens",
    artist: "Ava Max",
    path: "tracks/Ava Max-Kings & Queens.mp3"
  }
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}