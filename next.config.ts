import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   // filepath: /d:/Documents/Web Development/React Projects/portfolio-next/next.config.js
//   output: "export",
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

export default nextConfig;
