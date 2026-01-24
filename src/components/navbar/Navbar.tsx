"use client";

import React from "react";
import { SlidingTabBar } from "./SlidingTabBar";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  activeTabIndex,
  setActiveTabIndex,
}: {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}) {
  const labelName = ["Home", "Projects"];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 items-center justify-items-start w-full">
      <h1 className="font-display text-left text-base sm:text-lg md:text-2xl font-bold ml-2 sm:ml-3 md:ml-4 tracking-[-0.1em] text-black dark:text-white">
        {labelName[Number(activeTabIndex)]}
      </h1>
      <div className="justify-self-center">
        <SlidingTabBar
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
      </div>
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
