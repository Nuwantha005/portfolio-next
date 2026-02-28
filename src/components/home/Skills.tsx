import React from "react";
import TechCarousel from "./TechCarousel";
import FloatingSection from "../ui/FloatingSection";
import SkillsGraph from "./SkillsGraph";
import { skillsGraphStructure, type SkillEntry } from "@/lib/skills-graph-data";

function Skills() {
  const renderSkillEntry = (
    entry: SkillEntry,
    key: string,
  ): React.ReactElement => {
    if (typeof entry === "string") {
      return (
        <li
          key={key}
          className="list-disc pl-4 text-slate-600 dark:text-slate-300"
        >
          {entry}
        </li>
      );
    }

    return (
      <li key={key} className="space-y-2">
        <span className="font-medium text-slate-900 dark:text-slate-100">
          {entry.id}
          {entry.type === "special" ? " (multi-domain)" : ""}
        </span>
        {entry.children && entry.children.length > 0 && (
          <ul className="ml-4 space-y-1 border-l border-slate-300 dark:border-slate-700 pl-4">
            {entry.children.map((child, childIndex) =>
              renderSkillEntry(child, `${key}-${childIndex}`),
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <FloatingSection>
      <h1 className="text-bold text-2xl sm:text-3xl">Skills</h1>
      <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Explore my technical skill set through an interactive force-directed
        graph. Hover to highlight related technologies, drag to rearrange, and
        scroll to zoom in or out.
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6 lg:h-[36rem] lg:flex-row lg:items-stretch">
        <div className="hidden lg:block space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 p-6 text-sm text-slate-700 dark:text-slate-300 lg:w-1/4 lg:max-w-none lg:overflow-y-auto">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-300">
            Skill Hierarchy
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mirrors the graph data: expand categories, follow nested items for
            parent-child groupings, and spot multi-domain entries at a glance.
          </p>
          <ul className="space-y-4 text-sm">
            {skillsGraphStructure.categories.map((category, categoryIndex) => (
              <li key={category.id} className="space-y-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {category.id}
                </span>
                <ul className="ml-4 space-y-1 border-l border-slate-300 dark:border-slate-700 pl-4">
                  {category.skills.map((skill, skillIndex) =>
                    renderSkillEntry(
                      skill,
                      `${category.id}-${categoryIndex}-${skillIndex}`,
                    ),
                  )}
                </ul>
              </li>
            ))}
          </ul>

          {skillsGraphStructure.special &&
            skillsGraphStructure.special.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
                  Multi-domain
                </h3>
                <ul className="space-y-1 text-sm">
                  {skillsGraphStructure.special.map((specialNode, index) => (
                    <li
                      key={specialNode.id}
                      className="space-y-1 border-l border-orange-600/40 pl-4"
                    >
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {specialNode.id}
                      </span>
                      {specialNode.children &&
                        specialNode.children.length > 0 && (
                          <ul className="ml-2 space-y-1 border-l border-slate-300 dark:border-slate-700 pl-4">
                            {specialNode.children.map((child, childIndex) =>
                              renderSkillEntry(
                                child,
                                `${specialNode.id}-${index}-${childIndex}`,
                              ),
                            )}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        <div className="h-[32rem] sm:h-[28rem] md:h-[24rem] flex-1 lg:h-full lg:w-3/4 rounded-xl bg-slate-100/60 dark:bg-transparent p-1">
          <SkillsGraph className="h-full w-full" />
        </div>
      </div>
      <div className="w-11/12 mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
        <TechCarousel />
      </div>
    </FloatingSection>
  );
}

export default Skills;
