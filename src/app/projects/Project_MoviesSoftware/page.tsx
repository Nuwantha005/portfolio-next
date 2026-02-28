"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";

function Project_MoviesSoftware() {
  return (
    <ProjectPageLayout
      title="Movies and Series Management Software"
      fetchUrl="/projects/project_movies_and_tv_series_software/images.json"
      projectSlug="projects/Project_MoviesSoftware"
    >
      {(items, getItem, handleOpen) => (
        <>
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3">Overview</h1>
            <motion.img
              layoutId="Movies and Series Management Software_img"
              style={{
                cursor: "pointer",
                border: "4px solid gray",
                borderRadius: "8px",
              }}
              onClick={() => handleOpen(items[0].id)}
              src="/Images/Projects/movies_and_tv_series_Software_Window.PNG"
              alt="Landing Menu"
              className="border-gray-800 dark:border-gray-200"
            />
            <p className="text-left lg:basis-1/2">
              This program was created as the final project for my course at the
              ATARI city campus. It was a group project; however, it was done
              all by myself as a test for my own skills. Project assignment
              subject for our group changed later, and this was never presented.
              I wrote it entirely using Java and my SQL knowledge was used
              because MySQL was used as the database. The UI was designed using
              NetBeans IDEs drag-and-drop UI designer. The MySQL workbench was
              used to manage the database.
            </p>
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

export default Project_MoviesSoftware;
