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
    <div className="inline-flex gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm rounded border border-slate-700 dark:border-slate-600 shadow-md">
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTabIndex(index)}
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

      {/* Blog Link - separate page */}
      <Link
        href="/blog"
        className="
          px-2 sm:px-2.5 md:px-3
          py-0.5 sm:py-1
          text-[9px] sm:text-[10px] md:text-xs
          font-medium
          rounded-sm
          transition-all duration-200
          whitespace-nowrap
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
