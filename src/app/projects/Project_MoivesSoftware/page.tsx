"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";

interface Images {
  id: number;
  loc: string;
  name: string;
  thumb: string;
  type: "image" | "video";
  poster?: string;
}

function Project_MoviesSoftware() {
  const lgRef = useRef<LGRef>(null);
  const [images, setImages] = useState<Images[]>([]);
  const handleOpen = (index: number) => {
    lgRef.current?.openGallery(index);
  };
  // Fetch images
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/projects/project_movies_and_tv_series_software/images.json")
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
        })
        .catch((err) => console.error("Failed to fetch images:", err));
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
                layoutId="Movies and Series Management Software_img"
                style={{
                  cursor: "pointer",
                  border: "4px solid gray",
                  borderRadius: "8px",
                }}
                onClick={() => handleOpen(images[0].id)}
                src="/Images/Projects/movies_and_tv_series_Software_Window.PNG"
                alt="Landing Menu"
                className="border-gray-800 dark:border-gray-200"
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
                <LGComponent ref={lgRef} items={images} />
              </div>
            </FloatingSection>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Project_MoviesSoftware;
