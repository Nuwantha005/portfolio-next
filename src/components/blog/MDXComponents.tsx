import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogImage, BlogVideo } from "./BlogMediaComponents";

// Custom components for MDX
const MDXComponents = {
  // Headings
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-base sm:text-lg md:text-xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 sm:pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-sm sm:text-base md:text-lg font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2 text-gray-800 dark:text-gray-100"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-sm sm:text-base font-semibold mt-2 sm:mt-3 mb-1 sm:mb-2 text-gray-800 dark:text-gray-100"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-3 sm:my-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
      {...props}
    >
      {children}
    </p>
  ),

  // Links
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code blocks (inline)
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Check if it's an inline code (no className means inline)
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    // For code blocks, rehype-pretty-code handles styling
    return <code {...props}>{children}</code>;
  },

  // Pre (code block wrapper)
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm max-w-full"
      {...props}
    >
      {children}
    </pre>
  ),

  // Images - Use BlogImage for gallery support
  img: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <BlogImage
      src={typeof src === "string" ? src : ""}
      alt={alt || ""}
      caption={alt}
      width={props.width?.toString()}
      height={props.height?.toString()}
    />
  ),

  // Custom BlogImage and BlogVideo components for Obsidian syntax
  BlogImage,
  BlogVideo,

  // Tables
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto max-w-full">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800"
      {...props}
    >
      {children}
    </td>
  ),

  // Horizontal Rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-8 border-t border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),

  // Strong/Bold
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </strong>
  ),

  // Emphasis/Italic
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

export default MDXComponents;
