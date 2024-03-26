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
  const alignment = index % 2 === 0 ? "md:mr-auto " : "md:ml-auto ";

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

  if (inHome)
    return (
      <a className="op parallax group" id={slug} href={"/videos/" + slug}>
        <li
          onMouseEnter={handlePlay}
          onMouseLeave={handlePause}
          className={video_class}
        >
          <div className="vimeo-full relative ">
            <div id={title} className="video-wrapper relative ">
              <p className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                {title}
              </p>
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
        </li>
      </a>
    );
}

export default VideoList;
