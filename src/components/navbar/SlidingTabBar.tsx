"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

  useEffect(() => {
    const currentTab = tabsRef.current[activeTabIndex];
    setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
    setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
  }, [activeTabIndex]);

  return (
    <div className="flex-row relative mx-auto flex h-7 sm:h-9 md:h-11 rounded-3xl border border-slate-700/40 bg-gray-600 dark:border-white/40 dark:bg-slate-200 px-0.5 sm:px-1 md:px-1.5 backdrop-blur-md">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-0.5 sm:py-1 md:py-1.5 transition-all duration-300"
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
            className={`${isActive ? "" : "hover:text-blue-400 dark:hover:text-blue-800"} my-auto cursor-pointer select-none rounded-full px-1.5 sm:px-2 md:px-3 text-center font-bold text-black dark:text-blue-500 text-[10px] sm:text-xs md:text-sm`}
            onClick={() => setActiveTabIndex(index)}
            aria-selected={isActive}
            role="tab"
          >
            {tab.name}
          </button>
        );
      })}

      {/* Blog Link - separate page */}
      <Link
        href="/blog"
        className="my-auto cursor-pointer select-none rounded-full px-1.5 sm:px-2 md:px-3 text-center font-bold text-black dark:text-blue-500 hover:text-blue-400 dark:hover:text-blue-800 transition-colors text-[10px] sm:text-xs md:text-sm"
      >
        Blog
      </Link>
    </div>
  );
};

export default SlidingTabBar;
