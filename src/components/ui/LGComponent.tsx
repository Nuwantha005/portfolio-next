import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageDoc from "./ImageDoc";
import VideoDock from "./VideoDock";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";
import videojs from "video.js";

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
    }
  }, []);

  const handleOpen = (index: number) => {
    galleryRef.current?.openGallery(index);
  };

  const dynamicEl = items.map((item) => {
    if (item.type === "video") {
      return {
        alt: item.name,
        thumb: item.thumb,
        subHtml: `<h4>${item.name}</h4>`,
        poster: item.poster,
        src: item.loc,
        video: JSON.stringify({
          source: [
            {
              src: item.loc,
              type: "video/mp4",
            },
          ],
          attributes: {
            preload: true,
            controls: true,
          },
        }),
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
        plugins={[lgZoom, lgThumbnail, lgVideo]}
        dynamic={true}
        closable={true}
        thumbWidth={130}
        thumbHeight={"100px"}
        thumbMargin={6}
        rotate={true}
        appendSubHtmlTo={".lg-item"}
        dynamicEl={dynamicEl}
        animateThumb={true}
        videojs={true}
        iframe={true}
        videojsOptions={{ muted: true }}
        elementClassNames={"inline-gallery-container"}
      >
        <div className="w-full h-full">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px" style={{ width: "100%", height: "100%" }}>
              {items
                .filter((item) => item.type === "video")
                .map((item, index) => (
                  <VideoDock key={index} video={item} onOpen={handleOpen} />
                ))}
              {items
                .filter((item) => item.type === "image")
                .map((item, index) => (
                  <ImageDoc key={index} image={item} onOpen={handleOpen} />
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
