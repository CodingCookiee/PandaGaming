import React from "react";

const Hero = () => {
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 w-screen h-dvh overflow-hidden rounded-lg bg-blue-50"
      >
        <div className="mask-clip-path"></div>
      </div>
    </div>
  );
};

export default Hero;
