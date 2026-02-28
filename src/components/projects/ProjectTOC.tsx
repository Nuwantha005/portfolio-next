"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import FloatingSection from "@/components/ui/FloatingSection";

interface TOCSubItem {
  id: string;
  text: string;
}

interface TOCItem {
  id: string;
  text: string;
  children: TOCSubItem[];
}

interface ProjectTOCProps {
  /** The scrollable container to observe (main element) */
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}

/** Create a slug id from text */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Check if an element is inside a hidden container (e.g. 2xl:hidden) */
function isInsideHiddenContainer(el: Element): boolean {
  let parent = el.parentElement;
  while (parent) {
    const cl = parent.className || "";
    // Skip elements hidden at 2xl or with display:none
    if (
      cl.includes("2xl:hidden") ||
      (cl.includes("hidden") &&
        !cl.includes("2xl:block") &&
        !cl.includes("xl:block"))
    ) {
      // "hidden" alone means display:none at all sizes
      // but "hidden 2xl:block" means visible at 2xl — that's fine
      // We want to exclude "2xl:hidden" (hidden at 2xl, which is when sidebar shows)
      if (cl.includes("2xl:hidden")) return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

/**
 * Sticky table-of-contents sidebar for project pages.
 * Auto-reads Topic elements via `[data-topic]` attribute and
 * discovers h1/h2 headings inside FloatingSections as subtopics.
 * Supports expand/collapse per topic and expand-all/collapse-all controls.
 * Auto-scrolls the TOC nav to keep the active item visible.
 */
export default function ProjectTOC({ scrollContainerRef }: ProjectTOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  // Track which topics are manually expanded. Key = topic id, value = expanded.
  // null = not manually toggled (use auto behavior).
  const [manualExpand, setManualExpand] = useState<
    Record<string, boolean | null>
  >({});
  const navRef = useRef<HTMLElement | null>(null);

  // Scan DOM for [data-topic] elements + their child headings
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const allTopics = Array.from(container.querySelectorAll("[data-topic]"));
      // Filter out topics inside hidden containers (e.g. gallery in 2xl:hidden)
      const topics = allTopics.filter((el) => !isInsideHiddenContainer(el));
      const items: TOCItem[] = [];

      // Helper: collect h1/h2 headings from a sibling range (exclusive of boundary elements)
      const collectHeadings = (
        parent: Element,
        startAfter: Element | null,
        stopBefore: Element | null,
        excludeText?: string,
      ): TOCSubItem[] => {
        const subItems: TOCSubItem[] = [];
        const children = Array.from(parent.children);
        const startIdx = startAfter ? children.indexOf(startAfter) + 1 : 0;

        for (let i = startIdx; i < children.length; i++) {
          const sibling = children[i];
          if (stopBefore && sibling === stopBefore) break;
          // Also stop if sibling contains the stopBefore element
          if (stopBefore && sibling.contains(stopBefore)) break;

          if (
            isInsideHiddenContainer(sibling) ||
            (sibling.className || "").includes("2xl:hidden")
          )
            continue;

          const headings = sibling.querySelectorAll("h1, h2");
          headings.forEach((h) => {
            if (isInsideHiddenContainer(h)) return;
            const text = (h as HTMLElement).innerText.trim();
            if (!text) return;
            if (!h.id) h.id = `sub-${slugify(text)}`;
            if (text !== excludeText) {
              subItems.push({ id: h.id, text });
            }
          });

          if (sibling.matches("h1, h2") && !sibling.matches("[data-topic]")) {
            const text = (sibling as HTMLElement).innerText.trim();
            if (text && text !== excludeText) {
              if (!sibling.id) sibling.id = `sub-${slugify(text)}`;
              subItems.push({ id: sibling.id, text });
            }
          }
        }
        return subItems;
      };

      // Collect headings BEFORE the first topic as standalone top-level items
      if (topics.length > 0) {
        const firstTopic = topics[0];
        // Find the common parent that holds both the pre-topic content and the topics
        const contentParent = firstTopic.parentElement;
        if (contentParent) {
          const preTopicHeadings = collectHeadings(
            contentParent,
            null,
            firstTopic,
          );
          preTopicHeadings.forEach((h) => {
            items.push({ id: h.id, text: h.text, children: [] });
          });
        }
      }

      topics.forEach((topicEl, idx) => {
        const topicId = topicEl.id;
        const topicText = (topicEl as HTMLElement).dataset.topic || "";
        const nextTopic = topics[idx + 1] as HTMLElement | undefined;
        const subItems: TOCSubItem[] = [];

        // Walk siblings after the topic element to find FloatingSections containing h1/h2
        let sibling = topicEl.nextElementSibling;
        while (sibling && sibling !== nextTopic) {
          // Skip hidden containers
          if (
            !isInsideHiddenContainer(sibling) &&
            !(sibling.className || "").includes("2xl:hidden")
          ) {
            const headings = sibling.querySelectorAll("h1, h2");
            headings.forEach((h) => {
              if (isInsideHiddenContainer(h)) return;
              const text = (h as HTMLElement).innerText.trim();
              if (!text) return;
              if (!h.id) h.id = `sub-${slugify(text)}`;
              if (text !== topicText) {
                subItems.push({ id: h.id, text });
              }
            });

            if (sibling.matches("h1, h2") && !sibling.matches("[data-topic]")) {
              const text = (sibling as HTMLElement).innerText.trim();
              if (text && text !== topicText) {
                if (!sibling.id) sibling.id = `sub-${slugify(text)}`;
                subItems.push({ id: sibling.id, text });
              }
            }
          }

          sibling = sibling.nextElementSibling;
        }

        items.push({ id: topicId, text: topicText, children: subItems });
      });

      setTocItems(items);
      // Initialize: all topics expanded
      const initial: Record<string, boolean | null> = {};
      items.forEach((item) => {
        initial[item.id] = true; // expanded on load
      });
      setManualExpand(initial);
    }, 200);

    return () => clearTimeout(timer);
  }, [scrollContainerRef]);

  // Flatten all ids for observer
  const allIds = tocItems.flatMap((item) => [
    item.id,
    ...item.children.map((c) => c.id),
  ]);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || allIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: container,
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      },
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocItems, scrollContainerRef]);

  // Auto-expand the active topic's section when scrolling into it
  useEffect(() => {
    if (!activeId) return;
    // Find which topic owns this activeId
    const ownerTopic = tocItems.find(
      (item) =>
        item.id === activeId || item.children.some((c) => c.id === activeId),
    );
    if (ownerTopic) {
      setManualExpand((prev) => ({
        ...prev,
        [ownerTopic.id]: true,
      }));
    }
  }, [activeId, tocItems]);

  // Auto-scroll the TOC nav so active item stays visible
  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const activeBtn = navRef.current.querySelector(
      `[data-toc-id="${activeId}"]`,
    ) as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setManualExpand((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  }, []);

  const expandAll = useCallback(() => {
    setManualExpand((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => (next[k] = true));
      return next;
    });
  }, []);

  const collapseAll = useCallback(() => {
    setManualExpand((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => (next[k] = false));
      return next;
    });
  }, []);

  if (tocItems.length === 0) return null;

  /** Is a topic expanded? */
  const isExpanded = (item: TOCItem) => !!manualExpand[item.id];

  /** Are all expandable topics currently expanded? */
  const allExpanded = tocItems
    .filter((item) => item.children.length > 0)
    .every((item) => !!manualExpand[item.id]);

  const toggleAll = allExpanded ? collapseAll : expandAll;

  /** Is a given id active, or is one of its children active? */
  const isTopicActive = (item: TOCItem) =>
    activeId === item.id || item.children.some((c) => c.id === activeId);

  return (
    <div className="sticky top-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
      <FloatingSection className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
            Contents
          </h3>
          {/* Toggle expand / collapse all */}
          <button
            onClick={toggleAll}
            title={allExpanded ? "Collapse all" : "Expand all"}
            className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-slate-400/30 dark:hover:bg-slate-700/30 transition-colors"
          >
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
              className="transition-transform duration-200"
            >
              {allExpanded ? (
                <>
                  <polyline points="17 11 12 6 7 11" />
                  <polyline points="17 18 12 13 7 18" />
                </>
              ) : (
                <>
                  <polyline points="7 13 12 18 17 13" />
                  <polyline points="7 6 12 11 17 6" />
                </>
              )}
            </svg>
          </button>
        </div>
        <nav ref={navRef}>
          <ul className="space-y-0.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                {/* Topic heading row with expand toggle */}
                <div className="flex items-center gap-0.5">
                  {item.children.length > 0 && (
                    <button
                      onClick={() => toggleTopic(item.id)}
                      className="flex-shrink-0 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={isExpanded(item) ? "Collapse" : "Expand"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-200 ${isExpanded(item) ? "rotate-90" : ""}`}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  )}
                  <button
                    data-toc-id={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left flex-1 text-sm py-1.5 px-1.5 rounded transition-all duration-200 leading-tight ${
                      isTopicActive(item) && activeId === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 font-medium"
                        : isTopicActive(item)
                          ? "text-blue-600/80 dark:text-blue-400/80 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-slate-400/30 dark:hover:bg-slate-700/30"
                    }`}
                  >
                    {item.text}
                  </button>
                </div>

                {/* Subtopics — shown when expanded */}
                {item.children.length > 0 && isExpanded(item) && (
                  <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-slate-400/40 dark:border-slate-600/40 pl-2">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <button
                          data-toc-id={child.id}
                          onClick={() => scrollToSection(child.id)}
                          className={`text-left w-full text-xs py-1 px-1.5 rounded transition-all duration-200 leading-tight ${
                            activeId === child.id
                              ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-slate-400/30 dark:hover:bg-slate-700/30"
                          }`}
                        >
                          {child.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </FloatingSection>
    </div>
  );
}
