// declare module "flickr-justified-gallery" {
//   type FjGallery = (...args: any[]) => any;
//   const fjGallery: FjGallery;
//   export default fjGallery;
// }

//declare module "flickr-justified-gallery";

// declare module 'flickr-justified-gallery' {
//     const fjGallery: (elements: NodeListOf<Element>, options: Record<string, unknown>) => void;
//     export default fjGallery;
//   }
  
declare module "flickr-justified-gallery" {
    const fjGallery: (
      elements: NodeListOf<Element> | HTMLElement[],
      options: Record<string, unknown>
    ) => void;
    export default fjGallery;
  }
  