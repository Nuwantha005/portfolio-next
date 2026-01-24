"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";
import Footer from "@/components/footer/Footer";

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
    const index = items.findIndex((item) => item.id === id);
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
          <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6">
            <FloatingSection>
              <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4">Overview</h1>
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
                  <p className="p-2 sm:p-4 m-2 sm:m-4 text-left lg:basis-1/2">
                    Since complex plane is a 2D space, complex functions
                    visualization can be difficult because the standard
                    Cartesian graph only represents 1D functions. Therefore,
                    coloured points in 2D space were used to represent
                    differeent complex numbers, and the transformation can be
                    visualized as an animation of points moving from the Domain
                    of the function to the Image of the function.
                  </p>
                  <p className="p-2 sm:p-4 m-2 sm:m-4 text-left lg:basis-1/2">
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
            <Topic topicName="Gallery" />
            <FloatingSection>
              <div className="">
                <LGComponent ref={lgRef} items={items} />
              </div>
            </FloatingSection>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Project_ComplexMapping;
