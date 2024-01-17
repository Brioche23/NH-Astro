gsap.registerPlugin(ScrollTrigger);

// create a timeline
let tl = gsap.timeline();

let mm = gsap.matchMedia();

tl.fromTo(
  ".intro-text",
  { opacity: 0 },
  { opacity: 1, delay: 0.5, duration: 2, stagger: 1 }
);

gsap.utils.toArray(".block").forEach((block, i) => {
  tl.from(block, {
    scrollTrigger: {
      trigger: block,
      start: "top top",
      pin: true,
      scrub: 1,
      markers: false,
    },
  });
});
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
