import React from "react";
import FloatingSection from "../ui/FloatingSection";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  image: string;
  name: string;
  description: string;
  tags: string[];
  hasLink?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  name,
  description,
  tags,
  hasLink = true,
}) => {
  return (
    <div
      className={`project-card transition-transform duration-300 ease-in-out transform ${
        hasLink ? "hover:scale-105 cursor-pointer" : "opacity-90"
      }`}
    >
      <FloatingSection>
        <div className="flex flex-col items-center relative">
          {/* No link indicator badge */}
          {!hasLink && (
            <span className="absolute top-2 right-2 z-10 bg-amber-500/90 text-white text-xs px-2 py-1 rounded-full">
              Coming Soon
            </span>
          )}

          <motion.p
            layoutId={name + "_title"}
            className="text-lg font-semibold text-center"
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

          <p className="dark:text-gray-100 text-gray-800 mt-2 text-center">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 px-3 py-1 rounded-full text-sm"
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
