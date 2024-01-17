console.log("hello");
const videoCards = document.querySelectorAll("li.video-card");
const infoPanels = document.querySelectorAll(".info-panel");
const vimeoTitles = document.querySelectorAll(".vimeo-title");
// Handle clicks on each button.
let prevIndex = "";

videoCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    toggleOpacity(videoCards, index);
    toggleInfo(infoPanels, index);
    toggleTitle(vimeoTitles, index);

    console.log("Prev Index:" + prevIndex);
    console.log("Index:" + index);

    prevIndex = index;
  });
});

function toggleOpacity(videoCards, index) {
  videoCards.forEach((card, i) => {
    if (i !== index) {
      card.style.width = card.style.width === "100%" ? "" : "";

      if (prevIndex == index) {
        card.classList.toggle("opacity-50");
        console.log("true");
      } else card.classList.add("opacity-50");
    } else {
      card.style.width = card.style.width === "100%" ? "" : "100%";
      card.classList.remove("opacity-50");
      card.classList.add("opacity-100");
    }
  });
}

function toggleInfo(infoPanels, index) {
  infoPanels.forEach((panel, i) => {
    if (i !== index) {
      panel.classList.add("grid-rows-[0fr]");
      panel.classList.remove("grid-rows-[1fr]");
    } else {
      panel.classList.toggle("grid-rows-[0fr]");
      panel.classList.toggle("grid-rows-[1fr]");
    }
  });
}
function toggleTitle(vimeoTitles, index) {
  vimeoTitles.forEach((title, i) => {
    if (i !== index) {
      title.classList.remove("opacity-0");
    } else {
      title.classList.toggle("opacity-0");
    }
  });
}
