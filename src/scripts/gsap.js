import gsap from "gsap";
import Swup from "swup";
import SwupScrollPlugin from "@swup/scroll-plugin";
import SwupSlideTheme from "@swup/slide-theme";
import SwupHeadPlugin from "@swup/head-plugin";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const swup = new Swup({
  native: true,
  accessibility: false,
  plugins: [
    // new SwupSlideTheme(),
    new SwupHeadPlugin(),
    new SwupScrollPlugin({
      doScrollingRightAway: 0,
      animateScroll: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? false
        : { betweenPages: true, samePageWithHash: true, samePage: true },
      scrollFriction: 0.5,
      scrollAcceleration: 2,
      offset: 0,
      shouldResetScrollPosition: (link) => !link.matches(".backlink"),
    }),
  ],
});

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

// let scrollValues = {};

swup.hooks.on("link:click", () => {
  console.log("Click Link");
  // scrollValues[window.location.href] = window.scrollY;
  // console.log("Scroll to");
  // window.scrollTo(0, scrollValues[window.location.href]);
});

// swup.hooks.on("history:popstate", () => {
//   console.log("Pop State");
//   setTimeout(function () {
//     console.log("Scroll to");
//     window.scrollTo(0, scrollValues[window.location.href]);
//   }, 100);
// });

// swup.hooks.on("scroll:start", () => console.log("Swup started scrolling"));
// swup.hooks.on("scroll:end", () => console.log("Swup finished scrolling"));

swup.hooks.on("visit:start", (event) => {
  console.log("Visit Start");
  hideHeader();
});

swup.hooks.on("visit:end", () => {
  console.log("Visit End");
  initBack();
  // if (swupPageUrl !== "/") swup.scrollTo(0, false);
});

console.log("ReadyState: " + document.readyState);
// Run once when page loads
if (document.readyState === "complete") {
  console.log("ReadyState: " + document.readyState);
  init();
  hideHeader();
} else {
  console.log("ReadyState: " + document.readyState);
  document.addEventListener("DOMContentLoaded", () => init());
}

function hideHeader() {
  let header = document.querySelector("header");
  console.log("Pathname: " + window.location.pathname);
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

function bigLogo() {
  console.log("Trigger logo");

  if (document.querySelector("#logo")) {
    // const trigger = ScrollTrigger.create({
    //   start: "top top",
    //   end: "max",
    //   onUpdate: (self) => {
    //     self.direction === -1 ? showAnim.play() : showAnim.reverse();
    //   },
    // });

    // trigger.disable();

    // const showAnim = gsap
    //   .from(
    //     "#logo_svg",
    //     {
    //       yPercent: -100,
    //       paused: true,
    //       duration: 0.3,
    //       ease: "ease-out",
    //     },
    //     "scroll_reveal"
    //   )
    //   .progress(1);

    console.log("Logo animation");

    tl.fromTo(
      "#logo_svg",
      {
        opacity: 0,
        "-webkit-filter": "blur(12px)",
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        "-webkit-filter": "blur(0px)",
        filter: "blur(0px)",
        duration: 1.5,
        delay: 1,
        ease: "power1.inOut",
        onComplete: (self) => {
          console.log("Complete");
        },
      },
      "fade-in"
    );
    // .to(
    //   "#logo_container",
    //   {
    //     y: 0,
    //     ease: "power3.out",
    //     scrollTrigger: {
    //       trigger: "#logo_container",
    //       start: "top top",
    //       end: innerHeight,
    //       scrub: 2,
    //       markers: 0,
    //       once: 1,
    //       onUpdate: (self) => {
    //         // console.log("progress:", self.progress);
    //         if (self.progress >= 0.3) {
    //           // trigger.enable();
    //           gsap.set("#logo_container", {
    //             // height: 84,
    //             delay: 0.3,
    //           });
    //         } else trigger.disable();
    //       },
    //     },
    //   },
    //   "resize"
    // );
  }
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
        once: 1,
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

  const preVideo = document.querySelector("#pre-video");

  const serviceLists = document.querySelectorAll(".service-list");
  const serviceNames = document.querySelectorAll(".service-name");
  const serviceDescs = document.querySelectorAll(".service-desc");
  const serviceIcons = document.querySelectorAll(".service-icon");

  preVideo.onclick = function (e) {
    console.log(e.target.tagName);
    if (e.target.tagName !== "SPAN") reset();
  };

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
                filter: "blur(2px)",
                duration: 0.8,
                stagger: 0.2,
              });
              // c.style.opacity = 0.5;
            } else
              gsap.to(c, {
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
              });
          } else
            gsap.to(c, {
              filter: "blur(0px)",
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
        icon.removeAttribute("style");
      }
    });
  };

  const reset = () => {
    console.log("Reset");
    serviceIcons.forEach((icon) => {
      icon.removeAttribute("style");
    });
    serviceDescs.forEach((desc) => {
      desc.classList.add("hidden");
    });
    serviceNames.forEach((name) => {
      gsap.to(name.parentNode, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 1,
      });
      gsap.to(name.parentNode.parentNode.querySelector(".service-title"), {
        filter: "blur(0px)",
        opacity: 1,
        duration: 1,
      });
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
    path: `/lottie/heroes/Antieroe_01_ok.json`,
    renderer: "svg",
    loop: true,
    autoplay: true,
    name: "Hero Animation 1",
  });

  //! Da capire
  // hero.addEventListener("ready", () => {
  //   LottieInteractivity.create({
  //         mode:"scroll",
  //         player: "#firstLottie",
  //         actions: [
  //         {
  //             visibility:[0, 1.0],
  //             type: "seek",
  //             frames: [0, 300],
  //         },
  //         ]
  //       });
  // });

  // heroContainer.addEventListener("mouseenter", function () {
  //   if (!isMuted) playAudio("/audio/ex_01.mp3");
  //   hero.goToAndPlay(0);
  // });

  // heroContainer.addEventListener("mouseleave", function () {
  //   if (!isMuted) stopAudio("/audio/ex_01.mp3");
  //   hero.pause();
  // });
}

function initParallax() {
  mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray(".parallax").forEach((p, i) => {
      const depth = 0.3;
      const movement = -(p.offsetHeight * depth);
      tl.to(p, {
        scrollTrigger: {
          trigger: p.parentNode,
          start: "top center",
          end: "bottom center",
          scrub: 2,
          markers: 0,
          once: 0,
        },
        translateY: movement,
        ease: "none",
      });
    });

    gsap.utils.toArray(".onomatopea").forEach((p, i) => {
      p.addEventListener("mouseover", () => {
        gsap.to(p, {
          filter: "blur(10px)",
          duration: 1,
        });
      });
      p.addEventListener("mouseleave", () => {
        gsap.to(p, {
          filter: "blur(0px)",
          duration: 1,
        });
      });
    });

    // gsap.set("[data-speed]", {
    //   scale: (i, el) => 1 + parseFloat(el.getAttribute("data-speed")),
    // });

    // gsap.to("[data-speed]", {
    //   translateY: (i, el) =>
    //     -parseFloat(el.getAttribute("data-speed")) *
    //     ScrollTrigger.maxScroll(window),
    //   ease: "none",
    //   scrollTrigger: {
    //     start: 0,
    //     end: "max",
    //     scrub: 1,
    //     markers: 0,
    //   },
    // });
  });
}

function init() {
  if (window.location.pathname === "/") {
    bigLogo();
    elementsFadeIn();
    services();
    initLottie();
    initParallax();
  }
}

function initBack() {
  if (window.location.pathname === "/") {
    bigLogo();
    services();
    initLottie();
    initParallax();
  }
}
