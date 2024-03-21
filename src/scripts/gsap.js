import gsap from "gsap";
import Swup from "swup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    // let logoH = gsap.getProperty("#logo", "height");
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
    );
    tl.fromTo(
      "#logo",
      {
        y: innerHeight - logoH,
      },
      {
        y: 0,
        width: 300,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#logo",
          start: "0",
          end: "500",
          scrub: 2,
          markers: false,
          onUpdate: (self) => {
            console.log("progress:", self.progress);
            if (self.progress === 1) scrollNav();
          },
        },
      },
      "scroll-up"
    );

    function scrollNav() {
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    }

    const showAnim = gsap
      .from(
        "#logo",
        {
          yPercent: -100,
          paused: true,
          duration: 0.2,
        },
        "scroll"
      )
      .progress(1);
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
      translateY: "50px",
      opacity: 0,
      stagger: 0.5,
      ease: "sine.inOut",
    });
  });
}

function init() {
  if (window.location.pathname === "/") {
    bigLogo();
    elementsFadeIn();
    services();
  }
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
