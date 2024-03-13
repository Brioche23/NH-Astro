import React, { useState, useRef } from "react";

function VideoInfo({ slug, title, description, videoUrl, posterUrl }) {
  const videoRef = useRef(null); // useRef for video element reference
  const [isPlaying, setIsPlaying] = useState(false); // Individual state
  const [isMuted, setIsMuted] = useState(false); // Individual state

  const [textPosition, setTextPosition] = useState({ x: "50%", y: "50%" });
  const [textVisibility, setTextVisibility] = useState("visible");
  const textRef = useRef(null);

  const showCursor = () => {
    setTextVisibility("visible");
  };
  const hideCursor = () => {
    setTextVisibility("hidden");
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const textWidth = textRef.current.offsetWidth;
    const textHeight = textRef.current.offsetHeight;

    // Calculate text position considering its size
    const newX = clientX - textWidth / 2;
    const newY = clientY - textHeight / 2;

    console.log(newX);

    // Ensure text stays within the div boundaries (optional)
    const divRect = textRef.current.parentElement.getBoundingClientRect();
    const maxX = divRect.right - textWidth;
    const maxY = divRect.bottom - textHeight;

    setTextPosition({
      x: Math.min(newX, maxX), // Clamp X to div bounds
      y: Math.min(newY, maxY), // Clamp Y to div bounds
    });
  };

  const handleMutedUnmute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = 1;
    } else {
      video.volume = 0;
    }
    setIsMuted(!isMuted);
  };
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="top" className={`video-card relative w-full`}>
      <div className="relative">
        <div
          className="controls-overlay absolute w-full h-full text-xl md:text-3xl"
          onMouseMove={handleMouseMove}
          onMouseEnter={showCursor}
          onMouseLeave={hideCursor}
        >
          <button
            className="play-button absolute"
            onClick={handlePlayPause}
            ref={textRef}
            style={{
              left: textPosition.x,
              top: textPosition.y,
              visibility: textVisibility,
            }}
          >
            {isPlaying ? "pause" : "play"}
          </button>

          <a href={"/#" + slug}>
            <button
              className="close-button absolute top-5 right-5"
              onMouseEnter={hideCursor}
              onMouseLeave={showCursor}
            >
              close
            </button>
          </a>

          <div className="play-bar ">
            <button
              className="mute-button"
              onClick={handleMutedUnmute}
              onMouseEnter={hideCursor}
              onMouseLeave={showCursor}
            >
              {isMuted ? "unmute" : "mute"}
            </button>
          </div>
        </div>
        <div id={title} className="video-wrapper relative">
          <video
            className="w-full"
            ref={videoRef}
            poster={posterUrl}
            src={videoUrl}
            controls={false}
            muted
          />
        </div>
      </div>
      <div className={"info-panel px-4 grid grid-rows-[1fr] pt-5"}>
        <div className="w-full md:flex md:space-x-5 overflow-hidden text-xl md:text-3xl">
          <div className="title md:w-1/3">
            <p className=" uppercase">{title}</p>
          </div>
          <div
            className="credits pt-5 md:pt-0 md:w-1/3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default VideoInfo;
