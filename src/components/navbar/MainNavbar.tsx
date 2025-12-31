"use client";

import React from "react";
import { SlidingNavBar } from "./SlidingNavBar";
import ThemeToggle from "./ThemeToggle";

interface MainNavbarProps {
  currentPath: string;
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/projects": "Projects",
  "/blog": "Blog",
};

function getPageLabel(path: string): string {
  if (path.startsWith("/blog")) return "Blog";
  if (path.startsWith("/projects")) return "Projects";
  return "Home";
}

export default function MainNavbar({ currentPath }: MainNavbarProps) {
  const label = getPageLabel(currentPath);

  return (
    <div className="grid grid-cols-3 gap-4 items-center justify-items-start w-full">
      <h1 
        className="font-display text-left text-lg md:text-2xl font-bold ml-4 tracking-[-0.1em] text-black dark:text-white"
        style={{ viewTransitionName: "navbar-title" }}
      >
        {label}
      </h1>
      <div className="justify-self-center">
        <SlidingNavBar currentPath={currentPath} />
      </div>
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
