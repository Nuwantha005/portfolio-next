"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
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

function Project_MeridionalSolver() {
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
      fetch("/projects/project_meridional_solver/files.json")
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
        <ProjectTitleBar title="Meridional Flow Solver" />
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
            {/* ───────────── Hero / Overview ───────────── */}
            <FloatingSection>
              <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Overview
              </h1>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    Turbomachinery preliminary design demands{" "}
                    <strong>instant feedback</strong> on thermodynamic and flow
                    distributions — velocity, pressure, temperature and density
                    — across the meridional plane and blade surfaces. A full CFD
                    solve is far too expensive at this stage, so a lighter
                    method is needed.
                  </p>
                  <p className="mb-4">
                    This project implements a{" "}
                    <strong>quasi-3D streamline-curvature solver</strong> based
                    on the method described by Katsanis (1966) for arbitrary
                    quasi-orthogonal (QO) lines. The algorithm was first
                    prototyped in Python for rapid iteration, then rewritten
                    from scratch in C++ for production integration with the host
                    CAE platform.
                  </p>
                  <p>
                    The production solver achieves{" "}
                    <strong>sub-second solve times</strong> for dozens of
                    iterations, validated against an existing hub-to-shroud
                    solver and CFD results. It was accepted as a beta feature
                    and merged into the main codebase.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  {items.length > 0 && (
                    <motion.img
                      layoutId="Meridional Flow Solver_img"
                      style={{
                        cursor: "pointer",
                        border: "4px solid gray",
                        borderRadius: "8px",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={() => handleOpen(2)}
                      src="/Images/Projects/Meridional_Solver_Thumbnail.jpeg"
                      alt="Meridional solver results — flow-field contour output"
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            {/* ───────────── Research & Reference ───────────── */}
            <Topic topicName="Research Foundation" />

            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Katsanis (1966) — Arbitrary Quasi-Orthogonals
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The solver is based on the NASA paper{" "}
                  <em>
                    &ldquo;Use of Arbitrary Quasi-Orthogonals for Calculating
                    Flow Distribution in a Turbomachine&rdquo;
                  </em>{" "}
                  by T.&nbsp;Katsanis (1966). It presents a streamline-curvature
                  method that solves the velocity-gradient equation along
                  user-defined QO lines spanning from hub to shroud, iteratively
                  repositioning streamlines until mass-flow balance is achieved.
                </p>
                <p>
                  The original paper included <strong>Fortran IV</strong> source
                  code and a sample test case that converged in 2–3 minutes on
                  1960s hardware — confirming the algorithm was computationally
                  inexpensive enough to run in the millisecond range on modern
                  machines. I was able to read and follow the Fortran code
                  (barely), and several critical convergence safeguards and
                  edge-case treatments were extracted directly from it.
                </p>
              </div>
            </FloatingSection>

            {/* ───────────── Python Prototype ───────────── */}
            <Topic topicName="Python Prototype" />

            <AutoAdjustingSection
              title="Rapid Algorithm Prototyping"
              imagePosition="right"
              mediaContent={
                getItem(0) && (
                  <ImageDoc image={getItem(0)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                Development began with a Python prototype that allowed fast
                iteration on the solver logic and immediate visual feedback via
                Matplotlib. The prototype built machine/segment models from hub
                and shroud Bézier curves, initialized QO lines and streamlines,
                ran the iterative solver loop, and plotted results as line
                charts.
              </p>
              <p className="mb-4">
                A key challenge was evaluating blade angle derivatives (
                <InlineMath math="\partial\theta/\partial z" />,{" "}
                <InlineMath math="\partial\theta/\partial r" />) and tangential
                thickness <InlineMath math="t_n" />
                — these depend on blade-generation methods internal to the host
                platform. As a workaround, data was exported from the platform
                for a grid of <InlineMath math="(r, z)" /> values and polynomial
                regression was used to fit surfaces for angle and thickness.
              </p>
              <p>
                While the Python solver worked, it had{" "}
                <strong>convergence issues</strong> and was too slow for
                production use. Connecting it to the C++ host would also incur
                significant data-transfer overhead. This motivated a full
                rewrite in C++.
              </p>
            </AutoAdjustingSection>

            {/* ───────────── C++ Implementation ───────────── */}
            <Topic topicName="C++ Production Implementation" />

            {/* Solver core + blade data: Side-by-side — adjust ratio in lg:grid-cols-[Xfr_Yfr] */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Solver Engine
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The C++ rewrite follows the same physical algorithm but is
                    structured for production robustness. The solver engine
                    manages inlet/fluid initialization, geometry ingestion from
                    host-platform objects, QO-line and streamline setup, the
                    main iterative solve loop (flow population, velocity
                    marching, mass-flow balancing, streamline repositioning,
                    convergence checks), and post-processing for blade-loading
                    output.
                  </p>
                  <p>
                    A critical bug found by examining the original Fortran code
                    was that the hub-velocity prediction — an iterative
                    sub-process that finds the hub velocity giving the correct
                    mass-flow rate at each QO line — had been overlooked and
                    treated as a single-step computation. Implementing the full
                    iterative predictor (derived from a Fortran subroutine in
                    the original code) resolved the convergence issues that
                    plagued the Python prototype.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Blade Data Access
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Instead of the polynomial-regression workaround from Python,
                    the C++ solver extracts blade-angle and thickness{" "}
                    <strong>surfaces</strong> directly from the host
                    platform&apos;s blade-row objects. For any{" "}
                    <InlineMath math="(z, r)" /> query, a line parallel to the
                    axis intersects the surface to yield the required angle
                    value; surface iso-curve tangents give the partial
                    derivatives via linear algebra.
                  </p>
                  <p>
                    Direct surface intersection was accurate but slow. A{" "}
                    <strong>1D cubic-spline interpolation</strong> strategy
                    exploits the fact that QO lines are fixed: before the main
                    loop, blade data is sampled along each QO line and
                    approximated with cubic splines. Inside the solve loop, fast
                    1D lookups replace expensive 3D surface intersections —
                    dramatically reducing per-iteration cost.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ───────────── Performance ───────────── */}
            <Topic topicName="Performance Engineering" />

            {/* SOA + OpenMP: Side-by-side — adjust ratio in lg:grid-cols-[Xfr_Yfr] */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Structure-of-Arrays (SOA) Data Model
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The solver maintains ~50 flow variables (pressure,
                    temperature, density, velocity components, blade angles,
                    curvature, etc.) at every grid point — each streamline ×
                    QO-line intersection. Originally stored as a 2D array of
                    structs (AOS), field access required two pointer
                    indirections: outer vector → inner vector → struct → field.
                  </p>
                  <p>
                    Switching to a <strong>structure-of-arrays</strong> layout —
                    where each variable is stored in a contiguous 1D{" "}
                    <code>std::vector</code> indexed by{" "}
                    <code>row * cols + col</code> — dramatically improved
                    performance. Access becomes struct → vector → data, and
                    sequential sweeps over a single variable (the dominant
                    pattern in the solver loop) hit L1/L2 cache almost every
                    time.
                  </p>
                  <p>
                    The SOA container uses{" "}
                    <strong>C++ template metaprogramming</strong> with
                    tag-dispatched type descriptors: each flow variable is a
                    unique type, and compile-time index resolution via{" "}
                    <code>std::tuple</code> and fold expressions eliminates all
                    runtime lookup overhead. Direct data pointers are also
                    exposed for potential SIMD use.
                  </p>
                  <p>
                    This single change — AOS → SOA — brought the solver to{" "}
                    <strong>sub-second total solve time</strong> for dozens of
                    iterations on typical machine geometries (10–20 streamlines
                    × 10–30 QO lines).
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  OpenMP: A Lesson in Overhead
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    With the sequential solver already running under a second,
                    OpenMP parallel directives were tested to see if further
                    speedup was possible. The result was{" "}
                    <strong>slower execution</strong> — the thread-creation and
                    synchronization overhead from{" "}
                    <code>#pragma omp parallel</code> exceeded the computation
                    time of each loop body.
                  </p>
                  <p>
                    The grid sizes in typical preliminary design (hundreds to
                    low thousands of points) are simply too small for the
                    parallelization to amortize the fixed cost of thread
                    management. The lesson: for small, cache-friendly workloads,
                    a tight sequential loop with good data locality beats
                    multi-threading.
                  </p>
                  <p>
                    OpenMP remains available as a build option for unusually
                    large meshes, but the default path stays single-threaded.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ───────────── Geometry & Curves ───────────── */}
            <Topic topicName="Geometry Layer" />

            <AutoAdjustingSection
              title="Meridional Plane Curves"
              imagePosition="left"
              mediaContent={
                getItem(1) && (
                  <ImageDoc image={getItem(1)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                The solver operates on a 2D grid defined by the intersection of
                streamlines and QO lines in the meridional plane. Hub and shroud
                boundaries are represented as <strong>Bézier curves</strong>{" "}
                built from control points extracted from the host
                platform&apos;s flow-path geometry.
              </p>
              <p className="mb-4">
                Streamlines are interpolated as <strong>B-spline curves</strong>{" "}
                through their grid points using OpenCASCADE&apos;s interpolation
                API. Geometric queries — arc-length parameterization, curvature,
                slope, and QO-line intersection — are performed via the OCC
                adaptor layer, wrapped in a custom curve class hierarchy.
              </p>
              <p>
                QO lines are straight segments from hub to shroud, and the
                solver repositions streamlines by adjusting each
                streamline&apos;s parameter along every QO line until equal
                mass-flow is carried between adjacent streamlines.
              </p>
            </AutoAdjustingSection>

            {/* ───────────── UI ───────────── */}
            <Topic topicName="Interactive Output" />

            {/* UI + Results: Side-by-side — adjust ratio in lg:grid-cols-[Xfr_Yfr] */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Qt/VTK Task Window
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The solver is exposed through a dedicated{" "}
                    <strong>Qt task window</strong> with three visualization
                    panels:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>
                      <strong>Streamline geometry plot:</strong> displays the
                      converged streamlines and QO lines forming the
                      computational grid.
                    </li>
                    <li>
                      <strong>QO-line data plot:</strong> shows any selected
                      thermodynamic variable along a chosen QO line (hub →
                      shroud).
                    </li>
                    <li>
                      <strong>2D contour plot:</strong> a VTK-rendered
                      colour-mapped visualization of any flow variable across
                      the entire meridional plane, using Delaunay triangulation
                      of the grid points.
                    </li>
                  </ul>
                  <p>
                    Additional controls let the user select which stage and
                    segment to analyze, configure solver parameters (iteration
                    limits, relaxation, tolerances), choose between
                    interpolation or direct blade-data evaluation, and select
                    the inlet-condition side.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Validation & Results
                </h2>
                {getItem(2) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The solver was cross-compared against the existing
                    hub-to-shroud (H2S) solver and full CFD results across
                    multiple test cases. When accuracy was deemed acceptable for
                    the <strong>massive time advantage</strong> it provides
                    (sub-second vs. minutes), it was merged as a beta feature.
                  </p>
                  <p>
                    Comprehensive documentation was prepared alongside the
                    submission to the central repository, covering the algorithm
                    theory, API usage, solver settings, and limitations.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ───────────── Software Architecture ───────────── */}
            <Topic topicName="Software Architecture" />

            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Module Structure
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The production codebase is organized into focused modules that
                  mirror the solver&apos;s logical stages. The details of the
                  implementation are proprietary, but the high-level
                  architecture can be summarized:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>Solver engine</strong> — orchestrates the full
                    pipeline: settings, initialization, main solve loop,
                    blade-loading, and post-processing. Exposes a clean public
                    API for the task-window layer.
                  </li>
                  <li>
                    <strong>Data model</strong> — the template metaprogramming
                    SOA container holding ~50 flow variables with compile-time
                    typed access. Also defines all data extraction enums and
                    structures.
                  </li>
                  <li>
                    <strong>Curve layer</strong> — OCC-based hierarchy for
                    Bézier/B-spline flow-path curves, streamlines, QO lines, and
                    a custom cubic-spline interpolator.
                  </li>
                  <li>
                    <strong>Numerical utilities</strong> — differentiation,
                    integration, interpolation helpers, and a Fortran-derived
                    iterative velocity predictor.
                  </li>
                  <li>
                    <strong>Contour widget</strong> — VTK-based 2D contour
                    visualization with configurable colour maps, contour levels,
                    and interactive settings.
                  </li>
                  <li>
                    <strong>Task window</strong> — Qt integration layer
                    connecting the solver to the platform&apos;s workflow,
                    handling stage/segment selection, inlet-condition import,
                    and all three plot panels.
                  </li>
                </ul>
              </div>
            </FloatingSection>

            {/* ───────────── Technologies ───────────── */}
            <Topic topicName="Technologies" />

            <FloatingSection>
              <div className="flex flex-wrap gap-2">
                {[
                  "C++",
                  "Python",
                  "Fortran IV (reference)",
                  "Template Metaprogramming",
                  "OpenCASCADE",
                  "Qt Framework",
                  "VTK",
                  "Matplotlib",
                  "Streamline-Curvature Method",
                  "Cubic Spline Interpolation",
                  "SOA Data Layout",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-primary text-xs sm:text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </FloatingSection>

            {/* ───────────── Gallery ───────────── */}
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

export default Project_MeridionalSolver;
