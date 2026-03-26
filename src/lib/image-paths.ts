const imageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".tif",
  ".tiff",
  ".bmp",
]);

interface ThumbPathOptions {
  thumbDirName?: string;
  thumbFormat?: string;
}

export function getThumbPath(src: string, options: ThumbPathOptions = {}): string {
  const thumbDirName = options.thumbDirName ?? "thumbs";
  const thumbFormat = options.thumbFormat ?? "webp";

  if (!src.startsWith("/") || src.startsWith("//")) {
    return src;
  }

  const cleanPath = src.split("?")[0].split("#")[0];
  const extensionIndex = cleanPath.lastIndexOf(".");
  if (extensionIndex === -1) {
    return src;
  }

  const ext = cleanPath.slice(extensionIndex).toLowerCase();
  if (!imageExtensions.has(ext)) {
    return src;
  }

  const lastSlash = cleanPath.lastIndexOf("/");
  if (lastSlash === -1) {
    return src;
  }

  const dir = cleanPath.slice(0, lastSlash);
  const fileBase = cleanPath.slice(lastSlash + 1, extensionIndex);

  if (!fileBase) {
    return src;
  }

  return `${dir}/${thumbDirName}/${fileBase}.${thumbFormat}`;
}

export function getBlogThumbPath(src: string): string {
  if (!src.startsWith("/blog/")) {
    return src;
  }
  return getThumbPath(src);
}
