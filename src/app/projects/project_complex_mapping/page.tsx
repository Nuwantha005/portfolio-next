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

function Project_ComplexMapping() {
  const lgRef = useRef<LGRef>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  const handleOpen = (id: number) => {
    // Find the index of the item with the given ID
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      lgRef.current?.openGallery(index);
    }
  };

  // Fetch images and videos
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/projects/project_complex_mapping_vibration/files.json")
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
        <ProjectTitleBar title="Complex Mapping and Vibration" />
        {/* Floating Tiles Content */}
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-10 space-y-6">
            <FloatingSection>
              <h1 className="text-2xl mb-4">Overview</h1>
              <motion.img
                layoutId="Complex Transformations Mapping_img"
                style={{
                  cursor: "pointer",
                  border: "4px solid gray",
                  borderRadius: "8px",
                  maxWidth: "50%", // Limit the width to 80% of the container
                  height: "auto", // Maintain aspect ratio
                }}
                onClick={() => handleOpen(items[0].id)}
                src="/projects/project_complex_mapping_vibration/images/Complex_Mapping.png"
                alt="Landing Menu"
                className="border-gray-800 dark:border-gray-200"
              />
              <p className="p-4 m-4 text-center lg:text-left lg:basis-1/2">
                This project explores complex mappings and vibrations through
                various visual representations. It includes both images and
                videos to illustrate different concepts and transformations.
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

export default Project_ComplexMapping;
