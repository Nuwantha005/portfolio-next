"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Footer from "@/components/footer/Footer";
import ProjectTOC from "@/components/projects/ProjectTOC";
import ProjectSideGallery from "@/components/projects/ProjectSideGallery";
import RelatedProjects from "@/components/projects/RelatedProjects";
import "@/app/projects/galleryStyle.css";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

export interface GalleryItem {
  id: number;
  loc: string;
  name: string;
  thumb: string;
  type: "image" | "video";
  poster?: string;
}

export interface LGRef {
  openGallery: (index: number) => void;
}

interface ProjectPageLayoutProps {
  /** Project title shown in the title bar */
  title: string;
  /** URL to fetch gallery items JSON */
  fetchUrl: string;
  /** The `link` field from projects-data.ts, e.g. "projects/project_volute_fillet" */
  projectSlug: string;
  /** Render prop: receives (items, getItem, handleOpen) */
  children: (
    items: GalleryItem[],
    getItem: (id: number) => GalleryItem | undefined,
    handleOpen: (id: number) => void,
  ) => React.ReactNode;
}

/**
 * Shared layout wrapper for project pages.
 *
 * Provides:
 * - Title bar with scroll progress fill
 * - Left sticky TOC sidebar (xl+)
 * - Right sidebar with gallery thumbnails + related projects (2xl+)
 * - LightGallery instance for fullscreen viewing
 * - Gallery data fetching + state management
 * - Footer
 *
 * On smaller screens, everything collapses to single-column with
 * a collapsible TOC at the top and gallery at the bottom.
 */
export default function ProjectPageLayout({
  title,
  fetchUrl,
  projectSlug,
  children,
}: ProjectPageLayoutProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMobileTOC, setShowMobileTOC] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const rightSidebarRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<{ openGallery: (index: number) => void } | null>(
    null,
  );

  // Fetch gallery items
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data: GalleryItem[]) => setItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, [fetchUrl]);

  // Track scroll progress + sync right sidebar scroll
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? scrollTop / max : 0;
      setScrollProgress(progress);

      // Proportionally scroll the right sidebar
      const sidebar = rightSidebarRef.current;
      if (sidebar) {
        const sidebarMax = sidebar.scrollHeight - sidebar.clientHeight;
        if (sidebarMax > 0) {
          sidebar.scrollTop = progress * sidebarMax;
        }
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const getItem = useCallback(
    (id: number) => items.find((i) => i.id === id),
    [items],
  );

  // ID → gallery index mapping
  const idToIndex = useCallback(
    (id: number) => items.findIndex((i) => i.id === id),
    [items],
  );

  const handleOpen = useCallback(
    (id: number) => {
      const index = idToIndex(id);
      if (index !== -1) {
        galleryRef.current?.openGallery(index);
      }
    },
    [idToIndex],
  );

  // LightGallery init
  const onInit = useCallback(
    (detail: { instance: { openGallery: (index: number) => void } }) => {
      if (detail) galleryRef.current = detail.instance;
    },
    [],
  );

  // Build LG dynamic elements
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dynamicEl: any[] = items.map((item) => {
    if (item.type === "video") {
      const ext = item.loc.split(".").pop()?.toLowerCase();
      let videoType = "video/mp4";
      if (ext === "mkv") videoType = "video/x-matroska";
      else if (ext === "webm") videoType = "video/webm";
      else if (ext === "ogg" || ext === "ogv") videoType = "video/ogg";

      return {
        alt: item.name,
        thumb: item.thumb,
        subHtml: `<h4>${item.name}</h4>`,
        poster: item.poster || item.thumb,
        video: {
          source: [{ src: item.loc, type: videoType }],
          attributes: { preload: "auto", controls: true },
        },
        disableZoom: true,
      };
    }
    return {
      alt: item.name,
      src: item.loc,
      thumb: item.thumb,
      subHtml: `<h4>${item.name}</h4>`,
    };
  });

  return (
    <div>
      {/* Hidden LightGallery instance */}
      <LightGallery
        onInit={onInit}
        plugins={[lgThumbnail, lgVideo]}
        dynamic={true}
        closable={true}
        thumbWidth={130}
        thumbHeight={"100px"}
        thumbMargin={6}
        rotate={true}
        appendSubHtmlTo={".lg-item"}
        dynamicEl={dynamicEl}
        animateThumb={true}
        elementClassNames="inline-gallery-container"
      />

      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <ProjectTitleBar title={title} scrollProgress={scrollProgress} />

        {/* Scrollable area containing 3-column layout + full-width footer */}
        <main
          ref={mainRef}
          className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="w-full max-w-[1920px] mx-auto flex gap-3">
            {/* ── Left: TOC sidebar (xl+ only) ── */}
            <aside className="hidden xl:block w-56 flex-shrink-0 pl-3 pt-3">
              <ProjectTOC scrollContainerRef={mainRef} />
            </aside>

            {/* ── Center: Main content ── */}
            <div className="relative flex-1 min-w-0">
              <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
                {/* Mobile TOC toggle (< xl) */}
                <div className="xl:hidden">
                  <button
                    onClick={() => setShowMobileTOC((v) => !v)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md bg-slate-400/30 dark:bg-slate-700/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    Table of Contents
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${showMobileTOC ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {showMobileTOC && (
                    <div className="mt-2">
                      <ProjectTOC scrollContainerRef={mainRef} />
                    </div>
                  )}
                </div>

                {/* Page content (render prop) */}
                {children(items, getItem, handleOpen)}
              </div>
            </div>

            {/* ── Right: Gallery + Related Projects (2xl+ only) ── */}
            {/* Sticky column; inner container synced scroll via scrollProgress */}
            <aside className="hidden 2xl:block w-64 flex-shrink-0 pr-3 pt-3 pb-3">
              <div
                ref={rightSidebarRef}
                className="sticky top-3 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-none"
              >
                <div className="space-y-3">
                  <ProjectSideGallery items={items} onOpen={handleOpen} />
                  <RelatedProjects currentProjectLink={projectSlug} />
                </div>
              </div>
            </aside>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
