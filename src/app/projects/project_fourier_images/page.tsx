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
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Project_FourierImages() {
  return (
    <ProjectPageLayout
      title="Turning Images into Fourier Sums and Drawing"
      fetchUrl="/projects/project_fourier_images/files.json"
      projectSlug="projects/project_fourier_images"
    >
      {(items, getItem, handleOpen) => (
        <>
          {/* ─── Overview ─── */}
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Overview
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-1/2 flex justify-center">
                <motion.img
                  layoutId="Turning Images into Fourier Sums and Drawing_img"
                  style={{
                    cursor: "pointer",
                    border: "4px solid gray",
                    borderRadius: "8px",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  onClick={() => handleOpen(items[0]?.id ?? 0)}
                  src="/Images/Projects/Fourier_Image_Example.png"
                  alt="Fourier Drawing Example"
                  className="border-gray-800 dark:border-gray-200"
                />
              </div>
              <div className="lg:w-1/2 text-justify text-sm sm:text-base lg:text-xl">
                <p className="mb-4">
                  This Processing (Java) application takes an input image,
                  extracts its contours using <strong>OpenCV</strong>, and
                  reconstructs the outline using rotating circles (epicycles)
                  driven by the{" "}
                  <strong>Discrete Fourier Transform (DFT)</strong>.
                </p>
                <p className="mb-4">
                  The pipeline converts the image to grayscale, applies
                  thresholding, and extracts contour points. The x and y
                  coordinates of those points are separated and each fed
                  independently into a DFT, producing a set of frequency
                  coefficients that are interpreted as rotating circles with
                  specific amplitudes, frequencies, and phases.
                </p>
                <p>
                  Two chains of epicycles — one for x and one for y — rotate
                  simultaneously. The tip of each chain traces the respective
                  coordinate, and their intersection reconstructs the original
                  contour as time sweeps from <InlineMath math="0" /> to{" "}
                  <InlineMath math="2\pi" />.
                </p>
              </div>
            </div>
          </FloatingSection>

          {/* ─── Topic: How It Works ─── */}
          <Topic topicName="How It Works" />

          {/* Contour Extraction */}
          <AutoAdjustingSection
            title="Contour Extraction"
            imagePosition="right"
            mediaContent={
              getItem(2) && <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4 text-justify">
              The input image (e.g. a silhouette of a cat) is loaded and
              processed through an OpenCV pipeline: conversion to grayscale,
              binary thresholding, and contour detection via{" "}
              <code>findContours</code>. The largest contour is selected and its
              points are sampled at regular intervals to produce an ordered list
              of <InlineMath math="(x_n, y_n)" /> coordinate pairs.
            </p>
            <p className="text-justify">
              These sampled points define the discrete signal that will be
              decomposed by the DFT. Separating x and y into independent arrays
              allows each dimension to be transformed and drawn with its own set
              of epicycles.
            </p>
          </AutoAdjustingSection>

          {/* Discrete Fourier Transform */}
          <AutoAdjustingSection
            title="Discrete Fourier Transform"
            imagePosition="left"
            mediaContent={
              getItem(3) && <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4 text-justify">
              The DFT is applied independently to the x-coordinate array and the
              y-coordinate array. For each frequency index{" "}
              <InlineMath math="k" />, the transform computes real and imaginary
              components by correlating the signal with sine and cosine basis
              functions:
            </p>
            <div className="mb-4">
              <BlockMath math="\text{re} = \frac{1}{N}\sum_{n=0}^{N-1} x_n \cos\!\left(\frac{2\pi k n}{N}\right)" />
            </div>
            <div className="mb-4">
              <BlockMath math="\text{im} = -\frac{1}{N}\sum_{n=0}^{N-1} x_n \sin\!\left(\frac{2\pi k n}{N}\right)" />
            </div>
            <p className="text-justify">
              Each coefficient is converted to polar form — amplitude{" "}
              <InlineMath math="A_k = \sqrt{\text{re}^2 + \text{im}^2}" />,
              phase{" "}
              <InlineMath math="\varphi_k = \text{atan2}(\text{im}, \text{re})" />
              , and frequency <InlineMath math="k" /> — defining a rotating
              circle. The coefficients are sorted by descending amplitude so the
              largest circles are drawn first, giving rapid visual convergence.
            </p>
          </AutoAdjustingSection>

          {/* Epicycle Drawing */}
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
              Two independent chains of epicycles are rendered on screen — one
              arranged horizontally (producing the x-coordinate) and one
              vertically (producing the y-coordinate). Each chain stacks
              rotating circles end-to-end: the centre of circle{" "}
              <InlineMath math="k+1" /> sits on the rim of circle{" "}
              <InlineMath math="k" />.
            </p>
            <p className="text-justify">
              As time <InlineMath math="t" /> advances from{" "}
              <InlineMath math="0" /> to <InlineMath math="2\pi" />, the tip of
              the x-chain and the tip of the y-chain each trace a coordinate
              value. A horizontal line from the y-chain tip and a vertical line
              from the x-chain tip intersect at the drawn point, progressively
              reconstructing the full contour on the canvas.
            </p>
          </AutoAdjustingSection>

          {/* ─── Topic: The Mathematics ─── */}
          <Topic topicName="The Mathematics" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              DFT Formulation
            </h2>
            <p className="mb-4 text-justify">
              The Discrete Fourier Transform converts a finite sequence of{" "}
              <InlineMath math="N" /> equally-spaced samples into a same-length
              sequence of complex frequency coefficients:
            </p>
            <div className="mb-4">
              <BlockMath math="X_k = \frac{1}{N}\sum_{n=0}^{N-1} x_n \cdot e^{-i\,2\pi k n / N}" />
            </div>
            <p className="mb-4 text-justify">
              Each coefficient <InlineMath math="X_k" /> encodes a circle with
              amplitude <InlineMath math="A_k" />, frequency{" "}
              <InlineMath math="k" />, and phase <InlineMath math="\varphi_k" />
              . The original signal is reconstructed by summing these rotating
              phasors:
            </p>
            <div className="mb-4">
              <BlockMath math="x(t) = \sum_{k} A_k \cos\!\left(k \cdot t + \varphi_k\right)" />
            </div>
            <p className="text-justify">
              Sorting the coefficients by descending amplitude means the first
              few circles capture the coarse shape while later, smaller circles
              add finer detail — analogous to how low-frequency Fourier
              components carry most of the signal energy.
            </p>
          </FloatingSection>

          {/* ─── Topic: Technology Stack ─── */}
          <Topic topicName="Technology Stack" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Tools & Libraries
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
              <li>
                <strong>Processing (Java)</strong> — Creative-coding framework
                used for real-time rendering and animation
              </li>
              <li>
                <strong>OpenCV (gab.opencv)</strong> — Image processing:
                grayscale conversion, thresholding, contour extraction
              </li>
              <li>
                <strong>PeasyCam</strong> — 3D camera control for interactive
                scene navigation
              </li>
              <li>
                <strong>Discrete Fourier Transform</strong> — Custom
                implementation converting contour coordinates into frequency
                coefficients
              </li>
              <li>
                <strong>Real-time Animation</strong> — Epicycle chains drawn
                each frame, progressively tracing the reconstructed contour
              </li>
            </ul>
          </FloatingSection>

          {/* ─── Gallery ─── */}
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

export default Project_FourierImages;
