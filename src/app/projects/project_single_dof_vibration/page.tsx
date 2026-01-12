"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";
import VideoDock from "@/components/ui/VideoDock";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import Footer from "@/components/footer/Footer";
import ImageDoc from "@/components/ui/ImageDoc";

interface GalleryItem {
  id: number;
  loc: string;
  name: string;
  thumb: string;
  type: "image" | "video";
  poster?: string;
}

function Project_SingleDOF() {
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
      fetch("/projects/project_single_dof_vibration/files.json")
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        })
        .catch((err) => console.error("Failed to fetch items:", err));
    }
  }, []);

  // Helper to get item by ID safely
  const getItem = (id: number) => items.find((i) => i.id === id);

  return (
    <div>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <ProjectTitleBar title="Single DOF Vibration Simulation" />
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-10 space-y-6 text-lg">
            {/* Hero Section */}
            <FloatingSection>
              <h1 className="text-3xl mb-4 font-bold">Problem Definition</h1>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    Single degree of freedom systems contain only one type of
                    repetitive motion and therefore equation of motion is a
                    single second order differential equation.
                  </p>
                  <div className="mb-4">
                    <BlockMath math="m\ddot{x} + c\dot{x} + kx = 0" />
                  </div>
                  <p className="mb-4">
                    Solving this equation often uses assumption that solution is
                    in the form of <InlineMath math="x = X_0e^{st}" /> and
                    substituting this will give following quadratic equation.
                  </p>
                  <div className="mb-4">
                    <BlockMath math="ms^2 + cs + k = 0" />
                  </div>
                  <p className="mb-4">
                    Solutions to this can be calculated from usual quadratic
                    solution equation:
                  </p>
                  <div className="mb-4">
                    <BlockMath math="s_{1,2} = \frac{-c \pm \sqrt{c^2-2mk}}{2m}" />
                  </div>
                  <p>
                    Depending on the nature of the solutions of this quadratic
                    equation, there are three ways the system can behave.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  {items.length > 0 && (
                    <motion.img
                      layoutId="Single DOF Vibration Simulation_img"
                      style={{
                        cursor: "pointer",
                        border: "4px solid gray",
                        borderRadius: "8px",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={() => handleOpen(0)}
                      src="/Images/Projects/Single_DOF_MATLAB.png"
                      alt="Single DOF Vibration Simulation"
                      className="border-gray-800 dark:border-gray-200"
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            <Topic topicName="Damping Situations" />

            {/* 1) No Damping */}
            <FloatingSection>
              <h2 className="text-2xl mb-4 font-semibold">1) No Damping</h2>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2">
                  {getItem(3) && (
                    <VideoDock
                      video={getItem(3)!}
                      onOpen={handleOpen}
                    />
                  )}
                </div>
                <div className="lg:w-1/2 text-justify">
                  <p>
                    When damping coefficient is equal to zero (<InlineMath math="c = 0" />
                    ), there is no damping happening and harmonic motion
                    continues forever.
                  </p>
                </div>
              </div>
            </FloatingSection>

            {/* 2) Under Damped */}
            <FloatingSection>
              <h2 className="text-2xl mb-4 font-semibold">2) Under Damped</h2>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    When <InlineMath math="\beta < 1" />, <InlineMath math="s" />{" "}
                    has two complex solutions and it leads to following form of
                    solution known as underdamped system.
                  </p>
                  <div className="mb-4">
                    <BlockMath math="x(t) = X_0e^{-\beta\omega_n t} \sin(\omega_d t + \phi_0)" />
                  </div>
                  <p>
                    Where <InlineMath math="X_0, \phi_0" />, and{" "}
                    <InlineMath math="\omega_d" /> are amplitude, phase angle
                    and frequency of oscillation and:
                  </p>
                  <div className="mt-4">
                    <BlockMath math="\omega_d = \omega_n\sqrt{1-\beta^2}" />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  {getItem(5) && (
                    <VideoDock
                      video={getItem(5)!}
                      onOpen={handleOpen}
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            {/* 3) Critically Damped */}
            <FloatingSection>
              <h2 className="text-2xl mb-4 font-semibold">
                3) Critically Damped
              </h2>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2">
                  {getItem(7) && (
                    <VideoDock
                      video={getItem(7)!}
                      onOpen={handleOpen}
                    />
                  )}
                </div>
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    When <InlineMath math="\beta = 1" />,{" "}
                    <InlineMath math="s_1=s_2" />. Because of that system is
                    critically damped and it reaches the stability within
                    shortest possible time. The solution to DE is in the
                    following form:
                  </p>
                  <div className="mb-4">
                    <BlockMath math="x(t) = (c_1 + c_2t)e^{\omega_n t}" />
                  </div>
                </div>
              </div>
            </FloatingSection>

            {/* 4) Overdamped */}
            <FloatingSection>
              <h2 className="text-2xl mb-4 font-semibold">4) Overdamped</h2>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    When <InlineMath math="\beta > 1" />, system has two real
                    roots and solution has the following form:
                  </p>
                  <div className="mb-4">
                    <BlockMath math="x(t) = c_1e^{s_1t} + c_2e^{s_2t}" />
                  </div>
                  {/*<ImageDoc key={getItem(8)?.id} image={getItem(8)!} onOpen={handleOpen} />*/}
                </div>
                <div className="lg:w-1/2">
                  {getItem(9) && (
                    <VideoDock
                      video={getItem(9)!}
                      onOpen={handleOpen}
                    />
                  )}
                </div>
              </div>
            </FloatingSection>
            <section className="bg-slate-400/50 max-h-20 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 border-2 border-gray-800 dark:border-gray-200">
              <div className="flex flex-row justify-between">
                <h1 className="font-bold text-2xl"> Interactive Webpage </h1>
                <div className="flex justify-right gap-4">
                  <a
                    href="https://github.com/nuwantha005/Single_DOF_Vibration_Animation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub Repo
                  </a>
                  <div className="flex gap-4">
                    <a
                      href="https://nuwantha005.github.io/Single_DOF_Vibration_Animation/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <FloatingSection>
              <div className="flex-auto">
                <iframe
                  src="https://nuwantha005.github.io/Single_DOF_Vibration_Animation/"
                  title="Single DOF Vibration Animation"
                  className="w-full h-full rounded-lg border-4 min-h-screen"
                  // style={{ transform: "scale(0.8)", transformOrigin: "0 0" }}
                  allowFullScreen
                ></iframe>
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

export default Project_SingleDOF;