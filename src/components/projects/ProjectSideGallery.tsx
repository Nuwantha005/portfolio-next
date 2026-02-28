"use client";

import React from "react";
import Image from "next/image";
import FloatingSection from "@/components/ui/FloatingSection";

interface GalleryItem {
  id: number;
  loc: string;
  name: string;
  thumb: string;
  type: "image" | "video";
  poster?: string;
}

interface ProjectSideGalleryProps {
  items: GalleryItem[];
  onOpen: (id: number) => void;
}

/**
 * Compact sidebar gallery for project pages.
 * Displays a 2-column masonry-like grid of thumbnails.
 * Clicking opens LightGallery via the existing onOpen callback.
 */
export default function ProjectSideGallery({
  items,
  onOpen,
}: ProjectSideGalleryProps) {
  if (items.length === 0) return null;

  return (
    <FloatingSection className="p-3">
      <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
        Gallery
      </h3>
      <div className="columns-2 gap-1.5 [column-fill:balance]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpen(item.id)}
            className="group relative rounded-md overflow-hidden cursor-pointer bg-slate-300/30 dark:bg-slate-700/30 hover:ring-2 hover:ring-blue-500/50 transition-all duration-200 mb-1.5 block w-full break-inside-avoid"
          >
            {item.type === "video" ? (
              <div className="relative">
                <Image
                  src={item.poster || item.thumb}
                  alt={item.name}
                  width={200}
                  height={0}
                  className="w-full h-auto"
                  style={{ height: "auto" }}
                />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    opacity="0.8"
                    className="drop-shadow-md"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ) : (
              <Image
                src={item.thumb}
                alt={item.name}
                width={200}
                height={0}
                className="w-full h-auto"
                style={{ height: "auto" }}
              />
            )}
            {/* Hover name tooltip */}
            <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] leading-tight px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate">
              {item.name}
            </div>
          </button>
        ))}
      </div>
    </FloatingSection>
  );
}
