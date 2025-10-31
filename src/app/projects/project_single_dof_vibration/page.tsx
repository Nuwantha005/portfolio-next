"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";

interface GalleryItem {
  id: number;
  loc: string;
  name: string;
  thumb: string;
  type: "image" | "video";
  poster?: string;
}

function Project_MoviesSoftware() {
  const lgRef = useRef<LGRef>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  
  const handleOpen = (id: number) => {
    // Find the index of the item with the given ID
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      lgRef.current?.openGallery(index);
    }
  };
  // Fetch items
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/projects/project_single_dof_vibration/files.json")
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        })
        .catch((err) => console.error("Failed to fetch items:", err));
    }
  }, []);
  return (
    <div>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <ProjectTitleBar title="Movies and Series Management Software" />
        {/* Floating Tiles Content */}
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-10 space-y-6">
            <FloatingSection>
              <h1 className="text-2xl mb-4">Overview</h1>
              <motion.img
                layoutId="Single DOF Vibration Simulation_img"
                style={{
                  cursor: "pointer",
                  border: "4px solid gray",
                  borderRadius: "8px",
                  maxWidth: "50%", // Limit the width to 80% of the container
                  height: "auto", // Maintain aspect ratio
                }}
                onClick={() => handleOpen(items[0].id)}
                src="/Images/Projects/Single_DOF_MATLAB.png"
                alt="Single DOF Vibration Simulation"
                className="border-gray-800 dark:border-gray-200 "
              />
              <p className="p-4 m-4 text-center lg:text-left lg:basis-1/2">
                This program was created as the final project for my course at
                the ATARI city campus. It was a group project; however, it was
                done all by myself as a test for my own skills. Project
                assignment subject for our group changed later, and this was
                never presented. I wrote it entirely using Java and my SQL
                knowledge was used because MySQL was used as the database. The
                UI was designed using NetBeans IDEs drag-and-drop UI designer.
                The MySQL workbench was used to manage the database.
              </p>
            </FloatingSection>
            <Topic topicName="Gallery" />
            <FloatingSection>
              <div className="">
                <LGComponent ref={lgRef} items={items} />
              </div>
            </FloatingSection>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Project_MoviesSoftware;
