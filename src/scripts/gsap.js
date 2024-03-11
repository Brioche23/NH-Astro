import gsap from "gsap";
import Swup from "swup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const swup = new Swup();

gsap.registerPlugin(ScrollTrigger);
// import SplitType from "split-type";

// const ourText = new SplitType(".split", { types: "lines, chars" });
// const chars = ourText.chars;
// const secondSplit = new SplitType(".char", { types: "chars" });
// const chars2 = secondSplit.chars;

// create a timeline
let tl = gsap.timeline();

let mm = gsap.matchMedia();

// tl.fromTo(
//   ".intro-text",
//   { opacity: 0 },
//   { opacity: 1, delay: 0, duration: 2, stagger: 0.5, ease: "ease-in" }
// ).from(chars2, {
//   yPercent: 100,
//   opacity: 0,
//   stagger: 0.01,
//   duration: 1,
//   ease: "ease-in",
//   toggleActions: "restart none none reverse",
//   // onComplete: () => {
//   //   SplitType.revert(".char");
//   //   SplitType.revert(".split");
//   // },
//   // scrollTrigger: {
//   //   trigger: ".content",
//   //   start: "top center",
//   //   end: "bottom end",
//   //   markers: true,
//   //   scrub: 1,
//   //   onLeave: () => {
//   //     SplitType.revert(".char");
//   //     SplitType.revert(".split");
//   //   },
//   // },
// });

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

swup.hooks.on("page:view", () => {
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
});

// gsap.utils.toArray(".block").forEach((block, i) => {
//   tl.from(block, {
//     scrollTrigger: {
//       trigger: block,
//       start: "top top",
//       pin: false,
//       scrub: 1,
//       markers: false,
//       onLeave: () => {
//         SplitType.revert(".char");
//         SplitType.revert(".split");
//       },
//     },
//   });
// });
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
