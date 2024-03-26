import gsap from "gsap";
import Swup from "swup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const swup = new Swup();

console.log("GSAP");
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline();
let mm = gsap.matchMedia();

let swupPageUrl = "";

hideHeader();

// Run after every additional navigation by swup
swup.hooks.on("page:view", (visit) => {
  console.log("New page loaded:", visit.to.url);
  swupPageUrl = visit.to.url;
  hideHeader();
});

// Run once when page loads
if (document.readyState === "complete") {
  init();
  hideHeader();
} else {
  document.addEventListener("DOMContentLoaded", () => init());
}

// swup.hooks.on("content:replace", (event) => {
//   // elementsFadeIn();
//   init();
// });

function hideHeader() {
  let header = document.querySelector("header");
  console.log(window.location.pathname);
  if (header)
    if (swupPageUrl === "") {
      if (window.location.pathname !== "/") {
        console.log("Hide header");
        header.hidden = true;
      } else {
        console.log("Show header");
        header.hidden = false;
      }
    } else if (swupPageUrl === "/") {
      console.log("Show header");
      header.hidden = false;
    } else {
      console.log("Hide header");
      header.hidden = true;
    }
}

swup.hooks.on("visit:start", (event) => {
  hideHeader();
});

swup.hooks.on("visit:end", () => {
  init();
});

// swup.on('transitionEnd', (event) => {
//   const incomingElement = event.target;
//   if (incomingElement.classList.contains('home')) {
//     const header = document.createElement('header');
//     // Add your header content here
//     incomingElement.prepend(header);
//   }
// });

//! Find a way to remove this shit when not in the home
function bigLogo() {
  // This runs on initial load
  console.log("Trigger logo");

  if (document.querySelector("#logo")) {
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    trigger.disable();

    const showAnim = gsap
      .from(
        "#logo_container",
        {
          yPercent: -100,
          paused: true,
          duration: 0.2,
        },
        "scroll_reveal"
      )
      .progress(1);

    // let logoH = gsap.getProperty("#logo", "height");
    let headerH = document.querySelector("header").offsetHeight;
    let logoH = document.querySelector("#logo").offsetHeight;
    console.log("Logo H: " + logoH);
    tl.from(
      "#logo",
      {
        opacity: 0,
        duration: 3,
        delay: 1,
        ease: "power1.inOut",
      },
      "fade-in"
    ).to(
      "#logo_container",
      {
        y: 0,
        height: 84,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#logo_container",
          start: "top top",
          end: innerHeight,
          scrub: 2,
          markers: 0,
          onUpdate: (self) => {
            console.log("progress:", self.progress);
            if (self.progress === 1) trigger.enable();
            else trigger.disable();
          },
        },
      },
      "resize"
    );
  }
}

function smallLogo() {
  console.log("Make logo smaller");
  tl.to("#logo", {
    width: 300,
    duration: 1,
    delay: 1,
  });
}

function elementsFadeIn() {
  console.log("Elements fade in!");

  gsap.utils.toArray(".op").forEach((op, i) => {
    tl.from(op, {
      scrollTrigger: {
        trigger: op,
        start: "center bottom",
        end: "bottom bottom",
        scrub: 2,
        markers: 0,
      },
      filter: "blur(12px)",
      translateY: "50px",
      opacity: 0,
      stagger: 0.5,
      ease: "sine.inOut",
    });
  });
}

function services() {
  console.log("Service");

  const serviceLists = document.querySelectorAll(".service-list");
  const serviceNames = document.querySelectorAll(".service-name");
  const serviceDescs = document.querySelectorAll(".service-desc");
  const serviceIcons = document.querySelectorAll(".service-icon");

  serviceNames.forEach((name) => {
    name.addEventListener("click", () => {
      let isOpen = false;
      let parentNode = name.parentNode;
      let parentBox = parentNode.parentNode;
      let description = parentNode.querySelector(".service-desc");
      let icon = name.querySelector(".service-icon");
      let serviceTitle = parentBox.querySelector(".service-title");

      description.classList.toggle("hidden");
      isOpen =
        !isOpen && !description.classList.contains("hidden") ? true : false;
      console.log(isOpen);
      // icon.innerHTML = isOpen ? "south_east" : "north_east";
      icon.style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";

      resetAll(description, icon, parentBox);

      serviceLists.forEach((s) => {
        for (const c of s.children) {
          if (isOpen) {
            if (c != parentNode && c != serviceTitle) {
              gsap.to(c, {
                opacity: 0.5,
                duration: 0.8,
                stagger: 0.2,
              });
              // c.style.opacity = 0.5;
            } else
              gsap.to(c, {
                opacity: 1,
                duration: 1,
              });
          } else
            gsap.to(c, {
              opacity: 1,
              duration: 1,
            });
        }
      });
    });
  });

  const resetAll = (d, i, p) => {
    console.log("Hide class");
    serviceDescs.forEach((desc) => {
      if (!desc.classList.contains("hidden") && desc !== d) {
        desc.classList.add("hidden");
      }
    });
    for (const c of p.children) {
      if (c.style.opacity === 0.5 && c !== parentNode) {
        gsap.to(c, {
          opacity: 1,
          duration: 1,
        });
      }
    }
    serviceIcons.forEach((icon) => {
      if (icon.style.transform == "rotate(90deg)" && icon !== i) {
        // icon.innerHTML = "north_east";
        icon.removeAttribute("style");
        // icon.style.transform = null;
      }
      // if (icon.innerHTML == "south_east" && icon !== i) {
      // icon.innerHTML = "north_east";
      // }
    });
  };
}

