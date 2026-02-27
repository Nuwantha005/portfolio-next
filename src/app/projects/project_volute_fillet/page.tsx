"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";
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

function Project_VoluteFillet() {
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
      fetch("/projects/project_volute_fillet/files.json")
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
        <ProjectTitleBar title="Parametric Volute Tongue Fillet" />
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
            {/* Hero Section */}
            <FloatingSection>
              <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Overview
              </h1>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    In centrifugal turbomachinery, the <strong>volute</strong>{" "}
                    is a spiral-shaped casing that collects high-velocity fluid
                    exiting the impeller and converts it into high-pressure,
                    low-velocity flow directed toward the outlet. The{" "}
                    <strong>volute tongue</strong> (or cutoff splitter) is the
                    sharp junction where the spiral scroll geometry meets the
                    straight exit pipe.
                  </p>
                  <p className="mb-4">
                    This sharp junction causes flow separation and creates
                    difficulties for CFD meshing and FEA simulations. A smooth,
                    tangent fillet surface at this junction significantly
                    improves simulation quality and represents realistic
                    manufacturing geometry.
                  </p>
                  <p>
                    This project developed a{" "}
                    <strong>parametric fillet generation algorithm</strong> that
                    creates smooth, tangent fillet surfaces using Coons patches
                    with constrained filling. The algorithm was implemented in
                    C++ using the OpenCascade CAD kernel and integrated into a
                    commercial turbomachinery design suite as a beta feature.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  {items.length > 0 && (
                    <motion.img
                      layoutId="Parametric Volute Tongue Fillet_img"
                      style={{
                        cursor: "pointer",
                        border: "4px solid gray",
                        borderRadius: "8px",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={() => handleOpen(15)}
                      src="/Images/Projects/Volute_Fillet_Thumbnail.jpeg"
                      alt="Volute tongue fillet before and after"
                      className="border-gray-800 dark:border-gray-200"
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            {/* Context */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                What is a Volute?
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  A volute consists of several geometric parts: the{" "}
                  <strong>scroll</strong> (spiral casing), the{" "}
                  <strong>exit pipe</strong> (which can be straight or curved),{" "}
                  <strong>inlet and exit faces</strong>, and the{" "}
                  <strong>tongue</strong>. The tongue geometry can be configured
                  with various cross-section types — elliptic, Bézier,
                  rectangular, twin Bézier, and more — each offering different
                  flow characteristics.
                </p>
                <p>
                  The challenge was to develop a third tongue option:{" "}
                  <strong>fillet</strong>. Unlike the existing &quot;sharp&quot;
                  and &quot;general&quot; options, a fillet creates a truly
                  smooth, tangent transition surface between the scroll and exit
                  pipe — matching what other commercial software can produce.
                </p>
              </div>
            </FloatingSection>

            <Topic topicName="Methods Explored" />

            {/* Methods 1 & 2: Side-by-side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  1) Tangent Curve Loft
                </h2>
                {getItem(1) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(1)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The first approach involved extracting the intersection
                    curve between the scroll and exit pipe, then generating
                    tangent curves at multiple cross-sections along this
                    intersection. Each tangent curve was constructed by
                    projecting points onto both surfaces and interpolating
                    through them.
                  </p>
                  <p>
                    Lofting through these tangent curves produced an
                    approximately tangent surface. However, the boundary curves
                    varied unpredictably, resulting in rough edges that
                    didn&apos;t meet quality requirements for CAD export.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  2) Scaling Method
                </h2>
                {getItem(2) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The second approach identified fillet boundaries by scaling
                    geometry. The exit pipe was scaled to find its intersection
                    with the scroll (and vice versa), creating two smooth
                    boundary curves. A lofting operation through the lower
                    boundary, intersection wire, and upper boundary produced the
                    fillet surface.
                  </p>
                  <p>
                    This method was developed in parallel as a fallback and
                    produced valid CAD geometry that passed SolidWorks import
                    diagnostics and could be meshed successfully. However, the
                    fillet lacked the true tangent continuity of a traditional
                    fillet.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* Method 3: Full-width */}
            <AutoAdjustingSection
              title="3) Combined Method"
              imagePosition="left"
              mediaContent={
                getItem(3) && (
                  <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                This method combined the best of both approaches: boundary
                identification from the scaling method with tangent curve
                generation from the loft method. Instead of projecting onto an
                offset curve, points on the scaling-derived boundaries were used
                directly to create tangent curves.
              </p>
              <p>
                The result was a much better-looking fillet with smooth
                boundaries. However, it still lacked a proper corner fillet —
                the region where the fillet wraps around the end of the tongue.
                Existing operations like lofting and revolving couldn&apos;t
                address this, leading to the discovery of constrained filling
                methods.
              </p>
            </AutoAdjustingSection>

            <Topic topicName="Final Approach: Constrained Filling" />

            {/* Coons Patch Theory */}
            <AutoAdjustingSection
              title="Coons Patches"
              imagePosition="right"
              mediaContent={
                getItem(4) && (
                  <ImageDoc image={getItem(4)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                The final approach used{" "}
                <strong>OpenCascade&apos;s GeomFill_ConstrainedFilling</strong>{" "}
                class, which constructs surfaces using Coons patches. A Coons
                patch takes four boundary curves and generates a smooth surface
                that interpolates between them, with optional tangency
                constraints to ensure the resulting surface is tangent to
                adjacent geometry.
              </p>
              <p>
                Each fillet section was built from 3–4 boundary curves: the top
                and bottom boundaries (with tangency constraints to the scroll
                and exit pipe surfaces) and one or two side boundaries. Previous
                fillet sections were used as tangent surfaces for subsequent
                ones, ensuring C2 continuity across the entire fillet.
              </p>
            </AutoAdjustingSection>

            {/* Boundary Identification */}
            <AutoAdjustingSection
              title="Boundary Identification"
              imagePosition="left"
              mediaContent={
                getItem(5) && (
                  <ImageDoc image={getItem(5)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                To identify fillet boundaries, a scaled intersection pipe was
                used. By intersecting this pipe with both the scroll and exit
                pipe surfaces, clean boundary curves were extracted that define
                where the fillet starts and ends on each surface.
              </p>
              <p>
                These boundary curves were combined with tangent curves to form
                closed wires with 3 or 4 edges — the input required by the
                constrained filling algorithm.
              </p>
            </AutoAdjustingSection>

            {/* Boundary Curves Figure */}
            <AutoAdjustingSection
              title="Fillet Section Construction"
              imagePosition="right"
              mediaContent={
                getItem(6) && (
                  <ImageDoc image={getItem(6)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                The fillet was constructed as multiple sections, each defined by
                boundary curves extracted from the scroll and exit pipe
                geometry. Side fillets use 4-boundary Coons patches with
                tangency on the top and bottom curves. End (corner) fillets
                required special treatment.
              </p>
              <p>
                For the circular arc tangent curves, OpenCascade&apos;s built-in
                analytic geometry solver was used to construct arcs with a
                user-defined radius that are tangent to both the scroll and exit
                pipe section curves — replacing the earlier arbitrary tangent
                curves with a properly parametrized construction.
              </p>
            </AutoAdjustingSection>

            {/* Circular Arc Construction */}
            <AutoAdjustingSection
              title="Circular Arc Tangent Curves"
              imagePosition="left"
              mediaContent={
                getItem(14) && (
                  <ImageDoc image={getItem(14)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                At each cross-section plane, the scroll and exit pipe
                intersection curves lie on the same 2D plane. OpenCascade&apos;s
                analytic solver constructs a circular arc with user-defined
                radius R that is tangent to both curves.
              </p>
              <p>
                The solver naturally produces two solutions; the correct one is
                selected by filtering based on distance from the main
                intersection curve. This approach replaced earlier ad-hoc
                tangent curve generation with a clean, parametrized
                construction.
              </p>
            </AutoAdjustingSection>

            {/* Face Cutting */}
            <AutoAdjustingSection
              title="Surface Cutting & Shell Construction"
              imagePosition="right"
              mediaContent={
                getItem(10) && (
                  <ImageDoc image={getItem(10)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                After building the fillet surfaces, the scroll and exit pipe
                faces were cut along the fillet boundaries to make room for the
                new geometry. This was done using surface cutting rather than
                Boolean operations — a significantly faster approach that avoids
                the tolerance issues common with Boolean operations in CAD
                kernels.
              </p>
              <p>
                All cut faces, unmodified volute faces, and fillet faces were
                then sewn together into a watertight shell and converted to a
                solid. Geometric analysis confirmed the correct topology: one
                shell, one solid — a valid configuration for simulation.
              </p>
            </AutoAdjustingSection>

            <Topic topicName="Debugging & Challenges" />

            {/* Debugging sections: Side-by-side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Degenerate Corner Fillets
                </h2>
                {getItem(11) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(11)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Coons patches are mathematically defined for surfaces with 4
                    boundaries. When the constrained filling API was given 3
                    boundaries, it collapsed one boundary into a point —
                    creating a <strong>degenerate geometry</strong>. This was
                    visible in ISO curve grid inspections: the corner fillet
                    showed a converging pattern where the fourth boundary
                    collapsed.
                  </p>
                  <p>
                    The solution was to avoid constrained filling for corner
                    fillets entirely, using a regular filling algorithm without
                    tangency constraints instead. Since most fluid flow hits the
                    front of the fillet rather than the corners, this had
                    minimal impact on simulation accuracy.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Self-Intersecting Surfaces
                </h2>
                {getItem(12) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(12)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    For smaller fillet radii, the filling algorithm produced{" "}
                    <strong>self-intersecting surfaces</strong> — the generated
                    surface crossed over itself. ISO curve grid inspection
                    revealed the cause: the default surface degree was too low
                    (degree 3) to faithfully represent the high curvature of the
                    fillet.
                  </p>
                  <p>
                    After testing, degree 8 was found to be the sweet spot.
                    Increasing the surface degree eliminated self-intersections
                    for all tested cases, passing SolidWorks import diagnostics
                    and enabling successful meshing with higher quality than the
                    scaling method fallback.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* Tolerance Issues */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Tolerance & Face Construction
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  A persistent challenge was achieving the required geometric
                  tolerance of 1 × 10⁻⁷ units for sewing faces into a watertight
                  shell. The filled surfaces didn&apos;t follow boundary curves
                  with sufficient precision when using the default face
                  construction method.
                </p>
                <p>
                  The breakthrough was using an alternative face construction
                  approach: instead of letting the face generator use the
                  surface&apos;s natural boundaries, the original boundary
                  curves were explicitly provided alongside the surface. This
                  produced faces with the necessary tolerances that could be
                  sewn together successfully.
                </p>
              </div>
            </FloatingSection>

            <Topic topicName="Software Architecture" />

            {/* Pipeline Overview */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Multi-Stage Build Pipeline
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The fillet builder is implemented as a single C++ class
                  spanning roughly <strong>7,700 lines</strong> with over 100
                  methods, organized around a clear multi-stage pipeline. The{" "}
                  <code>build()</code> entry point orchestrates seven sequential
                  phases:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>
                    <strong>Section analysis</strong> — classify the geometry
                    around the tongue, identify corner vs.&nbsp;mid sections,
                    and validate topological prerequisites
                  </li>
                  <li>
                    <strong>Arc generation</strong> — construct guiding arcs,
                    supporting arcs, connecting arcs, and sub-arcs that define
                    the tangent curves between the scroll and exit pipe
                  </li>
                  <li>
                    <strong>Point assignment</strong> — distribute boundary
                    sample points across fillet sections and their individual
                    fill sub-sections
                  </li>
                  <li>
                    <strong>Boundary generation</strong> — build the four
                    boundary curves for each Coons-style surface patch
                  </li>
                  <li>
                    <strong>Fill boundary preparation</strong> — attach tangency
                    constraints, convert free boundaries to surface-bound
                    constraints, and handle degenerate cases
                  </li>
                  <li>
                    <strong>Constrained filling</strong> — generate the actual
                    B-spline surfaces via degree-8 constrained filling
                  </li>
                  <li>
                    <strong>Face sewing</strong> — cut existing volute faces,
                    construct new faces from the filled surfaces, and sew
                    everything into a watertight shell
                  </li>
                </ol>
                <p>
                  Each phase is self-contained with its own validation, making
                  the system debuggable at any intermediate stage.
                </p>
              </div>
            </FloatingSection>

            {/* Data Model */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Hierarchical Data Model
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The fillet geometry is represented by a three-level hierarchy.
                  At the top level, the tongue is decomposed into{" "}
                  <strong>fillet sections</strong> — logical groups
                  corresponding to distinct regions around the scroll–pipe
                  intersection. Each fillet section contains multiple{" "}
                  <strong>fill sections</strong> — individual surface patches
                  classified into four types: <em>free sections</em> (interior
                  patches with minimal constraints), <em>end sections</em> (at
                  the trailing edge of the fillet), <em>corner sections</em>{" "}
                  (where the scroll wraps around the pipe), and{" "}
                  <em>middle sections</em> (at the front of the tongue). This
                  classification drives which filling strategy is applied to
                  each patch.
                </p>
                <p>
                  Connecting these sections are <strong>fillet arcs</strong> —
                  circular arcs parameterized by a UV coordinate along the
                  intersection, storing the arc geometry, tangent edges,
                  boundary points, and center location. The arc generation
                  itself is a multi-pass process: guiding arcs are built first
                  (using 2D tangent circle solving on the scroll surface), then
                  supporting arcs, then connecting arcs that bridge between
                  fillet sections.
                </p>
              </div>
            </FloatingSection>

            {/* Engineering Decisions */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Key Engineering Decisions
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  <strong>UV-space interpolation over 3D projection:</strong>{" "}
                  The intermediate sample points along boundaries are
                  interpolated in the UV parameter space of the scroll surface
                  rather than projected in 3D. This avoids the ambiguity of 3D
                  projection onto a doubly-curved surface and ensures smooth
                  parametric distributions even near regions of high curvature.
                </p>
                <p>
                  <strong>Adaptive fill section count:</strong> The number of
                  fill sections per fillet section is not fixed — it adapts
                  based on the fillet radius and local geometric complexity.
                  Smaller radii demand finer subdivision to prevent
                  self-intersections, while larger radii can use fewer sections
                  for efficiency.
                </p>
                <p>
                  <strong>Multiple fallback strategies:</strong> The arc
                  generation code implements several fallback paths. If the
                  primary 2D tangent circle solver fails (common near degenerate
                  tongue geometries), the algorithm falls back to projection-
                  based methods, then to simplified arc approximations. This
                  layered approach was essential for achieving the 85%+ success
                  rate across diverse volute configurations.
                </p>
                <p>
                  <strong>Tangency disabled between adjacent sections:</strong>{" "}
                  Early iterations enforced C1 tangency between neighboring fill
                  sections, but this produced meshing artifacts — the surface
                  oscillated to satisfy conflicting tangent constraints. The
                  final implementation uses only positional continuity between
                  sections, with tangency enforced only at the scroll and exit
                  pipe boundaries where it matters for flow simulation.
                </p>
              </div>
            </FloatingSection>

            {/* Integration & Scale */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Integration into Existing Codebase
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The fillet builder was developed to integrate with an existing
                  volute generation system — itself a ~2,000-line class
                  supporting symmetric, asymmetric, and rectangular volutes. The
                  integration required carefully managing the access to the
                  parent volute&apos;s topological entities (faces, edges,
                  wires) and ensuring that the fillet modifications preserved
                  the surrounding geometry.
                </p>
                <p>
                  The cutting and sewing phase was particularly sensitive: the
                  existing scroll and exit pipe faces had to be split precisely
                  along the fillet boundary, with the original faces removed and
                  replaced by the trimmed versions plus the new fillet faces.
                  This involved building intersection curves between the fillet
                  surfaces and the existing geometry, projecting them into the
                  correct parameter spaces, and performing topological
                  operations (splitting wires, constructing new faces from
                  edges) that had to remain consistent with the sewing
                  tolerances.
                </p>
                <p>
                  The final implementation processes a typical fillet in{" "}
                  <strong>1–2 seconds</strong>, including all seven pipeline
                  stages and the final sewing pass. After a team code review, it
                  was merged into the main repository as a beta feature for the
                  product&apos;s next release cycle.
                </p>
              </div>
            </FloatingSection>

            <Topic topicName="Parametrization" />

            {/* Fillet Radius */}
            <AutoAdjustingSection
              title="Fillet Radius"
              imagePosition="left"
              mediaContent={
                getItem(17) && (
                  <ImageDoc image={getItem(17)!} onOpen={handleOpen} />
                )
              }
            >
              <p>
                The primary parameter controlling the fillet shape is the{" "}
                <strong>fillet radius</strong> — the radius of the circular arcs
                used as tangent curves between the scroll and exit pipe. A
                larger radius creates a more gradual, sweeping transition while
                a smaller radius produces a tighter fillet closer to the
                original sharp edge.
              </p>
            </AutoAdjustingSection>

            {/* Intersection Cut Length */}
            <AutoAdjustingSection
              title="Intersection Cut Length"
              imagePosition="right"
              mediaContent={
                getItem(18) && (
                  <ImageDoc image={getItem(18)!} onOpen={handleOpen} />
                )
              }
            >
              <p>
                The second parameter is the{" "}
                <strong>intersection cut percentage</strong> — the amount of the
                scroll–exit pipe intersection that is trimmed away and replaced
                by the fillet. Increasing this parameter extends the fillet
                along the tongue but reduces the effective fillet radius.
                Together, these two parameters give designers precise control
                over the fillet geometry.
              </p>
            </AutoAdjustingSection>

            <Topic topicName="Results" />

            {/* Test Results */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Validation Results
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The algorithm was tested across 20 different volute
                  configurations with varying parametrizations, cross-section
                  types, and exit pipe geometries (including curved pipes). It
                  was also rewritten to support exit pipes with any number of
                  faces — a requirement discovered during testing with complex
                  geometries.
                </p>

                {/* Results Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 dark:border-gray-400 text-sm">
                    <thead>
                      <tr className="bg-slate-300/50 dark:bg-slate-700/50">
                        <th className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-left">
                          Validation Step
                        </th>
                        <th className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center">
                          Success
                        </th>
                        <th className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center">
                          Failure
                        </th>
                        <th className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center">
                          Mixed
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2">
                          Build Volute Successfully
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center font-semibold text-green-600 dark:text-green-400">
                          17
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-red-600 dark:text-red-400">
                          2
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-yellow-600 dark:text-yellow-400">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2">
                          CAD Import (SolidWorks)
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center font-semibold text-green-600 dark:text-green-400">
                          16
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-red-600 dark:text-red-400">
                          3
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-yellow-600 dark:text-yellow-400">
                          1
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2">
                          Building a Solid
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center font-semibold text-green-600 dark:text-green-400">
                          15
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-red-600 dark:text-red-400">
                          2
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-yellow-600 dark:text-yellow-400">
                          3
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2">
                          Meshing (NetGen)
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center font-semibold text-green-600 dark:text-green-400">
                          10
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-red-600 dark:text-red-400">
                          4
                        </td>
                        <td className="border border-gray-600 dark:border-gray-400 px-3 py-2 text-center text-yellow-600 dark:text-yellow-400">
                          4
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  The entire fillet building process takes approximately{" "}
                  <strong>1–2 seconds</strong> on average, despite the
                  complexity of the operations involved. After code review and
                  presentation to the development team, it was merged into the
                  main repository as a beta feature.
                </p>
              </div>
            </FloatingSection>

            {/* Before/After Examples */}
            <AutoAdjustingSection
              title="Test Case: Before and After"
              imagePosition="left"
              mediaContent={
                getItem(15) && (
                  <ImageDoc image={getItem(15)!} onOpen={handleOpen} />
                )
              }
            >
              <p>
                The fillet was tested across a wide variety of volute
                configurations. This example shows a test case with an aspect
                ratio of 1.5, demonstrating the smooth transition from the sharp
                tongue (left) to the filleted tongue (right). The fillet
                maintains tangency to both the scroll and exit pipe surfaces
                while providing a clean, meshable geometry.
              </p>
            </AutoAdjustingSection>

            <AutoAdjustingSection
              title="Curved Exit Pipe Support"
              imagePosition="right"
              mediaContent={
                getItem(16) && (
                  <ImageDoc image={getItem(16)!} onOpen={handleOpen} />
                )
              }
            >
              <p>
                The algorithm was generalized to support curved exit pipes —
                where the pipe follows a curvilinear path rather than a straight
                one. This required handling exit pipes with multiple faces and
                rewriting the fillet builder to support an arbitrary number of
                face–scroll intersections. The image shows a successfully
                filleted volute with a curved exit pipe.
              </p>
            </AutoAdjustingSection>

            <Topic topicName="Technologies" />

            <FloatingSection>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "C++", desc: "Production implementation" },
                  {
                    name: "OpenCascade",
                    desc: "CAD kernel (GeomFill, BRep, Boolean)",
                  },
                  { name: "Qt Framework", desc: "UI integration" },
                  {
                    name: "SolidWorks",
                    desc: "CAD validation & import diagnostics",
                  },
                  { name: "NetGen", desc: "Mesh generation & quality testing" },
                  { name: "Analysis Situs", desc: "Topology inspection" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg px-3 py-2 border border-gray-600 dark:border-gray-400"
                  >
                    <span className="font-semibold">{tech.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {tech.desc}
                    </span>
                  </div>
                ))}
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

export default Project_VoluteFillet;
