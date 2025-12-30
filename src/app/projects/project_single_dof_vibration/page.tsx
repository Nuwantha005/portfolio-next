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

export default Project_SingleDOF;