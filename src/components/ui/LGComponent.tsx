import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageDoc from "./ImageDoc";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

interface LGProps {
  images: Images[]; // array of image objects
}

interface Images {
  id: number;
  loc: string;
  name: string;
  thumb: string;
}

export interface LGRef {
  openGallery: (index: number) => void;
}

const LGComponent = forwardRef<LGRef, LGProps>(({ images }, ref) => {
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

  return (
    <div className="w-full h-full">
      <LightGallery
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail]}
        // elementClassNames={"gallery fj-gallery w-screen h-full flex-auto"}
        dynamic={true}
        zoomFromOrigin={true}
        dynamicEl={images.map((image) => ({
          src: image.loc,
          thumb: image.thumb,
        }))}
      >
        <div className="w-full h-full">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px" style={{ width: "100%", height: "100%" }}>
              {images.map((image, index) => (
                <ImageDoc key={index} image={image} onOpen={handleOpen} />
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
