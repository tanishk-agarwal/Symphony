import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => {
  //variable for spinning coverart
  const activesrc = activeSong.images
    ? activeSong.images.coverart
    : "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/0c/c3/27/0cc32710-9ab1-5a3e-968c-8001391538b7/artwork.jpg/400x400cc.jpg";
  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img src={activesrc} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.title ? activeSong?.title : "No active Song"}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
        </p>
      </div>
    </div>
  );
};

export default Track;
