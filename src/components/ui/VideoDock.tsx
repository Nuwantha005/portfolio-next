import React from "react";

interface VideoDockProps {
  video: {
    id: number;
    loc: string;
    thumb: string;
    name: string;
    poster: string;
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
      }}
      key={video.id}
      onClick={() => onOpen(video.id)}
      className="gallery__item fj-gallery-item m-2"
      data-index={video.id}
      data-src={video.loc}
    >
      <video
        className="video-js w-full object-cover rounded-lg dark:bg-gray-800/50 bg-gray-200/50 p-2 shadow-md"
        src={video.loc}
        poster={video.poster}
        autoPlay
        loop
        muted
        playsInline
      />
      <h3 className="caption text-center">{video.name}</h3>
    </a>
  );
};

export default VideoDock;
