"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";
import {
  projectCategories,
  getAllTags,
  type Project,
  type ProjectCategory,
} from "@/lib/projects-data";

type ViewMode = "categorized" | "all";

const ProjectsContent: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("categorized");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Only render Masonry after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get all unique tags from the data
  const availableTags = useMemo(() => getAllTags(), []);

  const toggleFilter = (tag: string) => {
    if (filters.includes(tag)) {
      setFilters(filters.filter((f) => f !== tag));
    } else {
      setFilters([...filters, tag]);
    }
  };

  const clearFilters = () => {
    setFilters([]);
  };

  // Filter projects based on selected tags
  const filterProjects = (projects: Project[]) => {
    if (filters.length === 0) return projects;
    return projects.filter((project) =>
      filters.every((tag) => project.tags.includes(tag))
    );
  };

  // Sort categories by priority
  const sortedCategories = useMemo(
    () => [...projectCategories].sort((a, b) => a.priority - b.priority),
    []
  );

  // Get all projects flattened (for "all" view mode)
  const allFilteredProjects = useMemo(() => {
    return sortedCategories.flatMap((cat) => filterProjects(cat.projects));
  }, [sortedCategories, filters]);

  const renderProjectCard = (project: Project, index: number) => {
    const hasLink = Boolean(project.link && project.link.trim().length > 0);
    const isExternalLink = project.link?.startsWith("http");

    const cardContent = (
      <ProjectCard
        key={`${project.name}-${index}`}
        image={project.image}
        name={project.name}
        description={project.description}
        tags={project.tags}
        hasLink={hasLink}
        featured={project.featured}
        year={project.year}
      />
    );

    if (!hasLink) {
      return (
        <div key={`${project.name}-${index}`} className="cursor-default">
          {cardContent}
        </div>
      );
    }

    if (isExternalLink) {
      return (
        <a
          href={project.link}
          key={`${project.name}-${index}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <Link href={project.link} key={`${project.name}-${index}`}>
        {cardContent}
      </Link>
    );
  };

  const renderCategorySection = (category: ProjectCategory) => {
    const filteredProjects = filterProjects(category.projects);

    // Don't render empty categories when filtering
    if (filteredProjects.length === 0) return null;

    const isExpanded = activeCategory === null || activeCategory === category.id;

    return (
      <div key={category.id} className="mb-8">
        {/* Category Header */}
        <button
          onClick={() =>
            setActiveCategory(activeCategory === category.id ? null : category.id)
          }
          className="w-full flex items-center justify-between mb-4 group"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {category.name}
            </h2>
            <span className="px-2 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>
          <svg
            className={`w-6 h-6 transition-transform duration-200 text-gray-500 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {category.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            {category.description}
          </p>
        )}

        {/* Projects Grid */}
        {isExpanded && mounted && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="30px">
              {filteredProjects.map((project, index) =>
                renderProjectCard(project, index)
              )}
            </Masonry>
          </ResponsiveMasonry>
        )}
        {isExpanded && !mounted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) =>
              renderProjectCard(project, index)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto px-2">
      {/* View Mode Toggle & Filter Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode("categorized")}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              viewMode === "categorized"
                ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              viewMode === "all"
                ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            All Projects
          </button>
        </div>

        {/* Active Filters Count & Clear */}
        {filters.length > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear {filters.length} filter{filters.length !== 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {availableTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => toggleFilter(tag)}
            className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all border-2 ${
              filters.includes(tag)
                ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-blue-900/30 dark:hover:border-blue-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Display */}
      {viewMode === "categorized" ? (
        // Categorized View
        <div className="space-y-8">
          {sortedCategories.map((category) => renderCategorySection(category))}
        </div>
      ) : mounted ? (
        // All Projects View - with Masonry
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="30px">
            {allFilteredProjects.map((project, index) =>
              renderProjectCard(project, index)
            )}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        // All Projects View - SSR fallback
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFilteredProjects.map((project, index) =>
            renderProjectCard(project, index)
          )}
        </div>
      )}

      {/* Empty State */}
      {allFilteredProjects.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">
            No projects match the selected filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;
