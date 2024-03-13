import Swup from "swup";
const swup = new Swup();

// Run once when page loads
if (document.readyState === "complete") {
  runVideo();
} else {
  document.addEventListener("DOMContentLoaded", () => runVideo());
}

// Run after every additional navigation by swup
swup.hooks.on("page:view", () => runVideo());

function runVideo() {
  console.log("Video Script");

  let isPlaying = false;

  const video = document.querySelector("video");
  const controlsOverlay = document.querySelector(".controls-overlay");
  const muteButton = document.querySelector("button.mute-button");
  const playButton = document.querySelector("button.play-button");
  const closeButton = document.querySelector("button.close-button");

  controlsOverlay?.addEventListener("mousemove", (e) => {
    playButton.style.left = e.clientX - playButton.offsetWidth / 2 + "px";
    playButton.style.top = e.clientY - playButton.offsetHeight / 2 + "px";
  });
  controlsOverlay?.addEventListener("mouseenter", (e) => {
    playButton.style.visibility = "visible";
  });
  controlsOverlay?.addEventListener("mouseleave", (e) => {
    playButton.style.visibility = "hidden";
  });

  playButton?.addEventListener("click", () => {
    console.log("Play!");

    isPlaying ? video?.pause() : video?.play();
    playButton.innerHTML = isPlaying ? "play" : "pause";
    isPlaying = !isPlaying;
  });

  muteButton?.addEventListener("mouseover", () => {
    playButton.style.visibility = "hidden";
  });
  muteButton?.addEventListener("mouseleave", () => {
    playButton.style.visibility = "visible";
  });

  closeButton?.addEventListener("mouseover", () => {
    playButton.style.visibility = "hidden";
  });
  closeButton?.addEventListener("mouseleave", () => {
    playButton.style.visibility = "visible";
  });

  muteButton?.addEventListener("click", () => {
    console.log(muteButton.innerHTML);
    if (muteButton.innerHTML === "unmute") {
      muteButton.innerHTML = "mute";
      console.log("Unmute!");
      video.volume = 1;
    } else if (muteButton.innerHTML === "mute") {
      muteButton.innerHTML = "unmute";
      console.log("Mute!");
      video.volume = 0;
    }
  });
}
