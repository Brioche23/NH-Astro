import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

tl.to("#logo", {
  width: 100,
  duration: 3,
  scrollTrigger: {
    trigger: "#logo",
    start: "top top",
    scrub: 0,
    markers: true,
  },
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
        start: "top center",
        scrub: 1,
      },
      opacity: 0,
      stagger: 0.5,
    });
  });
});
