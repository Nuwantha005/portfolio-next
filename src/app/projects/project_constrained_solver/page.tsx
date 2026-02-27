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

function Project_ConstrainedSolver() {
  const lgRef = useRef<LGRef>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  const handleOpen = (id: number) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      lgRef.current?.openGallery(index);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/projects/project_constrained_solver/files.json")
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        })
        .catch((err) => console.error("Failed to fetch items:", err));
    }
  }, []);

  const getItem = (id: number) => items.find((i) => i.id === id);

  return (
    <div>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <ProjectTitleBar title="Constrained Parametric Curve Solver" />
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
            <FloatingSection>
              <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Coming Soon
              </h1>
              <p>This project page is under construction.</p>
            </FloatingSection>

            <Topic topicName="Gallery" />
            <FloatingSection>
              <LGComponent ref={lgRef} items={items} />
            </FloatingSection>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Project_ConstrainedSolver;
