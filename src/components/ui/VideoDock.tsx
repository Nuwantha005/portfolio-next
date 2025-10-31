import React from "react";
import Image from "next/image";

interface VideoDockProps {
  video: {
    id: number;
    loc: string;
    thumb: string;
    name: string;
    poster?: string;
  };
  onOpen: (index: number) => void;
}

const VideoDock: React.FC<VideoDockProps> = ({ video, onOpen }) => {
  if (!video) {
    return null;
  }

  return (
    <a
      style={{
        cursor: "pointer",
        position: "relative",
        display: "block",
      }}
      key={video.id}
      onClick={() => onOpen(video.id)}
      className="gallery__item fj-gallery-item m-2"
      data-index={video.id}
      data-src={video.loc}
    >
      {/* Actual video that autoplays in the gallery */}
      <video
        className="w-full object-cover rounded-lg dark:bg-gray-800/50 bg-gray-200/50 p-2 shadow-md"
        src={video.loc}
        poster={video.poster || video.thumb}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      
      {/* Play icon overlay to indicate it's clickable for fullscreen */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="white"
          opacity="0.7"
        >
          <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)" />
          <path d="M9 8l8 4-8 4z" />
        </svg>
      </div>
      <h3 className="caption text-center">{video.name}</h3>
    </a>
  );
};

export default VideoDock;
