// Global player elements
var audio = document.getElementById("audio");
var sourceMP3 = document.getElementById("sourceMP3");
var timeSlider = document.getElementById("timeBar");
var playBtn = document.getElementById("playBtn");
var randomBtn = document.getElementById("randomBtn");
var volumeSlider = document.getElementById("volumeSlider");
var nextBtn = document.getElementById("nextBtn");
var previousBtn = document.getElementById("previousBtn");
var titleText = document.getElementById("titleText");
var albumText = document.getElementById("albumText");
var artistText = document.getElementById("artistText");
var timeText = document.getElementById("timeText");
var log = document.getElementById("log");

var PLAY_ICON = "icons/32/play-32.png";
var PAUSE_ICON = "icons/32/pause-32.png";

// ================ Add properties and methods to the playlist2 object
var playlist2 = {};
// Add tracks in the playlist2
playlist2.list = trackList;
// The index of the track currently being played
playlist2.activeTrack = 0;
// Moves to the next track, loops if reaches end
playlist2.next = function() {
    if (this.activeTrack == this.list.length - 1)
      this.activeTrack = 0;
    else
      this.activeTrack +=1;
  };
// Moves to the previous track
playlist2.previous = function() {
    if (this.activeTrack == 0)
      this.activeTrack = this.list.length - 1;
    else
      this.activeTrack -= 1;
  };
// Returns the track currently being played
playlist2.getActive = function() {
    return this.list[this.activeTrack];
}

  
// ===================== On load set the default values to the audio element 
sourceMP3.src = playlist2.getActive().src;
audio.load();

// On load start show the tracks title,artist etc
audio.addEventListener("loadeddata",function(){
  var filename = playlist2.getActive().src;
  
  titleText.textContent = playlist2.getActive().name || "Unknown Title";
  albumText.textContent = playlist2.getActive().album || "Unknown Album";
  artistText.textContent = playlist2.getActive().artist || "Unknown Artist";
});

// ===================== Buttons
// Play Button
playBtn.addEventListener("click",function(){
  if (audio.paused) {
    audio.play();
  }
  else {
    audio.pause();
  }
});


document.getElementById("slideContainer").innerHTML = showSongList();

// Random Button
randomBtn.addEventListener("click",function(){
  shuffle(playlist2.list)
  document.getElementById("slideContainer").innerHTML = showSongList();
  loadNewTrack(playlist2.getActive().src);
});

//Next Button
nextBtn.addEventListener("click",function(){
  playlist2.next();
  loadNewTrack(playlist2.getActive().src);
});

//Previous button
previousBtn.addEventListener("click",function(){
  playlist2.previous();
  loadNewTrack(playlist2.getActive().src);
});

audio.addEventListener("play",function(){playBtn.firstChild.src = PAUSE_ICON;},false);
audio.addEventListener("pause",function(){playBtn.firstChild.src = PLAY_ICON;},false);

// ======================= Volume Control

// Setup volume slider using sliderfy.js
sliderfy(volumeSlider);
audio.volume = 1;
volumeSlider.addEventListener("change",function(){
  audio.volume = volumeSlider.sliderValue;
});

// ======================= Time Control
// Setup time slider using sliderfy,js
sliderfy(timeSlider);
timeText.textContent = "0:00";
// On time update
timeUpdateCallback = function(){
    timeSlider.firstChild.style.width = (audio.currentTime/audio.duration) *timeSlider.offsetWidth + "px";
    var seconds = audio.currentTime;
    var minutes = Math.round(seconds / 60);
    seconds = Math.round(seconds % 60);
    
    timeText.textContent = minutes+":"+ (seconds<10?"0"+seconds:seconds);
    
    log.textContent = "Duration: " + audio.duration + "Current: "+ audio.currentTime;
}
audio.addEventListener("timeupdate",timeUpdateCallback,false);

// On change
timeSlider.addEventListener("change", function(){
  audio.removeEventListener("timeupdate",timeUpdateCallback,false);
  audio.currentTime = timeSlider.sliderValue * audio.duration;
  audio.addEventListener("timeupdate",timeUpdateCallback,false);
});

// On ended
audio.addEventListener("ended",function(){
  playlist2.next();
  loadNewTrack(playlist2.getActive().src);
});

/**
 * Loads a new track on the audio elementFromPoint
 * @sourceString The source of the new track
 */
function loadNewTrack(sourceString){
  sourceMP3.src = sourceString;
  audio.load();
  audio.play();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function showSongList(){
  var str = '<ul>';
  playlist2.list.forEach(function(l) {
    str += '<li>' + l.name + '</li>'
  });
  str += '</ul>';
  return str;
}
