"use client";

import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import DynamicTimeline from "@/components/home/DynamicTimeline";
import FloatingSection from "@/components/ui/FloatingSection";
import React from "react";

const HomeContent: React.FC = () => {
  return (
    <div className="relative z-10 p-10 space-y-6">
      <About />
      <FloatingSection>
        <h1 className="text-bold text-3xl mb-4">My Journey</h1>
        <p className="text-muted-foreground mb-6">Education • Internships • Work Experience</p>
        <DynamicTimeline />
      </FloatingSection>
      <Skills />
    </div>
  );
};

export default HomeContent;
