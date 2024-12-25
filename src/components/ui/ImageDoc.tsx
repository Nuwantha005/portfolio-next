import Image from "next/image";
import React from "react";

interface ImageDocProps {
  image: {
    id: number;
    loc: string;
    thumb: string;
    name: string;
  };
  onOpen: (index: number) => void;
}

const ImageDoc: React.FC<ImageDocProps> = ({ image, onOpen }) => {
  if (!image) {
    return null;
  }

  return (
    <a
      style={{
        cursor: "pointer",
      }}
      key={image.id}
      onClick={() => onOpen(image.id)}
      className="gallery__item fj-gallery-item m-2"
      data-index={image.id}
      data-src={image.loc}
    >
      <Image
        alt={image.name}
        className="w-full object-cover rounded-lg dark:bg-gray-800/50 bg-gray-200/50  p-2 shadow-md"
        src={image.thumb}
        width={600}
        height={400}
      />
      <h3 className="caption text-center">{image.name}</h3>
    </a>
  );
};

export default ImageDoc;
