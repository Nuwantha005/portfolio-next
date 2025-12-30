import React from "react";
import FloatingSection from "../ui/FloatingSection";

const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="project-card animate-pulse">
      <FloatingSection>
        <div className="flex flex-col items-center">
          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

          {/* Image skeleton */}
          <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

          {/* Description skeleton - 3 lines */}
          <div className="space-y-2 mt-4 w-full">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
          </div>

          {/* Tags skeleton */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-14 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </FloatingSection>
    </div>
  );
};

export default ProjectCardSkeleton;
