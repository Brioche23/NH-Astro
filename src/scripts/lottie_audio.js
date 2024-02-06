import lottieWeb from "https://cdn.skypack.dev/lottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let audio = new Audio(); // Create an audio object
let isMuted = true; // Flag to track mute state

// Function to play audio with fade in
function playAudio(audioSrc) {
  audio.src = audioSrc;
  audio.play();
  audio.volume = 0; // Start with zero volume
  // fadeIn();
  audio.volume = isMuted ? 0 : 1; // Adjust volume based on mute state
}

// Function to stop audio with fade out
function stopAudio(audioSrc) {
  // fadeOut();
  audio.src = audioSrc;
  audio.pause();
}

// Function to toggle mute state
function toggleMute() {
  isMuted = !isMuted;
  audio.volume = isMuted ? 0 : 1; // Adjust volume based on mute state
  console.log(isMuted);
  if (isMuted) {
    toggleButton.innerHTML = "volume_off";
    toggleButton.classList.remove("bg-orange");
  } else {
    toggleButton.innerHTML = "volume_up";
    toggleButton.classList.add("bg-orange");
  }
}

// Function to gradually increase the volume (fade in)
function fadeIn() {
  var fadeInterval = setInterval(function () {
    if (audio.volume < 1) {
      audio.volume += 0.05; // Adjust the step size as needed
    } else {
      clearInterval(fadeInterval);
    }
  }, 200); // Adjust the interval as needed
}

// Function to gradually decrease the volume (fade out)
function fadeOut() {
  var fadeInterval = setInterval(function () {
    if (audio.volume > 0) {
      audio.volume -= 0.05; // Adjust the step size as needed
    } else {
      audio.pause();
      clearInterval(fadeInterval);
    }
  }, 100); // Adjust the interval as needed
}

const container = document.getElementById("hero-heroes");

let hero_animation = lottieWeb.loadAnimation({
  container: container,
  path: "/lottie/Heroes_Cerchio_Sito.json",
  renderer: "svg",
  loop: true,
  autoplay: true,
  name: "Hero Animation",
});

// container.addEventListener("click", () => {
//   animation.playSegments([0, 50], true);
// });

// Get a reference to the heroesContainer
let heroesContainer = document.getElementById("heroesContainer");

// Function to generate a random number
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Loop through the words
for (let i = 0; i < 5; i++) {
  // Create a new span element for each word
  let newHero = document.createElement("div");

  // Generate random positions for the top and left properties
  let randomTop = getRandomNumber(
    document.body.scrollHeight / 2,
    document.body.scrollHeight - 1000
  );
  let randomLeft = getRandomNumber(0, window.innerWidth - 250);
  //   let randomColor = wordsColor[Math.round(getRandomNumber(0, 1))];

  // Set the CSS properties
  newHero.id = `hero-0${i + 1}`;
  newHero.style.position = "absolute";
  newHero.style.top = randomTop + "px";
  newHero.style.left = randomLeft + "px";
  newHero.classList.add("floating-hero");
  newHero.classList.add("w-48");
  heroesContainer.appendChild(newHero);

  let hero_container = document.getElementById(`hero-0${i + 1}`);

  let hero = lottieWeb.loadAnimation({
    container: hero_container,
    path: `/lottie/heroes/Antieroe_0${i + 1}_ok.json`,
    renderer: "svg",
    loop: false,
    autoplay: false,
    name: "Hero Animation" + i,
  });

  hero_container.addEventListener("mouseenter", function () {
    if (!isMuted) playAudio("/audio/ex_0" + (i + 1) + ".mp3");
    hero.goToAndPlay(0);
  });

  hero_container.addEventListener("mouseleave", function () {
    if (!isMuted) stopAudio("/audio/ex_0" + (i + 1) + ".mp3");
    // hero.pause();
  });
}

// Toggle mute on global button click
let toggleButton = document.getElementById("globalMuteToggle");

toggleButton.addEventListener("click", toggleMute);

gsap.registerPlugin(ScrollTrigger);

gsap.to(".floating-hero", {
  y: (i, el) =>
    (1 - gsap.utils.random(0.1, 0.8)) * ScrollTrigger.maxScroll(window),
  ease: "none",
  scrollTrigger: {
    start: "top center",
    end: "max",
    invalidateOnRefresh: true,
    scrub: 0,
    markers: 0,
  },
});
