"use client";

import "./globals.css";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function Background({ children }: { children: React.ReactNode }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateWidthHeight = () => {
      setWindowWidth(window.outerWidth);
      setWindowHeight(window.outerHeight);
    };

    updateWidthHeight(); // Initial update
    window.addEventListener("resize", updateWidthHeight);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", updateWidthHeight);
    };
  }, []);

  return (
    <div>
      {children}
      <FlickeringGrid
        className="flex z-0 absolute inset-0 size-full overflow-hidden pointer-events-none"
        squareSize={50}
        gridGap={5}
        color="#6B72ff"
        maxOpacity={0.2}
        flickerChance={0.1}
        width={windowWidth}
        height={windowHeight}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Nuwantha Kumara - Portfolio</title>
        <meta name="description" content="This is my portfolio website." />
      </head>
      <body>
        <AnimatePresence mode="wait">
          <Background>{children}</Background>
        </AnimatePresence>
      </body>
    </html>
  );
}
