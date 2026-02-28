"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ImageDoc from "@/components/ui/ImageDoc";
import VideoDock from "@/components/ui/VideoDock";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Project_ComplexMapping() {
  return (
    <ProjectPageLayout
      title="Complex Mapping and Vibration"
      fetchUrl="/projects/project_complex_mapping_vibration/files.json"
      projectSlug="projects/project_complex_mapping"
    >
      {(items, getItem, handleOpen) => (
        <>
          {/* ─── Hero / Overview ─── */}
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Overview
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-1/2 flex justify-center">
                <motion.img
                  layoutId="Complex Transformations Mapping_img"
                  style={{
                    cursor: "pointer",
                    border: "4px solid gray",
                    borderRadius: "8px",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  onClick={() => handleOpen(items[0]?.id ?? 4)}
                  src="/projects/project_complex_mapping_vibration/images/Complex_Mapping.png"
                  alt="Complex transformations mapping overview"
                  className="border-gray-800 dark:border-gray-200"
                />
              </div>
              <div className="lg:w-1/2 text-justify text-sm sm:text-base lg:text-xl">
                <p className="mb-4">
                  Visualizing complex functions is inherently challenging: the
                  complex plane is already two-dimensional, so a function{" "}
                  <InlineMath math="f: \mathbb{C} \to \mathbb{C}" /> requires
                  four dimensions for a complete Cartesian graph. To overcome
                  this, colour-coded points in 2D space represent different
                  complex numbers, and a <strong>transformation</strong> is
                  animated as points smoothly interpolating from the{" "}
                  <strong>domain</strong> to the <strong>image</strong> of the
                  function.
                </p>
                <p className="mb-4">
                  This project explores various complex transformations —
                  including powers, reciprocals, and combinations — and their
                  geometric effects on grids and scattered point clouds. Two
                  coordinate systems are used: <strong>Cartesian grids</strong>{" "}
                  (colour based on the real coordinate) and{" "}
                  <strong>Polar grids</strong> (colour based on magnitude), each
                  rendered as either discrete dots or continuous lines.
                </p>
                <p>
                  Controls: <em>left click</em> to trigger the animation,{" "}
                  <em>scroll</em> to zoom, and <em>middle button</em> to pan the
                  viewport.
                </p>
              </div>
            </div>
          </FloatingSection>

          {/* ─── Topic: Mathematical Background ─── */}
          <Topic topicName="Mathematical Background" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Complex Transformations
            </h2>
            <div className="text-justify space-y-4">
              <p>
                A complex transformation is a function{" "}
                <InlineMath math="f: \mathbb{C} \to \mathbb{C}" /> that maps
                each point <InlineMath math="z = x + iy" /> in the domain to a
                new point <InlineMath math="w = f(z)" /> in the image. The
                geometric effect — rotation, scaling, inversion, or distortion —
                depends on the algebraic form of <InlineMath math="f" />.
              </p>
              <p>The functions implemented in this project include:</p>
              <div className="overflow-x-auto">
                <BlockMath
                  math={`\\begin{aligned}
f(z) &= z^n \\quad \\text{(power, e.g. } z^2,\\, z^{5.35}\\text{)} \\\\
f(z) &= \\frac{1}{z} \\quad \\text{(reciprocal / inversion)} \\\\
f(z) &= iz \\quad \\text{(90° rotation)} \\\\
f(z) &= (z+1)^{-2} \\quad \\text{(shifted reciprocal squared)} \\\\
f(z) &= \\frac{1}{z^2} + 5z \\quad \\text{(combination)} \\\\
f(z) &= 3z^3 \\quad \\text{(scaled cubic)}
\\end{aligned}`}
                />
              </div>
              <p>
                Each function produces a distinct geometric signature: the power
                map <InlineMath math="z^n" /> multiplies the argument by{" "}
                <InlineMath math="n" /> and raises the modulus to the{" "}
                <InlineMath math="n" />
                -th power, while the reciprocal <InlineMath math="1/z" />{" "}
                performs a circle inversion combined with a conjugation.
              </p>
            </div>
          </FloatingSection>

          {/* ─── Topic: Visualization Methods ─── */}
          <Topic topicName="Visualization Methods" />

          <FloatingSection>
            <p className="text-justify mb-4">
              Four visualization modes are available, combining two coordinate
              systems with two rendering styles. Each mode colours points
              differently: <strong>Cartesian</strong> modes map the{" "}
              <InlineMath math="x" />
              -coordinate to a colour gradient, while <strong>
                Polar
              </strong>{" "}
              modes map the magnitude <InlineMath math="|z|" /> to colour. The
              animation interpolates each point from its original position to
              its transformed position under <InlineMath math="f(z)" />.
            </p>
          </FloatingSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 items-stretch">
            {/* Cartesian + Dots */}
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Cartesian Dots
              </h2>
              {getItem(1) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(1)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-2 flex-1">
                <p>
                  Thousands of randomly scattered dots fill the complex plane,
                  each coloured by its real coordinate. When the transformation
                  is applied, the cloud of dots flows to new positions,
                  revealing how the function stretches, compresses, and rotates
                  different regions of the plane.
                </p>
              </div>
            </FloatingSection>

            {/* Cartesian + Lines */}
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Cartesian Lines
              </h2>
              {getItem(3) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(3)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-2 flex-1">
                <p>
                  A regular Cartesian grid of horizontal and vertical lines is
                  drawn, with colour varying along the <InlineMath math="x" />
                  -axis. Under the transformation, straight lines warp into
                  curves, making it easy to identify conformal properties —
                  angles between grid lines are preserved by analytic functions.
                </p>
              </div>
            </FloatingSection>

            {/* Polar + Dots */}
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Polar Dots
              </h2>
              {getItem(13) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(13)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-2 flex-1">
                <p>
                  Dots are distributed across the plane and coloured by their
                  magnitude <InlineMath math="|z|" />. This highlights how the
                  transformation affects distance from the origin — inversions
                  swap near and far points, while power maps expand or compress
                  radial distances non-linearly.
                </p>
              </div>
            </FloatingSection>

            {/* Polar + Lines */}
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Polar Lines
              </h2>
              {getItem(15) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(15)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-2 flex-1">
                <p>
                  Concentric circles and radial rays form the polar grid, with
                  colour encoding magnitude. The transformation bends circles
                  into new curves and redirects rays, visually demonstrating how{" "}
                  <InlineMath math="f(z)" /> distorts the polar structure of the
                  plane.
                </p>
              </div>
            </FloatingSection>
          </div>

          {/* ─── Topic: Transformations Gallery ─── */}
          <Topic topicName="Transformations Gallery" />

          <FloatingSection>
            <p className="text-justify mb-4">
              The images below show the <strong>before</strong> (domain) and{" "}
              <strong>after</strong> (image) states for various transformations
              applied to both Cartesian and Polar grids. Each pair demonstrates
              how a specific function reshapes the geometry of the complex
              plane.
            </p>
          </FloatingSection>

          {/* Cartesian Dots mapping */}
          <AutoAdjustingSection
            title="Cartesian Dots — Power Mapping"
            imagePosition="left"
            mediaContent={
              getItem(5) && <ImageDoc image={getItem(5)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-2">
              Applying a power function such as <InlineMath math="f(z) = z^2" />{" "}
              to scattered Cartesian dots. The squaring map doubles angles and
              squares magnitudes, causing the dot cloud to wrap around the
              origin. Points near the unit circle remain relatively stable while
              those far away are flung outward.
            </p>
          </AutoAdjustingSection>

          {/* Cartesian Grid mapping */}
          <AutoAdjustingSection
            title="Cartesian Grid — Reciprocal Mapping"
            imagePosition="right"
            mediaContent={
              getItem(6) && <ImageDoc image={getItem(6)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-2">
              A Cartesian grid transformed by a reciprocal-type mapping such as{" "}
              <InlineMath math="f(z) = 1/z" />. The inversion maps the interior
              of the unit circle to the exterior and vice versa. Horizontal and
              vertical grid lines are mapped to families of circles passing
              through the origin.
            </p>
          </AutoAdjustingSection>

          {/* Weird function on Cartesian Grid */}
          <AutoAdjustingSection
            title="Cartesian Grid — Combination Function"
            imagePosition="left"
            mediaContent={
              getItem(7) && <ImageDoc image={getItem(7)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-2">
              A more exotic transformation such as{" "}
              <InlineMath math="f(z) = 1/z^2 + 5z" /> applied to the Cartesian
              grid. The interplay between the singular term{" "}
              <InlineMath math="1/z^2" /> and the linear term{" "}
              <InlineMath math="5z" /> creates intricate swirling patterns with
              a rich mix of expansion, contraction, and rotation in different
              regions of the plane.
            </p>
          </AutoAdjustingSection>

          {/* Polar Dots mapping & result */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Polar Dots — Domain
              </h2>
              {getItem(8) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(8)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify">
                The initial distribution of dots in polar colouring, with colour
                proportional to <InlineMath math="|z|" />. Inner dots appear in
                one hue while outer dots transition to another, creating a clear
                radial gradient.
              </p>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Polar Dots — Image
              </h2>
              {getItem(9) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(9)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify">
                After the transformation, the radial colour gradient is
                redistributed. Under an inversion like{" "}
                <InlineMath math="f(z) = 1/z" />, formerly outer (far) dots now
                cluster near the origin and vice versa, visually inverting the
                colour pattern.
              </p>
            </FloatingSection>
          </div>

          {/* Polar Lines mapping & result */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Polar Lines — Domain
              </h2>
              {getItem(10) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(10)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify">
                The polar grid before transformation: concentric circles and
                equally spaced radial lines. The magnitude-based colouring shows
                a smooth gradient from the centre outward.
              </p>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Polar Lines — Image
              </h2>
              {getItem(11) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(11)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify">
                After the transformation, the circles and rays have been warped
                into new curve families. A power map like{" "}
                <InlineMath math="z^3" /> triples the angular spacing of rays
                and cubes the radial distances, creating a visually striking
                pattern.
              </p>
            </FloatingSection>
          </div>

          {/* ─── Topic: Additional Examples ─── */}
          <Topic topicName="Additional Examples" />

          <FloatingSection>
            <p className="text-justify mb-4">
              The following videos demonstrate additional transformations on
              Cartesian dot grids with varied functions, showcasing the range of
              geometric effects achievable with different complex mappings.
            </p>
          </FloatingSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                <InlineMath math="f(z) = z^{5.35}" />
              </h2>
              {getItem(16) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(16)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify flex-1">
                A fractional power map produces a complex multi-sheeted
                structure. The non-integer exponent creates overlapping folds as
                points wrap around the origin more than once.
              </p>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                <InlineMath math="f(z) = (z+1)^{-2}" />
              </h2>
              {getItem(17) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(17)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify flex-1">
                A shifted reciprocal squared map. The pole at{" "}
                <InlineMath math="z = -1" /> creates a singularity that pulls
                nearby points to infinity while distant points collapse toward
                the origin.
              </p>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                <InlineMath math="f(z) = 3z^3" />
              </h2>
              {getItem(18) && (
                <div className="mb-3 flex justify-center">
                  <VideoDock video={getItem(18)!} onOpen={handleOpen} />
                </div>
              )}
              <p className="text-justify flex-1">
                A scaled cubic map triples arguments and cubes magnitudes,
                amplified by a factor of 3. The three-fold symmetry is clearly
                visible as the dot cloud wraps around the origin three times.
              </p>
            </FloatingSection>
          </div>

          {/* ─── Topic: Technology Stack ─── */}
          <Topic topicName="Technology Stack" />

          <FloatingSection>
            <div className="space-y-4">
              <p className="text-justify">
                This project was built using <strong>Processing</strong>{" "}
                (Java-based creative coding framework), leveraging its real-time
                rendering pipeline for smooth animations of thousands of points.
                A custom{" "}
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">
                  Complex
                </code>{" "}
                class implements arithmetic operations (addition, subtraction,
                multiplication, power, reciprocal, polar conversion) used to
                evaluate transformations at each point.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Processing",
                  "Java",
                  "Complex Analysis",
                  "Real-time Rendering",
                  "Interactive Visualization",
                  "Color Mapping",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300 dark:border-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FloatingSection>

          {/* ─── Gallery at bottom — hidden on 2xl ─── */}
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

export default Project_ComplexMapping;
