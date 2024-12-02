import React, { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const getVideoSource = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 w-screen h-dvh overflow-hidden rounded-lg bg-blue-50"
      >
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            className="videoPlayer scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            onClick={handleMiniVideoClick}
          >
            <video
              ref={nextVideoRef}
              src={getVideoSource((currentIndex % totalVideos) + 1)}
              loop
              muted
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center"
              onLoadedData={handleVideoLoaded}
            />
          </div>
        </div>

        {/* Main background video */}
        <video
          ref={nextVideoRef}
          src={getVideoSource(currentIndex)}
          loop
          autoPlay
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoaded}
        />

        {/* Preload next videos */}
        {[...Array(totalVideos)].map((_, index) => (
          <video
            key={index + 1}
            src={getVideoSource(index + 1)}
            className="hidden"
            preload="auto"
            onLoadedData={handleVideoLoaded}
          />
        ))}
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 z-50 text-blue-75">
        G<b>a</b>ming
      </h1>
      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100">
            redefi<b>n</b>e
          </h1>
          <p className="mt-2.5 max-w-64 font-robert-regular text-blue-100">
            Enter Metagame Layer <br />
            Unleash the Paly Economy
          </p>
          <Button
            id="watch-trailer"
            title="Watch Trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center gap-1"
          />
        </div>
      </div>
      <h1 className="special-font hero-hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
