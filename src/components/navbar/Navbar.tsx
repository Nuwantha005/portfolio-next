import React, { useState, useEffect } from "react";
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
    <div className="grid grid-cols-3 gap-4 items-center justify-items-start w-full">
      <h1 className="font-display text-left text-lg md:text-2xl font-bold ml-4 tracking-[-0.1em] text-black dark:text-white">
        {labelName[Number(activeTabIndex)]}
      </h1>
      <div className="justify-self-center">
        <SlidingTabBar setActiveTabIndex_={setActiveTabIndex} />
      </div>
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
