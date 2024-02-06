// Define the behaviour for our new type of HTML element.
class AstroVimeo extends HTMLElement {
  constructor() {
    super();

    const url = this.dataset.url;
    const title = this.dataset.title;

    const options = {
      url: url,
      loop: true,
      portrait: 0,
      muted: 0,
      autoplay: 0,
      autopause: 1,
      title: 0,
      controls: 0,
      responsive: 1,
      width: 480,
    };

    const player = new Vimeo.Player(title, options);
    let isPlaying = false;

    // const playButton = this.querySelector("button.play-button");
    const controlsOvelay = this.querySelector(".controls-overlay");
    const muteButton = this.querySelector("button.mute-button");
    const closeButton = this.querySelector("button.close-button");
    const progressBar = this.querySelector(".progress-bar");

    const vimeoContent = this.querySelector("div.video-wrapper");
    const videoCard = vimeoContent?.parentNode?.parentNode?.parentNode;
    const infoPanel = videoCard.querySelector(".info-panel");

    vimeoContent.addEventListener("click", () => {
      if (videoCard.dataset.open == "false") {
        console.log("First CLick");
        //Play Video
        // isPlaying ? player.pause() :  player.play();
        player.play();
        isPlaying = true;

        //Opacizza e rimpicciolosci le altre
        setAllCards("back");

        //Scale Window, Put it in front and add opacity
        videoCard.dataset.open = "true";
        videoCard.classList.remove("back");
        videoCard.classList.add("play");
        infoPanel.classList.add("grid-rows-[1fr]");
      }
    });

    player.on("play", function () {
      console.log("played the video!");
      controlsOvelay.style.visibility = "visible";
      isPlaying = true;
    });

    player.on("timeupdate", function (data) {
      let playePerc = Math.round(data.percent * 1000);
      progressBar.x2.baseVal.value = playePerc;
    });

    player.on("pause", function () {
      console.log("stop the video!");
      controlsOvelay.style.visibility = "hidden";
      isPlaying = false;
    });

    // vimeoContent.addEventListener("mousemove", (e) => {
    //   console.log(playButton);

    //   playButton.style.left = e.clientX - playButton.offsetWidth / 2 + "px";
    //   playButton.style.top = e.clientY - playButton.offsetHeight / 2 + "px";
    // });

    // playButton.addEventListener("click", () => {
    //   isPlaying ? player.pause() : player.play();
    //   playButton.innerHTML = isPlaying ? "PLAY" : "PAUSE";
    //   isPlaying = !isPlaying;
    // });

    muteButton.addEventListener("click", () => {
      if (muteButton.classList.contains("muted")) {
        console.log("Unmute!");
        muteButton.classList.remove("muted");
        muteButton.childNodes[1].src = "/icons/volume_on.svg";
        player.setVolume(1);
      } else {
        console.log("Mute!");
        muteButton.classList.add("muted");
        muteButton.childNodes[1].src = "/icons/volume_off.svg";
        player.setVolume(0);
      }
    });

    closeButton.addEventListener("click", () => {
      console.log("Closing Window");
      player.pause();
      setAllCards("all");
    });
  }
}
// Tell the browser to use our AstroVimeo class for <astro-vimeo> elements.
customElements.define("astro-vimeo", AstroVimeo);

const setAllCards = (mode) => {
  console.log("Resize");
  const videoCards = document.querySelectorAll("li.video-card");
  const infoPanels = document.querySelectorAll(".info-panel");

  videoCards.forEach((card) => {
    card.dataset.open = "false";
    card.classList.remove("play");

    if (mode == "back") {
      card.classList.add("back");
    }

    if (mode == "all") {
      card.classList.remove("back");
    }
  });

  infoPanels.forEach((panel) => {
    panel.classList.remove("grid-rows-[1fr]");
  });
};
