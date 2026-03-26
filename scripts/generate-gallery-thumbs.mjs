import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "image-pipeline.config.json");

const defaultConfig = {
  thumbnail: {
    format: "webp",
    width: 1200,
    quality: 86,
    fit: "inside",
    withoutEnlargement: true,
  },
  projects: {
    sourceDir: "public/projects",
    manifestFiles: ["files.json", "images.json"],
    thumbDirName: "thumbs",
    rewriteThumbWhenSameAsLoc: true,
    forceRegenerate: false,
  },
  blog: {
    sourceDir: "public/blog",
    thumbDirName: "thumbs",
    forceRegenerate: false,
  },
};

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

function isImagePath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return imageExtensions.has(ext);
}

function mergeConfig(base, overrides) {
  return {
    ...base,
    ...overrides,
    thumbnail: {
      ...base.thumbnail,
      ...(overrides?.thumbnail ?? {}),
    },
    projects: {
      ...base.projects,
      ...(overrides?.projects ?? {}),
    },
  };
}

async function loadConfig() {
  try {
    const raw = await fs.readFile(configPath, "utf8");
    const parsed = JSON.parse(raw);
    return mergeConfig(defaultConfig, parsed);
  } catch {
    return defaultConfig;
  }
}

async function findManifestFiles(projectsDir, manifestNames) {
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const projectDir = path.join(projectsDir, entry.name);
    for (const name of manifestNames) {
      const manifestPath = path.join(projectDir, name);
      try {
        await fs.access(manifestPath);
        files.push(manifestPath);
      } catch {
        // Ignore missing optional manifest files.
      }
    }
  }

  return files;
}

function toPublicPath(absPath) {
  const rel = path.relative(path.join(rootDir, "public"), absPath);
  return `/${rel.split(path.sep).join("/")}`;
}

function shouldProcessItem(item) {
  if (!item || typeof item !== "object") return false;
  if (typeof item.loc !== "string" || item.loc.length === 0) return false;
  if (item.loc.startsWith("http://") || item.loc.startsWith("https://")) return false;
  if (!isImagePath(item.loc)) return false;
  if (item.type && item.type !== "image") return false;
  return true;
}

async function generateThumb(sourceAbs, targetAbs, thumbnailConfig) {
  await fs.mkdir(path.dirname(targetAbs), { recursive: true });

  let pipeline = sharp(sourceAbs).rotate().resize({
    width: thumbnailConfig.width,
    fit: thumbnailConfig.fit,
    withoutEnlargement: thumbnailConfig.withoutEnlargement,
  });

  const format = thumbnailConfig.format.toLowerCase();
  if (format === "webp") {
    pipeline = pipeline.webp({ quality: thumbnailConfig.quality });
  } else if (format === "avif") {
    pipeline = pipeline.avif({ quality: thumbnailConfig.quality });
  } else if (format === "jpeg" || format === "jpg") {
    pipeline = pipeline.jpeg({ quality: thumbnailConfig.quality, mozjpeg: true });
  } else if (format === "png") {
    pipeline = pipeline.png({ quality: thumbnailConfig.quality });
  } else {
    throw new Error(`Unsupported thumbnail format: ${thumbnailConfig.format}`);
  }

  await pipeline.toFile(targetAbs);
}

function getThumbTargetPath(sourceAbs, thumbDirName, thumbFormat) {
  const baseName = path.parse(sourceAbs).name;
  return path.join(path.dirname(sourceAbs), thumbDirName, `${baseName}.${thumbFormat}`);
}

async function processManifest(manifestPath, config) {
  const raw = await fs.readFile(manifestPath, "utf8");
  const items = JSON.parse(raw);

  if (!Array.isArray(items)) return { changed: false, generated: 0, skipped: 0 };

  let changed = false;
  let generated = 0;
  let skipped = 0;

  for (const item of items) {
    if (!shouldProcessItem(item)) {
      skipped += 1;
      continue;
    }

    const sourceRel = item.loc.replace(/^\//, "");
    const sourceAbs = path.join(rootDir, "public", sourceRel);

    try {
      await fs.access(sourceAbs);
    } catch {
      skipped += 1;
      continue;
    }

    const targetAbs = getThumbTargetPath(
      sourceAbs,
      config.projects.thumbDirName,
      config.thumbnail.format,
    );
    const targetPublic = toPublicPath(targetAbs);

    const hasCustomThumb =
      typeof item.thumb === "string" &&
      item.thumb.length > 0 &&
      item.thumb !== item.loc &&
      !item.thumb.startsWith(`/${sourceRel.split("/").slice(0, -1).join("/")}/${config.projects.thumbDirName}/`);

    if (hasCustomThumb && !config.projects.forceRegenerate) {
      skipped += 1;
      continue;
    }

    const shouldRewriteThumb =
      config.projects.forceRegenerate ||
      !item.thumb ||
      item.thumb === item.loc ||
      item.thumb !== targetPublic ||
      config.projects.rewriteThumbWhenSameAsLoc;

    const needsGeneration = config.projects.forceRegenerate
      ? true
      : await fs
          .access(targetAbs)
          .then(() => false)
          .catch(() => true);

    if (needsGeneration) {
      await generateThumb(sourceAbs, targetAbs, config.thumbnail);
      generated += 1;
    }

    if (shouldRewriteThumb && item.thumb !== targetPublic) {
      item.thumb = targetPublic;
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(manifestPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  }

  return { changed, generated, skipped };
}

async function processBlogImages(config) {
  const blogDir = path.join(rootDir, config.blog.sourceDir);

  let entries = [];
  try {
    entries = await fs.readdir(blogDir, { withFileTypes: true });
  } catch {
    return { processed: 0, generated: 0, skipped: 0 };
  }

  let processed = 0;
  let generated = 0;
  let skipped = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const postDir = path.join(blogDir, entry.name);
    const files = await fs.readdir(postDir, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile()) continue;
      if (!isImagePath(file.name)) continue;

      const sourceAbs = path.join(postDir, file.name);
      const targetAbs = getThumbTargetPath(
        sourceAbs,
        config.blog.thumbDirName,
        config.thumbnail.format,
      );

      const needsGeneration = config.blog.forceRegenerate
        ? true
        : await fs
            .access(targetAbs)
            .then(() => false)
            .catch(() => true);

      processed += 1;

      if (!needsGeneration) {
        skipped += 1;
        continue;
      }

      await generateThumb(sourceAbs, targetAbs, config.thumbnail);
      generated += 1;
    }
  }

  return { processed, generated, skipped };
}

async function main() {
  const config = await loadConfig();
  const projectsDir = path.join(rootDir, config.projects.sourceDir);

  const manifestFiles = await findManifestFiles(
    projectsDir,
    config.projects.manifestFiles,
  );

  let changedFiles = 0;
  let generatedThumbs = 0;
  let skippedItems = 0;

  for (const manifestPath of manifestFiles) {
    const result = await processManifest(manifestPath, config);
    if (result.changed) changedFiles += 1;
    generatedThumbs += result.generated;
    skippedItems += result.skipped;
  }

  const blogResult = await processBlogImages(config);

  console.log(
    `[thumbs] projects manifests=${manifestFiles.length} changed=${changedFiles} generated=${generatedThumbs} skipped=${skippedItems}`,
  );
  console.log(
    `[thumbs] blog images processed=${blogResult.processed} generated=${blogResult.generated} skipped=${blogResult.skipped}`,
  );
}

main().catch((error) => {
  console.error("[thumbs] failed:", error);
  process.exit(1);
});
