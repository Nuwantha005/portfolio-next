import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import "./globals.css";

const Projects: React.FC = () => {
  interface Project {
    image: string;
    name: string;
    description: string;
    tags: string[];
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/jason/projectDetails.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative z-10 p-2 ">
      <div className="masonry-grid">
        {projects.map((project, index) => (
          <div key={index} className="masonry-item">
            <ProjectCard
              image={project.image}
              name={project.name}
              description={project.description}
              tags={project.tags}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
