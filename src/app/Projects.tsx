"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectCardSkeleton from "@/components/projects/ProjectCardSkeleton";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";

const Projects: React.FC = () => {
  interface Project {
    image: string;
    name: string;
    description: string;
    tags: string[];
    link: string;
  }

  const [filters, setFilters] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("./json/projectDetails.json")
      .then((res) => res.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setProjects(data);
        } catch (err) {
          console.error("Failed to parse JSON:", err);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleFilter = (tag: string) => {
    if (filters.includes(tag)) {
      setFilters(filters.filter((f) => f !== tag));
    } else {
      setFilters([...filters, tag]);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      filters.length === 0 || filters.every((tag) => project.tags.includes(tag))
  );

  return (
    <div className="mx-auto px-2">
      {/* Filter Buttons */}
      <div className="mb-8 flex-row justify-center space-y-4 space-x-4">
        {[
          "CAD",
          "Simulation",
          "SolidWorks",
          "JavaScript",
          "Python",
          "Java",
          "MATLAB",
          "MySQL",
          "JavaFX",
          "Processing",
          "P5js",
          "OpenCV",
          "Live Demo",
          "React",
          "CSS",
          "AutoCAD",
          "Arduino",
          "Visualization",
        ].map((tag, index) => (
          <button
            key={index}
            onClick={() => toggleFilter(tag)}
            className={`px-4 py-2 rounded-full font-medium transition-all border-2 border-slate-400 dark:border-slate-600 ${
              filters.includes(tag)
                ? "bg-blue-800 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-blue-500 hover:text-gray-200 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-blue-500"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
          <Masonry gutter="30px">
            {isLoading
              ? // Show skeleton loaders while loading
                Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardSkeleton key={`skeleton-${index}`} />
                ))
              : // Show actual projects
                filteredProjects.map((project, index) => {
                  const hasLink = Boolean(
                    project.link && project.link.trim().length > 0
                  );
                  const isExternalLink = project.link?.startsWith("http");

                  const cardContent = (
                    <ProjectCard
                      key={index}
                      image={project.image}
                      name={project.name}
                      description={project.description}
                      tags={project.tags}
                      hasLink={hasLink}
                    />
                  );

                  if (!hasLink) {
                    return (
                      <div key={index} className="cursor-default">
                        {cardContent}
                      </div>
                    );
                  }

                  if (isExternalLink) {
                    return (
                      <a
                        href={project.link}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <Link href={project.link} key={index}>
                      {cardContent}
                    </Link>
                  );
                })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default Projects;
