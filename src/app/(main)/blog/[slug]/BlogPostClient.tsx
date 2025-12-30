"use client";

import React from "react";
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
import MDXComponents from "@/components/blog/MDXComponents";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";

interface BlogPostClientProps {
  post: BlogPostWithContent;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const loadMDX = async () => {
      const source = await serialize(post.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      });
      setMdxSource(source);
    };
    loadMDX();
  }, [post.content]);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/* Header */}
      <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center">
        <div className="flex flex-row gap-4 items-center justify-between ml-2 w-full px-4">
          <Link
            href="/blog"
            className="text-lg hover:text-blue-500 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
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
          <div className="flex-1" />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingSection>
              {/* Cover Image */}
              {post.image && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6 -mt-2 -mx-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
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
              </div>

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
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4 italic">
                  {post.description}
                </p>
              )}
            </FloatingSection>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <FloatingSection>
              <div className="prose prose-lg dark:prose-invert max-w-none">
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

          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
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
        <Footer />
      </main>
    </div>
  );
}
