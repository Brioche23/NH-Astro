import gsap from "gsap";
import Swup from "swup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const swup = new Swup();

gsap.registerPlugin(ScrollTrigger);
let tl = gsap.timeline();

let mm = gsap.matchMedia();

document.addEventListener("DOMContentLoaded", () => {
  // This runs on initial load
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
});

swup.hooks.on("page:view", (visit) => {
  // This runs after every page change by swup
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
  console.log("New page: ", visit);
});

mm.add("(max-width: 768px)", () => {
  gsap.utils.toArray(".op").forEach((op, i) => {
    tl.from(op, {
      scrollTrigger: {
        trigger: op,
        start: "center bottom",
        end: "bottom bottom",
        scrub: 0.5,
        markers: true,
      },
      opacity: 0,
      stagger: 0.5,
    });
  });
});
