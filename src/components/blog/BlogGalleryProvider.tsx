"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
} from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";

// Import LightGallery styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";

export interface GalleryItem {
  src: string;
  thumb: string;
  caption?: string;
  isVideo?: boolean;
  poster?: string;
}

interface LightGalleryInstance {
  openGallery: (index: number) => void;
  refresh: () => void;
}

interface BlogGalleryContextType {
  registerItem: (item: GalleryItem) => number;
  openGallery: (index: number) => void;
  getItemIndex: (src: string) => number;
}

const BlogGalleryContext = createContext<BlogGalleryContextType | null>(null);

export function useBlogGallery() {
  const context = useContext(BlogGalleryContext);
  if (!context) {
    throw new Error("useBlogGallery must be used within BlogGalleryProvider");
  }
  return context;
}

interface BlogGalleryProviderProps {
  children: React.ReactNode;
}

export function BlogGalleryProvider({ children }: BlogGalleryProviderProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const lightGalleryRef = useRef<LightGalleryInstance | null>(null);
  const registeredSrcs = useRef<Map<string, number>>(new Map());
  const nextIndex = useRef(0);

  // Register a gallery item and return its index
  const registerItem = useCallback((item: GalleryItem): number => {
    // Check if already registered to avoid duplicates
    if (registeredSrcs.current.has(item.src)) {
      return registeredSrcs.current.get(item.src)!;
    }

    const index = nextIndex.current;
    registeredSrcs.current.set(item.src, index);
    nextIndex.current++;
    
    setItems((prev) => [...prev, item]);

    return index;
  }, []);

  // Get item index by src
  const getItemIndex = useCallback((src: string): number => {
    return registeredSrcs.current.get(src) ?? -1;
  }, []);

  // Open gallery at specific index
  const openGallery = useCallback((index: number) => {
    lightGalleryRef.current?.openGallery(index);
  }, []);

  // Initialize LightGallery
  const onInit = useCallback(
    (detail: { instance: LightGalleryInstance }) => {
      if (detail) {
        lightGalleryRef.current = detail.instance;
      }
    },
    []
  );

  // Build dynamic elements for LightGallery
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dynamicElements: any[] = items.map((item) => {
    if (item.isVideo) {
      return {
        src: item.src,
        thumb: item.poster || item.thumb,
        subHtml: item.caption ? `<p>${item.caption}</p>` : undefined,
        video: {
          source: [
            {
              src: item.src,
              type: item.src.endsWith(".webm") ? "video/webm" : "video/mp4",
            },
          ],
          tracks: [],
          attributes: {
            preload: "metadata",
            controls: true,
          },
        },
      };
    }
    return {
      src: item.src,
      thumb: item.thumb,
      subHtml: item.caption ? `<p>${item.caption}</p>` : undefined,
    };
  });

  return (
    <BlogGalleryContext.Provider value={{ registerItem, openGallery, getItemIndex }}>
      {children}
      {/* Hidden LightGallery component */}
      {items.length > 0 && (
        <LightGallery
          onInit={onInit}
          dynamic={true}
          plugins={[lgZoom, lgThumbnail, lgVideo]}
          dynamicEl={dynamicElements}
          download={false}
          counter={true}
          hideScrollbar={true}
        />
      )}
    </BlogGalleryContext.Provider>
  );
}
