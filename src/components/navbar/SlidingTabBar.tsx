"use client";

import React from "react";
import Link from "next/link";

interface TabItem {
  id: string;
  name: string;
}

const allTabs: TabItem[] = [
  { id: "home", name: "Home" },
  { id: "projects", name: "Projects" },
];

interface SlidingTabBarProps {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}

export const SlidingTabBar: React.FC<SlidingTabBarProps> = ({
  activeTabIndex,
  setActiveTabIndex,
}) => {
  return (
    <div className="inline-flex gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700 dark:border-slate-600 shadow-lg">
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTabIndex(index)}
            aria-selected={isActive}
            role="tab"
            className={`
              px-2 sm:px-3 md:px-4 
              py-1 sm:py-1.5 
              text-[10px] sm:text-xs md:text-sm 
              font-medium 
              rounded 
              transition-all duration-200
              ${
                isActive
                  ? "bg-slate-700 dark:bg-slate-800 text-white shadow-md border border-slate-600 dark:border-slate-500"
                  : "text-slate-300 dark:text-slate-400 hover:text-white hover:bg-slate-700/50 dark:hover:bg-slate-800/50"
              }
            `}
          >
            {tab.name}
          </button>
        );
      })}

      {/* Blog Link - separate page */}
      <Link
        href="/blog"
        className="
          px-2 sm:px-3 md:px-4 
          py-1 sm:py-1.5 
          text-[10px] sm:text-xs md:text-sm 
          font-medium 
          rounded 
          transition-all duration-200
          text-slate-300 dark:text-slate-400 
          hover:text-white 
          hover:bg-slate-700/50 dark:hover:bg-slate-800/50
        "
      >
        Blog
      </Link>
    </div>
  );
};

export default SlidingTabBar;
