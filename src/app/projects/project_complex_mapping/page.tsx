"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";

function Project_ComplexMapping() {
  return (
    <ProjectPageLayout
      title="Complex Mapping and Vibration"
      fetchUrl="/projects/project_complex_mapping_vibration/files.json"
      projectSlug="projects/project_complex_mapping"
    >
      {(items, getItem, handleOpen) => (
        <>
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3">Overview</h1>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-1/2 flex justify-center">
                <motion.img
                  layoutId="Complex Transformations Mapping_img"
                  style={{
                    cursor: "pointer",
                    border: "4px solid gray",
                    borderRadius: "8px",
                    maxWidth: "100%", // Limit the width to 80% of the container
                    height: "auto", // Maintain aspect ratio
                  }}
                  onClick={() => handleOpen(items[0].id)}
                  src="/projects/project_complex_mapping_vibration/images/Complex_Mapping.png"
                  alt="Landing Menu"
                  className="border-gray-800 dark:border-gray-200"
                />
              </div>
              <div className="lg:w-1/2 text-justify text-sm sm:text-base lg:text-xl">
                <p className="text-left lg:basis-1/2">
                  Since complex plane is a 2D space, complex functions
                  visualization can be difficult because the standard Cartesian
                  graph only represents 1D functions. Therefore, coloured points
                  in 2D space were used to represent differeent complex numbers,
                  and the transformation can be visualized as an animation of
                  points moving from the Domain of the function to the Image of
                  the function.
                </p>
                <p className="text-left lg:basis-1/2">
                  In this project, I explored various complex transformations
                  and their effects on different shapes and patterns using
                  color-coded visualizations. Additionally, I used 2 types of
                  grids - Polar grid and Cartesian grid, and the colouring of
                  the polar grid is based on the magnitude of the complext
                  number while cartesian grid changes the color based on the
                  real coordinate.
                </p>
              </div>
            </div>
          </FloatingSection>

          {/* Gallery at bottom — hidden on 2xl */}
          <div className="2xl:hidden">
            <Topic topicName="Gallery" />
            <FloatingSection>
              <LGComponent items={items} />
            </FloatingSection>
          </div>
        </>
      )}
    </ProjectPageLayout>
  );
}

export default Project_ComplexMapping;
