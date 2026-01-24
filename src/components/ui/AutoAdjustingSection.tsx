"use client";

import React, { useRef, useEffect, useState } from "react";

interface AutoAdjustingSectionProps {
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  title?: string;
  onImageClick?: () => void;
  mediaContent?: React.ReactNode; // For custom content like VideoDock
}

const AutoAdjustingSection: React.FC<AutoAdjustingSectionProps> = ({
  children,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  title,
  onImageClick,
  mediaContent,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);

  useEffect(() => {
    const adjustHeights = () => {
      if (!textRef.current || !containerRef.current) return;

      // If using custom mediaContent, use mediaRef; otherwise use imageRef
      const elementToAdjust = mediaContent
        ? mediaRef.current
        : imageRef.current;
      if (!elementToAdjust) return;

      const containerWidth = containerRef.current.offsetWidth;

      // Calculate available space
      const gap = 16; // gap-4 in Tailwind = 16px
      let availableMediaWidth: number;

      if (containerWidth < 768) {
        // Mobile: full width for both
        availableMediaWidth = containerWidth - 48; // minus padding
      } else {
        // Desktop: split the space
        availableMediaWidth = (containerWidth - 48 - gap) / 2;
      }

      // Calculate text height
      const textHeight = textRef.current.offsetHeight;

      // For images, calculate aspect ratio and adjust
      if (!mediaContent && imageRef.current) {
        // Reset image to natural size first to get accurate measurements
        imageRef.current.style.height = "auto";
        imageRef.current.style.width = "auto";

        const naturalWidth = imageRef.current.naturalWidth;
        const naturalHeight = imageRef.current.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;

        // Try to match text height
        let newImageHeight = textHeight;
        let newImageWidth = newImageHeight * aspectRatio;

        // If image would be too wide, constrain by width instead
        if (newImageWidth > availableMediaWidth) {
          newImageWidth = availableMediaWidth;
          newImageHeight = newImageWidth / aspectRatio;
        }

        // If image would be too short, expand it to fill more space
        if (newImageHeight < textHeight * 0.5) {
          newImageHeight = textHeight * 0.8;
          newImageWidth = newImageHeight * aspectRatio;
        }

        setMediaHeight(newImageHeight);
        imageRef.current.style.height = `${newImageHeight}px`;
        imageRef.current.style.width = `${newImageWidth}px`;
      } else if (mediaContent && mediaRef.current) {
        // For custom media content (like videos), just set max width and let it scale
        mediaRef.current.style.maxWidth = `${availableMediaWidth}px`;
        mediaRef.current.style.width = "100%";
      }
    };

    // Wait for image to load if using an image
    const img = imageRef.current;
    if (img && !mediaContent) {
      if (img.complete) {
        adjustHeights();
      } else {
        img.addEventListener("load", adjustHeights);
      }
    } else {
      // For mediaContent, adjust immediately and on resize
      adjustHeights();
    }

    // Adjust on window resize
    const resizeObserver = new ResizeObserver(adjustHeights);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      if (img) {
        img.removeEventListener("load", adjustHeights);
      }
      resizeObserver.disconnect();
    };
  }, [children, mediaContent]);

  return (
    <section
      ref={containerRef}
      className="bg-slate-400/50 dark:bg-slate-900/50 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 border-2 border-gray-800 dark:border-gray-200 backdrop-blur-sm"
    >
      {title && <h1 className="text-2xl mb-4">{title}</h1>}

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {imagePosition === "left" && (
          <div
            ref={mediaRef}
            className="flex-shrink-0 flex items-start justify-center md:max-w-[50%]"
          >
            {mediaContent
              ? mediaContent
              : imageSrc && (
                  <img
                    ref={imageRef}
                    src={imageSrc}
                    alt={imageAlt || ""}
                    onClick={onImageClick}
                    className="object-contain rounded-lg dark:bg-gray-800/50 bg-gray-200/50 p-2 shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 max-w-full"
                  />
                )}
          </div>
        )}

        <div
          ref={textRef}
          className="flex-1 flex flex-col justify-center p-4 text-center md:text-left"
        >
          {children}
        </div>

        {imagePosition === "right" && (
          <div
            ref={mediaRef}
            className="flex-shrink-0 flex items-start justify-center md:max-w-[50%]"
          >
            {mediaContent
              ? mediaContent
              : imageSrc && (
                  <img
                    ref={imageRef}
                    src={imageSrc}
                    alt={imageAlt || ""}
                    onClick={onImageClick}
                    className="object-contain rounded-lg dark:bg-gray-800/50 bg-gray-200/50 p-2 shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 max-w-full"
                  />
                )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AutoAdjustingSection;
