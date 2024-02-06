import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

const RandomWords = ({ words }) => {
  const wordsContainerRef = useRef(null);

  useEffect(() => {
    const wordsContainer = wordsContainerRef.current;

    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }

    words.forEach((word) => {
      console.log(word);
      const newWord = document.createElement("span");
      newWord.textContent = word;

      const randomTop = getRandomNumber(
        document.body.scrollHeight / 2,
        document.body.scrollHeight
      );
      const randomLeft = getRandomNumber(0, window.innerWidth - 250);

      Object.assign(newWord.style, {
        position: "absolute",
        top: `${randomTop}px`,
        left: `${randomLeft}px`,
        fontSize: `${getRandomNumber(12, 24)}px`,
      });

      newWord.classList.add("random-word");
      wordsContainer.appendChild(newWord);
    });
  }, [words]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".random-word", {
      y: (i, el) =>
        (1 - gsap.utils.random(0.1, 0.8)) * ScrollTrigger.maxScroll(window),
      ease: "none",
      scrollTrigger: {
        start: "top center",
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0,
        markers: false,
      },
    });
  });

  return (
    <div
      ref={wordsContainerRef}
      id="wordContainer"
      className="floater font-display uppercase text-7xl"
    >
      {/* Your random words will be created and appended here */}
    </div>
  );
};

export default RandomWords;
