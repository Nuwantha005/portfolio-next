"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useViewTransition, getPageIndex } from "@/lib/use-view-transition";

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
  const pathname = usePathname();
  const { navigateWithTransition } = useViewTransition();
  const tabsRef = useRef<HTMLButtonElement[] | null[]>([]);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

  // Get current active tab index based on path
  const activeTabIndex = allTabs.findIndex((tab) => {
    if (tab.path === "/") return currentPath === "/";
    return currentPath.startsWith(tab.path);
  });

  useEffect(() => {
    const currentTab = tabsRef.current[activeTabIndex];
    if (currentTab) {
      setTabUnderlineLeft(currentTab.offsetLeft);
      setTabUnderlineWidth(currentTab.clientWidth);
    }
  }, [activeTabIndex]);

  const handleNavigation = (path: string) => {
    if (path !== currentPath) {
      navigateWithTransition(path, currentPath);
    }
  };

  return (
    <div className="flew-row relative mx-auto flex h-12 rounded-3xl border border-slate-700/40 bg-gray-600 dark:border-white/40 dark:bg-slate-200 px-2 backdrop-blur-md">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-3xl bg-gray-300 dark:bg-gray-900" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            className={`${
              isActive ? `` : `hover:text-blue-400 dark:hover:text-blue-800`
            } my-auto cursor-pointer select-none rounded-full px-4 text-center font-bold text-black dark:text-blue-500`}
            onClick={() => handleNavigation(tab.path)}
            aria-selected={isActive}
            role="tab"
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
