import React from "react";
import FloatingSection from "../ui/FloatingSection";
import { motion } from "framer-motion";

interface ProjectCardProps {
  image: string;
  name: string;
  description: string;
  tags: string[];
  hasLink?: boolean;
  featured?: boolean;
  year?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  name,
  description,
  tags,
  hasLink = true,
  featured = false,
  year,
}) => {
  return (
    <div
      className={`project-card transition-transform duration-300 ease-in-out transform ${
        hasLink ? "hover:scale-105 cursor-pointer" : "opacity-90"
      }`}
    >
      <FloatingSection>
        <div className="flex flex-col items-center relative">
          {/* Badges Container */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
            {featured && (
              <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 shadow-md">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="hidden sm:inline">Featured</span>
              </span>
            )}
            {!hasLink && (
              <span className="bg-amber-500/90 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </div>

          {/* Year Badge */}
          {year && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-gray-800/80 dark:bg-gray-200/80 text-white dark:text-gray-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {year}
              </span>
            </div>
          )}

          <motion.p
            layoutId={name + "_title"}
            className="text-base sm:text-lg font-semibold text-center"
          >
            {name}
          </motion.p>

          {/* Using next/image for external images requires configuration, 
              so we use img for flexibility but with proper alt text */}
          <motion.img
            layoutId={name + "_img"}
            src={image}
            alt={`Screenshot of ${name} project`}
            className="w-full object-cover rounded-lg dark:bg-gray-800/50 bg-gray-200/50 p-2 shadow-md"
          />

          <p className="dark:text-gray-100 text-gray-800 mt-2 text-center text-sm sm:text-base">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1 sm:gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </FloatingSection>
    </div>
  );
};

export default ProjectCard;
