"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FloatingSection from "../ui/FloatingSection";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
          <FloatingSection>
            <div className="flex flex-col gap-4">
              {/* Cover Image */}
              {post.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="space-y-3">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 4 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      +{post.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FloatingSection>
        </div>
      </Link>
    </motion.div>
  );
}
