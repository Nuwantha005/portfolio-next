"use client";

import React from "react";
import { useViewTransition } from "@/lib/use-view-transition";

interface TabItem {
  id: string;
  name: string;
  path: string;
}

const allTabs: TabItem[] = [
  { id: "home", name: "Home", path: "/" },
  { id: "projects", name: "Projects", path: "/projects" },
  { id: "blog", name: "Blog", path: "/blog" },
];

interface SlidingNavBarProps {
  currentPath: string;
}

export const SlidingNavBar: React.FC<SlidingNavBarProps> = ({ currentPath }) => {
  const { navigateWithTransition } = useViewTransition();

  // Get current active tab index based on path
  const activeTabIndex = allTabs.findIndex((tab) => {
    if (tab.path === "/") return currentPath === "/";
    return currentPath.startsWith(tab.path);
  });

  const handleNavigation = (path: string) => {
    if (path !== currentPath) {
      navigateWithTransition(path, currentPath);
    }
  };

  return (
    <div className="inline-flex gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm rounded border border-slate-700 dark:border-slate-600 shadow-md">
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <button
            key={tab.id}
            onClick={() => handleNavigation(tab.path)}
            aria-selected={isActive}
            role="tab"
            className={`
              px-2 sm:px-2.5 md:px-3
              py-0.5 sm:py-1
              text-[9px] sm:text-[10px] md:text-xs
              font-medium
              rounded-sm
              transition-all duration-200
              whitespace-nowrap
              ${
                isActive
                  ? "bg-slate-700 dark:bg-slate-800 text-white shadow-sm border border-slate-600 dark:border-slate-500"
                  : "text-slate-300 dark:text-slate-400 hover:text-white hover:bg-slate-700/50 dark:hover:bg-slate-800/50"
              }
            `}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
