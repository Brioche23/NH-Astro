import React, { useState, useRef } from "react";

function VideoList({ posts }) {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <ul className="grid gap-5">
      {posts.map((post, index) => (
        <VideoPlayer
          inHome={post.inHome}
          key={post.slug}
          index={index}
          slug={post.slug}
          title={post.title}
          description={post.description}
          videoUrl={post.video}
          posterUrl={post.videoPoster}
          isActive={index === activeVideoId}
          onClick={() => setActiveVideoId(index)}
          width={getRandom(videoSizes)}
          alignment={getAlignement(index)}
        />
      ))}
    </ul>
  );
}

const videoSizes = ["md:w-1/2 ", "md:w-2/3 ", "md:w-1/3 "];

const videoMarginsLeft = ["md:ml-0 ", "md:ml-20 "];
const videoMarginsRight = ["md:mr-0 ", "md:mr-20 "];
function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getAlignement(index) {
  const alignment = index % 2 == 0 ? "md:mr-auto " : "md:ml-auto ";

  const margin =
    index % 2 == 0 ? getRandom(videoMarginsLeft) : getRandom(videoMarginsRight);

  const final_al = alignment + margin;
  return final_al;
}

function VideoPlayer({
  inHome,
  slug,
  index,
  title,
  description,
  videoUrl,
  posterUrl,
  width,
  alignment,
}) {
  const videoRef = useRef(null); // useRef for video element reference
  const [isPlaying, setIsPlaying] = useState(false); // Individual state

  const video_class = `video-card relative transition-all duration-500 ease-in-out ${width} ${alignment}`;

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

  if (inHome)
    return (
      <a className="op" id={slug} href={"/videos/" + slug}>
        <li
          onMouseEnter={handlePlay}
          onMouseLeave={handlePause}
          className={video_class}
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
                poster={posterUrl.fields.file.url}
                src={videoUrl.fields.file.url}
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
