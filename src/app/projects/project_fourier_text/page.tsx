"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ImageDoc from "@/components/ui/ImageDoc";
import VideoDock from "@/components/ui/VideoDock";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";

function Project_FourierText() {
  return (
    <ProjectPageLayout
      title="Turning Text into Fourier Sums and Drawing"
      fetchUrl="/projects/project_fourier_text/files.json"
      projectSlug="projects/project_fourier_text"
    >
      {(items, getItem, handleOpen) => (
        <>
          {/* ───────────── Overview ───────────── */}
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Overview
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-1/2 flex justify-center">
                {items.length > 0 && (
                  <motion.img
                    layoutId="Turning Text into Fourier Sums and Drawing_img"
                    style={{
                      cursor: "pointer",
                      border: "4px solid gray",
                      borderRadius: "8px",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    onClick={() => handleOpen(items[0].id)}
                    src="/Images/Projects/Fourier_Names_React.png"
                    alt="Turning Text into Fourier Sums and Drawing"
                    className="border-gray-800 dark:border-gray-200"
                  />
                )}
              </div>
              <div className="lg:w-1/2 text-justify text-sm sm:text-base lg:text-xl">
                <p className="mb-4">
                  This project is an extension of the Fourier Images project.
                  Instead of requiring an input image file, it converts any
                  arbitrary text string into an image, extracts its contours,
                  applies a Discrete Fourier Transform, and draws the text using
                  rotating epicycles — a set of circles whose combined rotations
                  trace out the original shape.
                </p>
                <p>
                  The program uses Processing&apos;s graphics API to render text
                  with a custom font at high resolution, then feeds the
                  generated image through the same OpenCV contour extraction and
                  DFT pipeline used in the image version. The result is a
                  mesmerizing animation of two sets of rotating circles that
                  trace out the text character by character.
                </p>
              </div>
            </div>
          </FloatingSection>

          {/* ───────────── How It Works ───────────── */}
          <Topic topicName="How It Works" />

          <AutoAdjustingSection
            title="Text to Image"
            imagePosition="right"
            mediaContent={
              getItem(0) && <ImageDoc image={getItem(0)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4 text-justify">
              The first stage uses Processing&apos;s{" "}
              <strong>createGraphics</strong> API to render the input text
              string using a custom font file
              (&quot;parisienne.regular.ttf&quot;) at a configurable font size
              (default 350px). The rendered text is saved as a PNG image which
              serves as input for the contour extraction step.
            </p>
            <p className="text-justify">
              This approach makes the system extremely flexible — any text
              string, font, and size can be used to generate the source image
              automatically, without requiring manual image preparation.
            </p>
          </AutoAdjustingSection>

          <AutoAdjustingSection
            title="Contour & DFT"
            imagePosition="left"
            mediaContent={
              getItem(2) && <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4 text-justify">
              The generated PNG image is processed through the same pipeline as
              the image version: OpenCV converts it to grayscale, applies a
              binary threshold, and runs <strong>findContours</strong> to
              extract the outlines of each character.
            </p>
            <p className="text-justify">
              Points are sampled along the contours at a configurable step size
              (controlling sampling density), and the x and y coordinates are
              separately decomposed using a Discrete Fourier Transform. Each
              frequency component becomes a Circle object with its own
              amplitude, frequency, and phase — the building blocks for the
              epicycle animation.
            </p>
          </AutoAdjustingSection>

          <AutoAdjustingSection
            title="Epicycle Drawing"
            imagePosition="right"
            mediaContent={
              getItem(1) && (
                <VideoDock video={getItem(1)!} onOpen={handleOpen} />
              )
            }
          >
            <p className="mb-4 text-justify">
              The drawing stage uses the same dual-epicycle system as the image
              version: one set of rotating circles controls the x-coordinate and
              another controls the y-coordinate. As time progresses, the circles
              rotate at their respective frequencies, and the tip of each chain
              traces out the reconstructed path.
            </p>
            <p className="text-justify">
              The drawn path uses a distinctive{" "}
              <strong>yellow stroke color</strong> (RGB 255, 248, 21) instead of
              the cyan used in the image version, making it easy to distinguish
              output from the two programs.
            </p>
          </AutoAdjustingSection>

          {/* ───────────── The Pipeline ───────────── */}
          <Topic topicName="The Pipeline" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              End-to-End Flow
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 text-sm sm:text-base">
              {[
                "Text String",
                "Font Rendering",
                "PNG Image",
                "OpenCV Contours",
                "Point Sampling",
                "DFT(x), DFT(y)",
                "Epicycles",
                "Drawn Text",
              ].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center font-bold whitespace-nowrap">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-primary text-lg sm:text-xl font-bold">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-justify text-sm sm:text-base mt-2">
              The pipeline is fully automated: given a text string and font
              configuration, the program generates the image, extracts contours,
              computes the Fourier decomposition, and renders the epicycle
              animation — all without manual intervention.
            </p>
          </FloatingSection>

          {/* ───────────── Comparison with Image Version ───────────── */}
          <Topic topicName="Comparison with Image Version" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Key Differences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="space-y-3">
                <h3 className="font-bold text-primary">Text Version</h3>
                <ul className="list-disc list-inside space-y-1 text-justify">
                  <li>Input: arbitrary text string</li>
                  <li>Automatic image generation from custom font</li>
                  <li>Configurable font, size, and text parameters</li>
                  <li>Yellow trace color (255, 248, 21)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-primary">Image Version</h3>
                <ul className="list-disc list-inside space-y-1 text-justify">
                  <li>Input: image file (PNG, JPG, etc.)</li>
                  <li>Manual image preparation required</li>
                  <li>Works with any visual content</li>
                  <li>Cyan trace color</li>
                </ul>
              </div>
            </div>
            <p className="text-justify text-sm sm:text-base mt-4">
              Both versions share the same underlying DFT algorithm and epicycle
              drawing engine. The text version is essentially an automated
              wrapper that adds text-to-image conversion before the existing
              Fourier drawing pipeline.
            </p>
          </FloatingSection>

          {/* ───────────── Technology Stack ───────────── */}
          <Topic topicName="Technology Stack" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Tools & Libraries
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm sm:text-base">
              {[
                {
                  name: "Processing (Java)",
                  desc: "Core graphics framework and runtime",
                },
                {
                  name: "OpenCV (gab.opencv)",
                  desc: "Contour extraction and image processing",
                },
                {
                  name: "PeasyCam",
                  desc: "Interactive 3D camera control",
                },
                {
                  name: "Custom Fonts",
                  desc: "TTF font rendering for text generation",
                },
                {
                  name: "DFT Algorithm",
                  desc: "Discrete Fourier Transform decomposition",
                },
                {
                  name: "Real-time Rendering",
                  desc: "Live epicycle animation and drawing",
                },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="bg-primary/5 border border-primary/20 rounded-lg p-3"
                >
                  <h3 className="font-bold text-sm">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>
          </FloatingSection>

          {/* ───────────── Gallery ───────────── */}
          <div className="2xl:hidden">
            <Topic topicName="Gallery" />
            <FloatingSection>
              <LGComponent items={items} />
            </FloatingSection>
          </div>
        </>
      )}
    </ProjectPageLayout>
  );
}

export default Project_FourierText;
