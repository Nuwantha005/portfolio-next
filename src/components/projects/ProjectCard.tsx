import React from "react";
import FloatingSection from "../ui/FloatingSection";

interface ProjectCardProps {
  image: string;
  name: string;
  description: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  name,
  description,
  tags,
}) => {
  return (
    <div className="project-card transition-transform duration-300 ease-in-out transform hover:scale-105">
      <FloatingSection>
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt={name}
            className="w-full object-cover rounded-lg dark:bg-gray-800/50 bg-gray-200/50  p-2 shadow-md"
          />
          <h3 className="text-lg font-semibold mt-4">{name}</h3>
          <p className="dark:text-gray-100 text-gray-800 mt-2 text-center">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap justify-center space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 px-3 py-1 rounded-full text-sm m-1"
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
