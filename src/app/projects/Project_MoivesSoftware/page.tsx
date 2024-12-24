"use client";

import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import FloatingSection from "@/components/ui/FloatingSection";
import "@/app/projects/galleryStyle.css";

function Project_MoviesSoftware() {
  
  return (
    <div>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center">
          <div className="flex flex-row gap-4 items-center justify-between ml-2 w-full">
            <button
              onClick={() => {
                window.history.back();
              }}
              className="text-lg"
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
            </button>
            <motion.p
              layoutId="Communication Software_title"
              className="text-4xl"
            >
              Movies and Series Management Software
            </motion.p>
            <ThemeToggle />
          </div>
        </header>
        {/* Floating Tiles Content */}
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="basis-3/4">
                <FloatingSection>
                  <div className="App">
                    
                  </div>
                </FloatingSection>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Project_MoviesSoftware;
