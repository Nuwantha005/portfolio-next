import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import SocialDock from "@/components/home/SocialDock";
import TimeLine from "@/components/home/Timeline";
import FloatingSection from "@/components/ui/FloatingSection";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative z-10 p-10 space-y-6">
      <About />
      <FloatingSection>
        <h1 className="text-bold text-3xl">Education</h1>
        <TimeLine />
      </FloatingSection>
      <Skills />
    </div>
  );
};

export default Home;
