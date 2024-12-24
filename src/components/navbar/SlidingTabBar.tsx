"use client";

import React, { useEffect, useRef, useState } from "react";

interface TabItem {
  id: string;
  name: string;
}

const allTabs: TabItem[] = [
  { id: "home", name: "Home" },
  { id: "projects", name: "Projects" },
  // ...existing code...
];

interface SlidingTabBarProps {
  setActiveTabIndex_: (index: number) => void;
}

export const SlidingTabBar: React.FC<SlidingTabBarProps> = ({
  setActiveTabIndex_,
}) => {
  const tabsRef = useRef<HTMLButtonElement[] | null[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(() => {
    let savedTabIndex: string | null = null;
    if (typeof window !== "undefined") {
      savedTabIndex = localStorage.getItem("activeTabIndex");
    }
    return savedTabIndex ? parseInt(savedTabIndex, 10) : 0;
  });
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

  useEffect(() => {
    if (activeTabIndex === null) return;
    const currentTab = tabsRef.current[activeTabIndex];
    setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
    setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    setActiveTabIndex_(activeTabIndex);
  }, [activeTabIndex, setActiveTabIndex_]);

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
            key={index}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            className={`${
              isActive ? `` : `hover:text-blue-400 dark:hover:text-blue-800`
            } my-auto cursor-pointer select-none rounded-full px-4 text-center font-bold text-black dark:text-blue-500`}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
