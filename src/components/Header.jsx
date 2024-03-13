import React, { useState, useRef } from "react";
import { Image } from "astro:assets";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

function Header({}) {
  const logo = useRef();

  //   gsap.registerPlugin(useGSAP);

  const container = useRef();

  useGSAP(
    () => {
      // gsap code here...
      gsap.to("#logo", {
        width: 150,
        duration: 1,
        scrollTrigger: {
          trigger: "#logo",
          start: "top top",
          scrub: 0.5,
          markers: false,
        },
      });
    },
    { scope: logo }
  ); // <-- scope is for selector text (optional)
  return (
    <header>
      <nav>
        <a id="logo" href={"/"} class="fixed z-30 pt-4 px-4 w-36" ref={logo}>
          {/* <Image src={logo} alt="NoiseHeroes Logo" class:list={"w-full"} /> */}
          <p className="w-full">Logo</p>
        </a>
      </nav>
    </header>
  );
}

export default Header;