function initLottie() {
  // This needs to be refreshed
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

  // Toggle mute on global button click
  // let toggleButton = document.getElementById("globalMuteToggle");
  // toggleButton.addEventListener("click", toggleMute);

  let heroContainer = document.getElementById("heroContainer");
  let hero = lottieWeb.loadAnimation({
    container: heroContainer,
    path: `/lottie/heroes/Antieroe_03_ok.json`,
    renderer: "svg",
    loop: true,
    autoplay: true,
    name: "Hero Animation 1",
  });

  // heroContainer.addEventListener("mouseenter", function () {
  //   if (!isMuted) playAudio("/audio/ex_01.mp3");
  //   hero.goToAndPlay(0);
  // });

  // heroContainer.addEventListener("mouseleave", function () {
  //   if (!isMuted) stopAudio("/audio/ex_01.mp3");
  //   hero.pause();
  // });
}

function initWords() {
  /*
  // Array of words
  let words = ["BOOOOOM!", "CLAPCLAP!", "SBANG!", "OOOH!", "WOW!", "LOL!"];
  let wordsColor = ["text-orange", "text-green"];

  // Get a reference to the container
  let container = document.getElementById("wordContainer");

  // Function to generate a random number
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Loop through the words
  for (let i = 0; i < words.length; i++) {
    // Create a new span element for each word
    let newWord = document.createElement("span");

    // Set the text of the span to the word
    newWord.innerText = words[i];

    // Generate random positions for the top and left properties
    let randomTop = getRandomNumber(
      screen.height + 200,
      document.body.scrollHeight - 200
    );
    let randomLeft = getRandomNumber(0, window.innerWidth - 400);
    // let randomColor = wordsColor[Math.round(getRandomNumber(0, 1))];
    // let randomRotation = Math.round(getRandomNumber(-30, 30));

    // Set the CSS properties
    newWord.style.position = "absolute";
    newWord.style.top = randomTop + "px";
    newWord.style.left = randomLeft + "px";
    newWord.style.filter = "blur(0px)";

    newWord.classList.add("floating-word");
    // newWord.classList.add(randomColor);
    if (i % 2 === 0) newWord.classList.add("text-orange");
    else newWord.classList.add("text-green");

    newWord.addEventListener("mouseover", () => {
      gsap.to(newWord, {
        filter: "blur(10px)",
        duration: 1,
      });
    });
    newWord.addEventListener("mouseleave", () => {
      gsap.to(newWord, {
        filter: "blur(0px)",
        duration: 1,
      });
    });

    // Add the new span element to the container
    container?.appendChild(newWord);
  }
  */
  // gsap.to(".floating-word", {
  //   y: () =>
  //     -gsap.utils.random(0.1, 0.8) * ScrollTrigger.maxScroll("#pre-video"),
  //   // opacity: 1,
  //   ease: "none",
  //   scrollTrigger: {
  //     start: "top center",
  //     end: "bottom bottom",
  //     invalidateOnRefresh: true,
  //     scrub: 1,
  //     markers: 1,
  //   },
  // });

  gsap.utils.toArray(".onomatopea").forEach((onomatopea, i) => {
    console.log(onomatopea);
    const depth = i * 1;
    const movement = -(onomatopea.offsetHeight * depth);
    gsap.to(onomatopea, {
      scrollTrigger: {
        trigger: onomatopea.parentNode,
        start: "top center",
        end: "bottom bottom",
        scrub: 2,
        markers: 0,
      },
      translateY: "50px",
      ease: "none",
    });
  });
}

function init() {
  if (window.location.pathname === "/") {
    bigLogo();
    elementsFadeIn();
    services();
    initLottie();
    initWords();
  }
}
