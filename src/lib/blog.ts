import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "public/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  readingTime: string;
  published: boolean;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

/**
 * Transform Obsidian-specific syntax to standard MDX
 */
function transformObsidianSyntax(content: string, slug: string): string {
  let transformed = content;

  // Transform Obsidian image embeds: ![[image.png|width]] or ![[image.png]]
  // Convert to standard markdown images with local path
  transformed = transformed.replace(
    /!\[\[([^\]|]+)(?:\|(\d+)(?:x(\d+))?)?\]\]/g,
    (match, filename, width, height) => {
      const imgPath = `/blog/${slug}/${filename}`;
      if (width && height) {
        return `<img src="${imgPath}" alt="${filename}" width="${width}" height="${height}" />`;
      } else if (width) {
        return `<img src="${imgPath}" alt="${filename}" width="${width}" />`;
      }
      return `![${filename}](${imgPath})`;
    }
  );

  // Transform Obsidian wiki links: [[Page Name]] to bold text
  // (since these are internal Obsidian links that don't exist in the blog)
  transformed = transformed.replace(
    /\[\[([^\]]+)\]\]/g,
    (match, linkText) => `**${linkText}**`
  );

  return transformed;
}

/**
 * Parse Obsidian-style frontmatter with fallbacks
 */
function parseFrontmatter(data: Record<string, any>, slug: string): {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string | null;
  published: boolean;
} {
  // Title: support "Article Title", "Title", or "title"
  const title = data["Article Title"] || data["Title"] || data.title || slug;

  // Description: support "Description" or "description"
  const description = data["Description"] || data.description || "";

  // Date: support "Publish Date", "date", or "Date"
  let date = data["Publish Date"] || data.date || data["Date"];
  if (date) {
    // Handle various date formats
    date = new Date(date).toISOString();
  } else {
    date = new Date().toISOString();
  }

  // Tags: filter out Obsidian-specific tags like "blog"
  let tags = data.tags || [];
  if (Array.isArray(tags)) {
    tags = tags.filter((tag: string) => 
      !["blog", "blog_article"].includes(tag.toLowerCase())
    );
  }

  // Image/Thumbnail: support "Thumbnail", "image", or "cover"
  let image = data["Thumbnail"] || data.image || data.cover || null;
  if (image) {
    // Handle Obsidian image reference: "[[image.png]]"
    const obsidianMatch = image.match(/\[\[([^\]]+)\]\]/);
    if (obsidianMatch) {
      image = `/blog/${slug}/${obsidianMatch[1]}`;
    } else if (!image.startsWith("/") && !image.startsWith("http")) {
      // Relative path - prepend blog folder path
      image = `/blog/${slug}/${image}`;
    }
  }

  // Published: support "Published" or "published"
  const published = data["Published"] !== false && data.published !== false;

  return { title, description, date, tags, image, published };
}

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const folders = fs.readdirSync(BLOG_DIR);

  const posts = folders
    .filter((folder) => {
      const folderPath = path.join(BLOG_DIR, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folder) => {
      const filePath = path.join(BLOG_DIR, folder, "index.mdx");
      
      // Check if index.mdx exists, if not try index.md
      const actualPath = fs.existsSync(filePath) 
        ? filePath 
        : path.join(BLOG_DIR, folder, "index.md");
      
      if (!fs.existsSync(actualPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(actualPath, "utf8");
      const { data, content } = matter(fileContents);
      const parsed = parseFrontmatter(data, folder);

      return {
        slug: folder,
        title: parsed.title,
        description: parsed.description,
        date: parsed.date,
        tags: parsed.tags,
        image: parsed.image ?? undefined,
        readingTime: readingTime(content).text,
        published: parsed.published,
      } as BlogPost;
    })
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const folderPath = path.join(BLOG_DIR, slug);
  
  if (!fs.existsSync(folderPath)) {
    return null;
  }

  // Try index.mdx first, then index.md
  let filePath = path.join(folderPath, "index.mdx");
  if (!fs.existsSync(filePath)) {
    filePath = path.join(folderPath, "index.md");
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const parsed = parseFrontmatter(data, slug);

  // Transform Obsidian syntax in content
  const transformedContent = transformObsidianSyntax(content, slug);

  return {
    slug,
    title: parsed.title,
    description: parsed.description,
    date: parsed.date,
    tags: parsed.tags,
    image: parsed.image ?? undefined,
    readingTime: readingTime(content).text,
    published: parsed.published,
    content: transformedContent,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
