"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingSection from "@/components/ui/FloatingSection";
import { projectCategories, type Project } from "@/lib/projects-data";

interface RelatedProjectsProps {
  /** The `link` field of the current project (e.g. "projects/project_volute_fillet") */
  currentProjectLink: string;
  /** Max number of related projects to show */
  max?: number;
}

/**
 * Shows related projects from the same category, excluding the current one.
 * Falls back to featured projects from other categories if same-category is empty.
 */
export default function RelatedProjects({
  currentProjectLink,
  max = 3,
}: RelatedProjectsProps) {
  // Find the category containing this project
  const currentCategory = projectCategories.find((cat) =>
    cat.projects.some((p) => p.link === currentProjectLink),
  );

  let related: Project[] = [];

  if (currentCategory) {
    related = currentCategory.projects
      .filter((p) => p.link !== currentProjectLink && p.link !== "")
      .slice(0, max);
  }

  // If not enough, pull featured from other categories
  if (related.length < max) {
    const others = projectCategories
      .filter((cat) => cat.id !== currentCategory?.id)
      .flatMap((cat) => cat.projects)
      .filter(
        (p) =>
          p.featured &&
          p.link !== "" &&
          p.link !== currentProjectLink &&
          !related.some((r) => r.link === p.link),
      )
      .slice(0, max - related.length);
    related = [...related, ...others];
  }

  if (related.length === 0) return null;

  return (
    <FloatingSection className="p-3">
      <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
        Related Projects
      </h3>
      <div className="space-y-3">
        {related.map((project) => (
          <Link
            key={project.link}
            href={`/${project.link}`}
            className="group block rounded-md overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all duration-200"
          >
            <div className="w-full aspect-[16/10] relative bg-slate-300/30 dark:bg-slate-700/30">
              <Image
                src={project.image.replace(/^\.\//, "/")}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="px-2 py-2 bg-slate-300/20 dark:bg-slate-700/20">
              <p className="text-sm font-medium leading-tight truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.name}
              </p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-muted-foreground bg-slate-300/50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FloatingSection>
  );
}
