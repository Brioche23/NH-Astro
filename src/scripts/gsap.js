import gsap from "gsap";
import Swup from "swup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const swup = new Swup();

console.log("GSAP");
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline();

let mm = gsap.matchMedia();

// Run once when page loads
if (document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => init());
}

// Run after every additional navigation by swup
// swup.hooks.on("page:view", () => init());

swup.hooks.on("content:replace", (event) => {
  if (window.location.pathname === "/") {
    bigLogo();
  } else {
    smallLogo();
  }
  // elementsFadeIn();
});

//! Find a way to remove this shit when not in the home
function bigLogo() {
  // This runs on initial load
  console.log("Trigger logo");
  tl.to("#logo", {
    width: 150,
    duration: 1,
    scrollTrigger: {
      trigger: "#logo",
      start: "top top",
      scrub: 0.5,
      markers: false,
    },
  });
}

function smallLogo() {
  console.log("Make logo smaller");
  tl.to("#logo", {
    width: 150,
    duration: 1,
    delay: 1,
  });
}

function elementsFadeIn() {
  gsap.utils.toArray(".op").forEach((op, i) => {
    tl.from(op, {
      scrollTrigger: {
        trigger: op,
        start: "center bottom",
        end: "bottom bottom",
        scrub: 0.5,
        markers: false,
      },
      translateY: "50px",
      opacity: 0,
      stagger: 0.5,
    });
  });
}

function init() {
  bigLogo();
  elementsFadeIn();
}
