"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import FloatingSection from "@/components/ui/FloatingSection";
import Footer from "@/components/footer/Footer";
import type { BlogPostWithContent } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import MDXComponents from "@/components/blog/MDXComponents";
import { BlogGalleryProvider } from "@/components/blog/BlogGalleryProvider";
import "katex/dist/katex.min.css";

interface BlogPostClientProps {
  post: BlogPostWithContent;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
  level: number;
}

// Extract TOC items from markdown content
function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create slug from heading text
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^[\d.]+\s*/, ""); // Remove leading numbers like "1. "

    toc.push({ id, text, level });
  }

  return toc;
}

// Split content into sections by h1 headings
function splitContentBySections(content: string): ContentSection[] {
  const sections: ContentSection[] = [];
  
  // Split by h1 headings (# )
  const h1Regex = /^#\s+(.+)$/gm;
  const parts = content.split(h1Regex);
  
  // First part is intro (before first h1)
  if (parts[0].trim()) {
    sections.push({
      id: "intro",
      title: "",
      content: parts[0].trim(),
      level: 0,
    });
  }

  // Process remaining parts (title, content pairs)
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i]?.trim() || "";
    const content = parts[i + 1]?.trim() || "";
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^[\d.]+\s*/, "");

    sections.push({
      id,
      title,
      content: `# ${title}\n\n${content}`,
      level: 1,
    });
  }

  return sections;
}

// TOC Component
function TableOfContents({ 
  items, 
  activeId 
}: { 
  items: TOCItem[]; 
  activeId: string;
}) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="space-y-1">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm uppercase tracking-wide">
        Contents
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
          >
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-left w-full text-sm py-1 px-2 rounded transition-colors ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Section renderer component
function ContentSectionRenderer({
  section,
  mdxOptions,
  index,
}: {
  section: ContentSection;
  mdxOptions: any;
  index: number;
}) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const loadMDX = async () => {
      const source = await serialize(section.content, { mdxOptions });
      setMdxSource(source);
    };
    loadMDX();
  }, [section.content, mdxOptions]);

  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="scroll-mt-4"
    >
      <FloatingSection>
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          {mdxSource ? (
            <MDXRemote {...mdxSource} components={MDXComponents} />
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          )}
        </div>
      </FloatingSection>
    </motion.div>
  );
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [activeId, setActiveId] = useState<string>("");

  const mdxOptions = useMemo(
    () => ({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeSlug],
    }),
    []
  );

  // Extract TOC and sections
  const tocItems = useMemo(() => extractTOC(post.content), [post.content]);
  const sections = useMemo(() => splitContentBySections(post.content), [post.content]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <BlogGalleryProvider>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        {/* Header */}
        <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center">
          <div className="flex flex-row gap-2 sm:gap-4 items-center justify-between ml-2 w-full px-2 sm:px-4">
            <Link
              href="/blog"
              className="text-base sm:text-lg hover:text-blue-500 transition-colors flex items-center gap-1 sm:gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">Back to Blog</span>
            </Link>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center flex-1 font-semibold truncate px-2">
              {post.title}
            </p>
            <ThemeToggle />
          </div>
        </header>

      {/* Main Content with TOC Sidebar */}
      <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
          <div className="flex gap-4 lg:gap-8">
            {/* TOC Sidebar - Hidden on mobile */}
            {tocItems.length > 0 && (
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <div className="sticky top-8">
                  <FloatingSection>
                    <TableOfContents items={tocItems} activeId={activeId} />
                  </FloatingSection>
                </div>
              </aside>
            )}

            {/* Article Content */}
            <article className="flex-1 max-w-4xl space-y-2 sm:space-y-3">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FloatingSection>
                  {/* Cover Image */}
                  {post.image && (
                    <motion.div 
                      layoutId={`blog-image-${post.slug}`}
                      className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6 -mt-2 -mx-2"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Title - Hidden since it's in navbar */}
                  <motion.h1 
                    layoutId={`blog-title-${post.slug}`}
                    className="hidden"
                  >
                    {post.title}
                  </motion.h1>

                  {/* Meta Info */}
                  <motion.div 
                    layoutId={`blog-meta-${post.slug}`}
                    className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4"
                  >
                    <time dateTime={post.date} className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formattedDate}
                    </time>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readingTime}
                    </span>
                  </motion.div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  {/* Description */}
                  {post.description && (
                    <motion.p 
                      layoutId={`blog-description-${post.slug}`}
                      className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-3 sm:pl-4 italic"
                    >
                      {post.description}
                    </motion.p>
                  )}

                  {/* Mobile TOC */}
                  {tocItems.length > 0 && (
                    <div className="xl:hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <TableOfContents items={tocItems} activeId={activeId} />
                    </div>
                  )}
                </FloatingSection>
              </motion.div>

              {/* Content Sections */}
              {sections.map((section, index) => (
                <ContentSectionRenderer
                  key={section.id}
                  section={section}
                  mdxOptions={mdxOptions}
                  index={index + 1}
                />
              ))}

              {/* Back to Blog Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-4 text-center"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to all articles
                </Link>
              </motion.div>
            </article>
          </div>
        </div>
        <Footer />
      </main>
    </div>
    </BlogGalleryProvider>
  );
}
