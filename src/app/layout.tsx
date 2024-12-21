"use client";

import "./globals.css";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { useEffect, useState } from "react";

function Background({ children }: { children: React.ReactNode }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateWidthHeight = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      console.log(window.innerWidth);
    };

    updateWidthHeight(); // Initial update
    window.addEventListener("resize", updateWidthHeight);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", updateWidthHeight);
    };
  }, []);

  return (
    <div className="h-full">
      {children}
      <FlickeringGrid
        className="flex z-0 absolute inset-0 size-full overflow-hidden pointer-events-none"
        squareSize={50}
        gridGap={5}
        color="#6B72ff"
        maxOpacity={0.2}
        flickerChance={0.5}
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
    <html lang="en" className="h-full">
      <body className="h-full">
        <Background>{children}</Background>
      </body>
    </html>
  );
}
