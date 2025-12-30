import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageDoc from "./ImageDoc";
import VideoDock from "./VideoDock";
// LightGallery CSS is imported in galleryStyle.css

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

interface LGProps {
  items: GalleryItem[]; // array of gallery items (images and videos)
}

interface GalleryItem {
  id: number;
  loc: string;
  name: string;
  thumb: string;
  type: "image" | "video";
  poster?: string;
}

export interface LGRef {
  openGallery: (index: number) => void;
}

const LGComponent = forwardRef<LGRef, LGProps>(({ items }, ref) => {
  const galleryRef = useRef<{ openGallery: (index: number) => void } | null>(
    null
  );

  // Expose a method to open the gallery
  useImperativeHandle(ref, () => ({
    openGallery: (index: number) => {
      galleryRef.current?.openGallery(index);
    },
  }));

  // Initialize LightGallery
  const onInit = useCallback(
    (detail: { instance: { openGallery: (index: number) => void } }) => {
      if (detail) {
        galleryRef.current = detail.instance;
      }
    },
    []
  );

  // Initialize fjGallery
  useEffect(() => {
    if (typeof window !== "undefined") {
      const elements = document.querySelectorAll(".fj-gallery");
      if (elements.length > 0) {
        import("flickr-justified-gallery").then((fjGallery) => {
          fjGallery.default(elements, {
            itemSelector: ".fj-gallery-item",
            rowHeight: 180,
            maxRowsCount: 2,
            lastRow: "start",
            gutter: 2,
            rowHeightTolerance: 0.1,
            calculateItemsHeight: false,
          });
        });
      }
      
      // Warn about unsupported video formats
      const mkvVideos = items.filter(item => 
        item.type === 'video' && item.loc.toLowerCase().endsWith('.mkv')
      );
      if (mkvVideos.length > 0) {
        console.warn(
          '⚠️ MKV video format detected! Browsers do not natively support MKV files.',
          '\nVideos affected:', mkvVideos.map(v => v.name),
          '\nPlease convert to MP4 format for full browser compatibility.',
          '\nSee convert_videos.py script in the project folder.'
        );
      }
    }
  }, [items]);

  const handleOpen = (index: number) => {
    galleryRef.current?.openGallery(index);
  };

  // Create a mapping from item ID to gallery index
  const idToIndexMap = new Map<number, number>();
  items.forEach((item, index) => {
    idToIndexMap.set(item.id, index);
  });

  // Wrapper function to convert ID to index before opening gallery
  const handleOpenById = (id: number) => {
    const index = idToIndexMap.get(id);
    if (index !== undefined) {
      handleOpen(index);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dynamicEl: any[] = items.map((item) => {
    if (item.type === "video") {
      // Detect video type from file extension
      const extension = item.loc.split('.').pop()?.toLowerCase();
      let videoType = 'video/mp4';
      
      // Map file extensions to MIME types
      if (extension === 'mkv') {
        videoType = 'video/x-matroska';
      } else if (extension === 'webm') {
        videoType = 'video/webm';
      } else if (extension === 'ogg' || extension === 'ogv') {
        videoType = 'video/ogg';
      }
      
      return {
        alt: item.name,
        thumb: item.thumb,
        subHtml: `<h4>${item.name}</h4>`,
        poster: item.poster || item.thumb,
        // For video.js, use this format
        video: {
          source: [
            {
              src: item.loc,
              type: videoType,
            },
          ],
          attributes: {
            preload: 'auto',
            controls: true,
          },
        },
        // Disable zoom for videos
        disableZoom: true,
      };
    } else {
      return {
        alt: item.name,
        src: item.loc,
        thumb: item.thumb,
        subHtml: `<h4>${item.name}</h4>`,
      };
    }
  });
  
  return (
    <div className="w-full h-full">
      <LightGallery
        onInit={onInit}
        plugins={[lgThumbnail, lgVideo]}
        dynamic={true}
        closable={true}
        thumbWidth={130}
        thumbHeight={"100px"}
        thumbMargin={6}
        rotate={true}
        appendSubHtmlTo={".lg-item"}
        dynamicEl={dynamicEl}
        animateThumb={true}
        elementClassNames={"inline-gallery-container"}
      >
        <div className="w-full h-full">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px" style={{ width: "100%", height: "100%" }}>
              {items
                .filter((item) => item.type === "video")
                .map((item) => (
                  <VideoDock key={item.id} video={item} onOpen={handleOpenById} />
                ))}
              {items
                .filter((item) => item.type === "image")
                .map((item) => (
                  <ImageDoc key={item.id} image={item} onOpen={handleOpenById} />
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </LightGallery>
    </div>
  );
});

LGComponent.displayName = "LGComponent";

export default LGComponent;
