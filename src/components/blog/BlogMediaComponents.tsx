"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBlogGallery } from "./BlogGalleryProvider";

interface BlogImageProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
  height?: string;
}

export function BlogImage({ src, alt, caption, width, height }: BlogImageProps) {
  const { registerItem, openGallery, getItemIndex } = useBlogGallery();
  const [galleryIndex, setGalleryIndex] = useState<number>(-1);
  const registered = useRef(false);

  useEffect(() => {
    if (!registered.current && src) {
      registered.current = true;
      const index = registerItem({
        src,
        thumb: src,
        caption: caption || alt,
      });
      setGalleryIndex(index);
    }
  }, [src, caption, alt, registerItem]);

  const handleClick = () => {
    // Get the current index in case it changed
    const currentIndex = getItemIndex(src);
    if (currentIndex >= 0) {
      openGallery(currentIndex);
    } else if (galleryIndex >= 0) {
      openGallery(galleryIndex);
    }
  };

  const style: React.CSSProperties = {
    cursor: "pointer",
    maxWidth: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "auto",
  };

  return (
    <figure className="my-6 flex flex-col items-center max-w-full">
      <img
        src={src}
        alt={alt || caption || ""}
        onClick={handleClick}
        style={style}
        className="rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800/50 bg-gray-200/50 p-2 max-w-full h-auto"
      />
      {(caption || alt) && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 italic">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  );
}

interface BlogVideoProps {
  src: string;
  caption?: string;
  width?: string;
  height?: string;
  poster?: string;
}

export function BlogVideo({ src, caption, width, height, poster }: BlogVideoProps) {
  const { registerItem, openGallery, getItemIndex } = useBlogGallery();
  const [galleryIndex, setGalleryIndex] = useState<number>(-1);
  const registered = useRef(false);

  useEffect(() => {
    if (!registered.current && src) {
      registered.current = true;
      const index = registerItem({
        src,
        thumb: poster || src,
        caption,
        isVideo: true,
        poster,
      });
      setGalleryIndex(index);
    }
  }, [src, caption, poster, registerItem]);

  const handleClick = () => {
    // Get the current index in case it changed
    const currentIndex = getItemIndex(src);
    if (currentIndex >= 0) {
      openGallery(currentIndex);
    } else if (galleryIndex >= 0) {
      openGallery(galleryIndex);
    }
  };

  const style: React.CSSProperties = {
    maxWidth: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "auto",
  };

  return (
    <figure className="my-6 flex flex-col items-center max-w-full">
      <div
        onClick={handleClick}
        className="cursor-pointer relative group max-w-full"
        style={style}
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800/50 bg-gray-200/50 p-2 max-w-full h-auto"
        />
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
          >
            <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)" />
            <path d="M9 8l8 4-8 4z" />
          </svg>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
