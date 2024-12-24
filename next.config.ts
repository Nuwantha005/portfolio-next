import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   // filepath: /d:/Documents/Web Development/React Projects/portfolio-next/next.config.js
//   output: "export",
// };

module.exports = {
  //output: "export",
  images: {
    unoptimized: true,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;


export default nextConfig;
