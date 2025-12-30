"use client";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    let savedTheme: string | null = "dark";
    if (typeof window !== "undefined") {
      savedTheme = localStorage.getItem("theme");
    }
    return savedTheme ? savedTheme === "dark" : false;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 mr-4 rounded-full border-2 text-gray-800 hover:bg-gray-200 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      {isDarkMode ? (
        <span className="group inline-flex justify-center items-center size-9">
          <svg
            className="shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
          </svg>
        </span>
      ) : (
        <span className="group inline-flex justify-center items-center size-9">
          <svg
            className="shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
