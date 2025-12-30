"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

// Define page order for determining slide direction
const PAGE_ORDER = ["/", "/projects", "/blog"] as const;

function getPageIndex(path: string): number {
  // Handle nested routes
  if (path.startsWith("/blog")) return 2;
  if (path.startsWith("/projects")) return 1;
  return 0;
}

export function useViewTransition() {
  const router = useRouter();

  const navigateWithTransition = useCallback(
    async (href: string, currentPath: string) => {
      // Check if View Transitions API is supported
      if (!document.startViewTransition) {
        router.push(href);
        return;
      }

      const currentIndex = getPageIndex(currentPath);
      const targetIndex = getPageIndex(href);

      // Determine direction: going forward (right) or back (left)
      const isGoingBack = targetIndex < currentIndex;

      if (isGoingBack) {
        document.documentElement.classList.add("back-transition");
      } else {
        document.documentElement.classList.remove("back-transition");
      }

      const transition = document.startViewTransition(async () => {
        router.push(href);
        // Wait a bit for React to start updating the DOM
        await new Promise((resolve) => setTimeout(resolve, 50));
      });

      // Clean up class after transition finishes
      try {
        await transition.finished;
      } finally {
        document.documentElement.classList.remove("back-transition");
      }
    },
    [router]
  );

  return { navigateWithTransition };
}

export { PAGE_ORDER, getPageIndex };
