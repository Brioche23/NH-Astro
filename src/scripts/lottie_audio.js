import lottieWeb from "https://cdn.skypack.dev/lottie-web";
let sound = true;

let audio = new Audio(); // Create an audio object

// Function to play audio with fade in
function playAudio(audioSrc) {
  audio.src = audioSrc;
  audio.play();
  audio.volume = 0; // Start with zero volume
  fadeIn();
}

// Function to stop audio with fade out
function stopAudio() {
  fadeOut();
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

let animation = lottieWeb.loadAnimation({
  container: container,
  path: "./src/img/lottie/Heroes_Cerchio_Sito.json",
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
  // newHero.onmouseover = function () {
  //   playAudio("./src/audio/ex_0" + (i + 1) + ".mp3");
  // };
  // newHero.onmouseout = function () {
  //   stopAudio();
  // };
  // newHero.classList.add("bg-orange");
  //   newHero.classList.add(randomColor);
  heroesContainer.appendChild(newHero);

  let hero_container = document.getElementById(`hero-0${i + 1}`);

  let hero = lottieWeb.loadAnimation({
    container: hero_container,
    path: `./src/img/lottie/heroes/Antieroe_0${i + 1}_ok.json`,
    renderer: "svg",
    loop: true,
    autoplay: false,
    name: "Hero Animation" + i,
  });

  hero_container.addEventListener("mouseenter", function () {
    playAudio("./src/audio/ex_0" + (i + 1) + ".mp3");
    hero.goToAndPlay(0);
  });

  hero_container.addEventListener("mouseleave", function () {
    hero.pause();
    stopAudio();
  });
}

// const hero_01_container = document.getElementById("hero-01");

// let hero_01 = lottieWeb.loadAnimation({
//   container: hero_01_container,
//   path: `./src/img/lottie/heroes/Antieroe_01_ok.json`,
//   renderer: "svg",
//   loop: true,
//   autoplay: false,
//   name: "Hero Animation 1",
// });

// hero_01_container.addEventListener("mouseenter", function () {
//   hero_01.play();
//   console.log("Play!");
// });
// hero_01_container.addEventListener("mouseleave", function () {
//   hero_01.pause();
//   console.log("Stop!");
// });

// hero_01.addEventListener("mouseleave", function () {
//   animation.gotoAndStop(0);
// });

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