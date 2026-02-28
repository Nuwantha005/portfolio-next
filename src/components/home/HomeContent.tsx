"use client";

import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import DynamicTimeline from "@/components/home/DynamicTimeline";
import PublicationsSection from "@/components/home/PublicationsSection";
import FloatingSection from "@/components/ui/FloatingSection";
import React from "react";

const HomeContent: React.FC = () => {
  return (
    <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 space-y-3 sm:space-y-4 md:space-y-6">
      <About />
      <FloatingSection>
        <h1 className="text-bold text-2xl sm:text-3xl mb-3 sm:mb-4">
          My Journey
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
          Education • Internships • Work Experience
        </p>
        <DynamicTimeline />
      </FloatingSection>
      <Skills />
      <PublicationsSection />
    </div>
  );
};

export default HomeContent;
