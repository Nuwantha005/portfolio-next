"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import TechCarousel from "./TechCarousel";
import FloatingSection from "../ui/FloatingSection";
import SkillsGraph, { CATEGORY_COLORS } from "./SkillsGraph";
import {
  skillsGraphStructure,
  buildSkillsGraphData,
  type SkillEntry,
} from "@/lib/skills-graph-data";
import { cn } from "@/lib/utils";

function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Detect theme for color selection
  React.useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(() => {
    const init: Record<string, boolean> = {};
    for (const cat of skillsGraphStructure.categories) init[cat.id] = true;
    if (skillsGraphStructure.special?.length) init["__special__"] = true;
    return init;
  });

  // Build adjacency once so we can highlight neighbours via the list too
  const adjacency = useMemo(() => {
    const { links } = buildSkillsGraphData();
    const adj = new Map<string, Set<string>>();
    for (const { source, target } of links) {
      const s = typeof source === "string" ? source : String(source);
      const t = typeof target === "string" ? target : String(target);
      if (!adj.has(s)) adj.set(s, new Set());
      if (!adj.has(t)) adj.set(t, new Set());
      adj.get(s)!.add(t);
      adj.get(t)!.add(s);
    }
    return adj;
  }, []);

  const isHighlighted = useCallback(
    (id: string) => {
      if (!hoveredSkill) return false;
      if (id === hoveredSkill) return true;
      return adjacency.get(hoveredSkill)?.has(id) ?? false;
    },
    [hoveredSkill, adjacency],
  );

  const toggleCategory = (id: string) =>
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));

  // ── Pill renderer ────────────────────────────────────────────────────
  const renderPill = (
    id: string,
    categoryColor:
      | {
          fill: string;
          stroke: string;
          fillLight?: string;
          strokeLight?: string;
        }
      | undefined,
    key: string,
  ) => {
    const highlighted = isHighlighted(id);
    const dimmed = hoveredSkill !== null && !highlighted;

    return (
      <span
        key={key}
        onMouseEnter={() => setHoveredSkill(id)}
        onMouseLeave={() => setHoveredSkill(null)}
        className={cn(
          "inline-block cursor-default rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200 border",
          dimmed && "opacity-30",
          highlighted &&
            "ring-1 ring-offset-1 ring-offset-transparent scale-105",
        )}
        style={{
          borderColor: isDark
            ? (categoryColor?.stroke ?? "#6366f1")
            : (categoryColor?.strokeLight ?? "#4f46e5"),
          backgroundColor: isDark
            ? (categoryColor?.fill ?? "#2d2d2d") + "40"
            : (categoryColor?.fillLight ?? "#e0e7ff") + "90",
          color: isDark
            ? (categoryColor?.stroke ?? "#a5b4fc")
            : (categoryColor?.strokeLight ?? "#4338ca"),
          ...(highlighted
            ? {
                boxShadow: `0 0 6px ${isDark ? (categoryColor?.stroke ?? "#6366f1") : (categoryColor?.strokeLight ?? "#4f46e5")}40`,
              }
            : {}),
        }}
      >
        {id}
      </span>
    );
  };

  // ── Recursive entry renderer (for nested skills like ANSYS > Mechanical) ─
  const renderEntry = (
    entry: SkillEntry,
    categoryColor:
      | {
          fill: string;
          stroke: string;
          fillLight?: string;
          strokeLight?: string;
        }
      | undefined,
    keyPrefix: string,
  ): React.ReactNode => {
    if (typeof entry === "string") {
      return renderPill(entry, categoryColor, keyPrefix);
    }

    // Node with potential children
    return (
      <React.Fragment key={keyPrefix}>
        {renderPill(entry.id, categoryColor, `${keyPrefix}-pill`)}
        {entry.children?.map((child, i) =>
          renderEntry(child, categoryColor, `${keyPrefix}-${i}`),
        )}
      </React.Fragment>
    );
  };

  // ── Category header component ────────────────────────────────────────
  const CategoryHeader = ({
    id,
    color,
    expanded,
    onToggle,
  }: {
    id: string;
    color:
      | {
          fill: string;
          stroke: string;
          fillLight?: string;
          strokeLight?: string;
        }
      | undefined;
    expanded: boolean;
    onToggle: () => void;
  }) => {
    const highlighted = isHighlighted(id);
    const dimmed = hoveredSkill !== null && !highlighted;

    return (
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setHoveredSkill(id)}
        onMouseLeave={() => setHoveredSkill(null)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm font-semibold transition-all duration-200",
          "hover:bg-slate-200/60 dark:hover:bg-slate-700/40",
          dimmed && "opacity-30",
        )}
        style={{
          color: isDark
            ? (color?.stroke ?? "#a5b4fc")
            : (color?.strokeLight ?? "#4338ca"),
        }}
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor: isDark
              ? (color?.stroke ?? "#6366f1")
              : (color?.strokeLight ?? "#4f46e5"),
          }}
        />
        <span className="flex-1">{id}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>
    );
  };

  return (
    <FloatingSection>
      <h1 id="skills" className="text-bold text-2xl sm:text-3xl">
        Skills
      </h1>
      <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Explore my technical skill set through an interactive force-directed
        graph. Hover to highlight related technologies, drag to rearrange, and
        scroll to zoom in or out.
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6 lg:h-[36rem] lg:flex-row lg:items-stretch">
        {/* ── Skill hierarchy list ─────────────────────────────────── */}
        <div className="hidden lg:flex lg:flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 p-4 text-sm lg:w-1/4 lg:max-w-none lg:overflow-y-auto">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-300 px-1">
            Skill Hierarchy
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 px-1 mb-1">
            Click categories to expand/collapse. Hover items to highlight
            connections in the graph.
          </p>

          <div className="space-y-1">
            {skillsGraphStructure.categories.map((category) => {
              const color = CATEGORY_COLORS[category.id];
              const expanded = expandedCategories[category.id] ?? false;

              return (
                <div key={category.id}>
                  <CategoryHeader
                    id={category.id}
                    color={color}
                    expanded={expanded}
                    onToggle={() => toggleCategory(category.id)}
                  />
                  {expanded && (
                    <div className="flex flex-wrap gap-1.5 px-3 py-1.5">
                      {category.skills.map((skill, i) =>
                        renderEntry(skill, color, `${category.id}-${i}`),
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Special / multi-domain */}
            {skillsGraphStructure.special &&
              skillsGraphStructure.special.length > 0 && (
                <div>
                  <CategoryHeader
                    id="Multi-domain"
                    color={{
                      fill: "#7c2d12",
                      stroke: "#fb923c",
                      fillLight: "#ffedd5",
                      strokeLight: "#c2410c",
                    }}
                    expanded={expandedCategories["__special__"] ?? false}
                    onToggle={() => toggleCategory("__special__")}
                  />
                  {(expandedCategories["__special__"] ?? false) && (
                    <div className="flex flex-wrap gap-1.5 px-3 py-1.5">
                      {skillsGraphStructure.special.map((node, i) => (
                        <React.Fragment key={node.id}>
                          {renderPill(
                            node.id,
                            {
                              fill: "#7c2d12",
                              stroke: "#fb923c",
                              fillLight: "#ffedd5",
                              strokeLight: "#c2410c",
                            },
                            `special-${i}`,
                          )}
                          {node.children?.map((child, ci) =>
                            renderEntry(
                              child,
                              {
                                fill: "#7c2d12",
                                stroke: "#fb923c",
                                fillLight: "#ffedd5",
                                strokeLight: "#c2410c",
                              },
                              `special-${i}-${ci}`,
                            ),
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* ── Graph ────────────────────────────────────────────────── */}
        <div className="h-[32rem] sm:h-[28rem] md:h-[24rem] flex-1 lg:h-full lg:w-3/4 rounded-xl bg-slate-100/60 dark:bg-transparent p-1">
          <SkillsGraph
            className="h-full w-full"
            onHoverSkill={setHoveredSkill}
            externalHoveredSkill={hoveredSkill}
          />
        </div>
      </div>
      <div className="w-11/12 mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
        <TechCarousel />
      </div>
    </FloatingSection>
  );
}

export default Skills;
