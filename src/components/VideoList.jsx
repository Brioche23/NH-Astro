import React, { useState, useRef } from "react";

function VideoList({ posts }) {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <ul className="grid gap-5">
      {posts.map((post, index) => (
        <VideoPlayer
          key={post.slug}
          slug={post.slug}
          title={post.title}
          description={post.description}
          videoUrl={post.video.fields.file.url}
          posterUrl={post.videoPoster.fields.file.url}
          isActive={index === activeVideoId}
          onClick={() => setActiveVideoId(index)}
          width={getRandomWidth()}
        />
      ))}
    </ul>
  );
}

const videoSizes = [
  "md:w-1/2 md:ml-auto md:mr-20",
  "md:w-1/2 md:ml-auto md:ml-20",
  "md:w-2/3 md:ml-auto md:mr-0",
  "md:w-2/3 md:mr-auto md:ml-0",
  "md:w-1/3 md:ml-auto md:mr-0",
  "md:w-1/3 md:mr-auto md:ml-0",
];

function getRandomWidth() {
  return videoSizes[Math.floor(Math.random() * videoSizes.length)];
}

function VideoPlayer({ slug, title, description, videoUrl, posterUrl, width }) {
  const videoRef = useRef(null); // useRef for video element reference
  const [isPlaying, setIsPlaying] = useState(false); // Individual state

  const handlePlay = () => {
    const video = videoRef.current;
    if (!isPlaying) video.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    const video = videoRef.current;
    if (isPlaying) video.pause();
    setIsPlaying(false);
  };
  // const handlePlayPause = () => {
  //   const video = videoRef.current;
  //   if (isPlaying) {
  //     video.pause();
  //   } else {
  //     video.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  return (
    <a id={slug} href={"/videos/" + slug}>
      <li
        onMouseEnter={handlePlay}
        onMouseLeave={handlePause}
        className={`video-card relative transition-all duration-500 ease-in-out ${width}`}
      >
        <div className="vimeo-full relative">
          {/* <div className="controls-overlay absolute w-full h-full text-xl md:text-3xl hidden">
          <button className="play-button absolute">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="play-button absolute">play</button> 
          <button className="close-button absolute top-5 right-5">close</button>

          <div className="play-bar ">
            <button className="mute-button">mute</button>
          </div>
        </div> */}
          <div id={title} className="video-wrapper relative ">
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
        {/* <div
        className={
          "info-panel px-4 grid grid-rows-[0fr] transition-all duration-500 ease-in-out pt-5"
        }
      >
        <div className="w-full flex space-x-5 overflow-hidden text-xl md:text-3xl">
          <div className="title w-1/2 md:w-1/3">
            <p className=" uppercase">{title}</p>
          </div>
          <div
            className="credits w-1/2 md:w-1/3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div> */}
      </li>
    </a>
  );
}

export default VideoList;
