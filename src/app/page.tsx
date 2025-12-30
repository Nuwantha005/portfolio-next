"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Home from "./Home";
import Projects from "./Projects";
import Footer from "@/components/footer/Footer";
import "./globals.css";

export default function Page() {
  // Initialize with default value to avoid hydration mismatch
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore from localStorage after hydration
  useEffect(() => {
    const savedTabIndex = localStorage.getItem("activeTabIndex");
    if (savedTabIndex) {
      const parsed = parseInt(savedTabIndex, 10);
      if (!isNaN(parsed) && parsed !== activeTabIndex) {
        setActiveTabIndex(parsed);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when tab changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("activeTabIndex", activeTabIndex.toString());
    }
  }, [activeTabIndex, isHydrated]);

  const handleTabChange = (index: number) => {
    if (index > activeTabIndex) {
      setAnimationClass("slide-out-left");
      setTimeout(() => {
        setActiveTabIndex(index);
        setAnimationClass("slide-in-right");
      }, 50);
    } else if (index < activeTabIndex) {
      setAnimationClass("slide-out-right");
      setTimeout(() => {
        setActiveTabIndex(index);
        setAnimationClass("slide-in-left");
      }, 50);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <header className="relative z-15 flex items-center top-0 m-2 w-screen justify-center">
        <Navbar
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={handleTabChange}
        />
      </header>
      <main className="relative z-10 p-1 w-full overflow-y-auto overflow-x-hidden h-full">
        <div className={`content ${animationClass}`}>
          {activeTabIndex === 0 && <Home />}
          {activeTabIndex === 1 && <Projects />}
        </div>
        <Footer />
      </main>
    </div>
  );
}
