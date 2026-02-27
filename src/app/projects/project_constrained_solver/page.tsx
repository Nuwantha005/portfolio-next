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

function Project_ConstrainedSolver() {
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
      fetch("/projects/project_constrained_solver/files.json")
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
        <ProjectTitleBar title="Constrained Parametric Curve Solver" />
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
                    In CAD-based turbomachinery design, blade profiles are
                    defined by <strong>parametric curves</strong> (Bézier and
                    B-Spline) whose control points the designer drags
                    interactively. Geometric constraints — tangency to circles,
                    lines, or other curves — must be maintained in{" "}
                    <strong>real time</strong> as the user edits the shape,
                    giving immediate visual feedback without manual re-solving.
                  </p>
                  <p className="mb-4">
                    This project developed a{" "}
                    <strong>dual-solver algorithm</strong> that combines a novel
                    linear matrix formulation with a nonlinear fallback
                    optimizer. The linear solver uses minimum-norm control-point
                    displacement to guarantee smooth transitions, while the
                    nonlinear solver (SLSQP) handles over-constrained or
                    degenerate cases that produce singular matrices.
                  </p>
                  <p>
                    The formulation was published at the{" "}
                    <strong>
                      Mechanical Engineering Research Symposium (MERS) 2025
                    </strong>{" "}
                    and received the <strong>Best Poster Award</strong>. The
                    production C++ implementation was integrated into a
                    commercial turbomachinery design tool.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  {items.length > 0 && (
                    <motion.img
                      layoutId="Constrained Parametric Curve Solver_img"
                      style={{
                        cursor: "pointer",
                        border: "4px solid gray",
                        borderRadius: "8px",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={() => handleOpen(7)}
                      src="/Images/Projects/Constrained_Solver_Thumbnail.jpeg"
                      alt="Constrained curve solver demo"
                      className="border-gray-800 dark:border-gray-200"
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            {/* The Problem */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                The Problem
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  Blade section editors in turbomachinery software let designers
                  shape airfoil cross-sections using control points. These
                  curves must satisfy geometric constraints — for example, a
                  leading-edge curve must be tangent to both the pressure-side
                  and suction-side curves as well as the stream-surface
                  boundary. Moving any control point should{" "}
                  <strong>automatically reposition</strong> the remaining points
                  so that all constraints stay satisfied.
                </p>
                <p>
                  Two concrete use cases drove the work: <strong>(1)</strong> a
                  diffuser airfoil editor where B-Spline curves must remain
                  tangent to three circles (LE, TE, and thickness), and{" "}
                  <strong>(2)</strong> a generic blade section editor where
                  Bézier curves must be tangent to boundary lines and adjacent
                  curves at their endpoints.
                </p>
              </div>
            </FloatingSection>

            <Topic topicName="Initial Approach: Nonlinear Solver" />

            {/* Nonlinear approach for circles */}
            <AutoAdjustingSection
              title="Circle Tangency via Nonlinear Optimization"
              imagePosition="left"
              mediaContent={
                getItem(0) && (
                  <ImageDoc image={getItem(0)!} onOpen={handleOpen} />
                )
              }
            >
              <p className="mb-4">
                The first approach modeled the tangency constraints as a system
                of nonlinear equations. For a curve tangent to a circle, two
                conditions must hold simultaneously: the curve must{" "}
                <strong>pass through</strong> a point on the circle, and its
                tangent vector at that point must be{" "}
                <strong>perpendicular to the radius</strong>. With both the
                contact parameter and control-point positions as unknowns, this
                forms a nonlinear system.
              </p>
              <p>
                A Python prototype using SciPy&apos;s gradient-free solver
                validated the concept for Bézier curves tangent to three
                circles. The approach was then generalized from 4 to arbitrary
                numbers of control points, and extended to B-Splines.
              </p>
            </AutoAdjustingSection>

            {/* Generalized + BSpline — side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Generalized Algorithm (6+ Points)
                </h2>
                {getItem(1) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(1)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The initial solver only handled 4 control points. A
                    generalized version was built that works with any number of
                    control points — essential for higher-degree curves that
                    need more degrees of freedom.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  B-Spline Extension
                </h2>
                {getItem(2) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    After Bézier validation, the algorithm was extended to
                    B-Splines which use different basis functions and require a
                    knot vector. This was needed for the diffuser airfoil editor
                    where B-Splines define the profile.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* Problem with nonlinear */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Why a Nonlinear Solver Alone Isn&apos;t Enough
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  While the nonlinear optimizer found valid solutions, it had
                  critical drawbacks for interactive use: control points would{" "}
                  <strong>jump unpredictably</strong> between iterations, the
                  solver would sometimes <strong>diverge</strong> or take too
                  long for real-time feedback, and it offered no guarantee of{" "}
                  <strong>minimal displacement</strong> — meaning the curve
                  could change shape drastically even when a subtle adjustment
                  would suffice.
                </p>
                <p>
                  For interactive operation where the solver runs on every mouse
                  drag event, these issues made the pure nonlinear approach
                  unsuitable. A fundamentally different formulation was needed.
                </p>
              </div>
            </FloatingSection>

            <Topic topicName="Linear Solver: Minimum-Norm Formulation" />

            {/* Line tangency + Key innovations: Side-by-side on desktop — adjust ratio in lg:grid-cols-[Xfr_Yfr] */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Blade Section Line Tangency
                </h2>
                {getItem(3) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The generic blade section editor required curves to be
                    tangent to boundary lines and adjacent curves. This
                    motivated a reformulation: instead of solving for absolute
                    control-point positions, the algorithm solves for{" "}
                    <strong>control-point displacements</strong> — the minimal
                    movement needed to satisfy all constraints from the current
                    configuration.
                  </p>
                  <p>
                    Expressing the problem in terms of displacements transforms
                    it into a linear system, solvable via a{" "}
                    <strong>minimum-norm solution</strong> that minimizes the
                    total control-point movement. This guarantees smooth,
                    predictable transitions during interactive editing.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Key Innovations
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    <strong>
                      Directional tangency via cross-product constraint:
                    </strong>{" "}
                    Traditional tangent matching requires specifying a full
                    tangent vector (direction + magnitude), consuming 2 DOF. By
                    enforcing only the <em>direction</em> — via a cross-product
                    that must equal zero — only 1 DOF is consumed. This was
                    critical for avoiding over-constrained systems with few
                    control points. The derivation uses a 2D rotation matrix to
                    convert the cross-product into a linear dot-product form.
                  </p>
                  <p>
                    <strong>Start/end tangency as parametric lines:</strong>{" "}
                    Rather than treating the second control point as an
                    independent variable, it is re-parameterized as a point on a
                    line through the first control point in the tangent
                    direction. This introduces a scalar parameter instead of a
                    2D point, reducing the unknowns while maintaining the
                    constraint structure as a linear system.
                  </p>
                  <p>
                    <strong>
                      Iterative displacement for non-intersecting cases:
                    </strong>{" "}
                    When the curve doesn&apos;t yet intersect the target
                    geometry, the algorithm samples candidate displacements and
                    selects the one with minimum magnitude — then iterates until
                    the constraint is met within tolerance. This bootstrapping
                    step feeds the linear solver with the displacement vector it
                    requires.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* Displacement finding — side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Displacement: No Intersection
                </h2>
                {getItem(4) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(4)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    When the curve doesn&apos;t intersect the target line, the
                    algorithm samples points along the line, computes the
                    displacement from each sample to the nearest curve point,
                    and picks the minimum-displacement pair as the constraint
                    input for the linear solver.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Displacement: With Intersection
                </h2>
                {getItem(5) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(5)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    When the curve already crosses the target, the algorithm
                    identifies the longest overshoot on the wrong side and
                    displaces that point back. This ensures convergence from
                    both initial conditions — whether the curve starts inside or
                    outside the constraint region.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <Topic topicName="Dual-Solver Architecture" />

            {/* Dual-solver subsections: Side-by-side on desktop — adjust ratio in lg:grid-cols-[Xfr_Yfr] */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Combining Linear and Nonlinear Solvers
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The linear minimum-norm solver handles most interactive
                    cases efficiently, but two situations require falling back
                    to the nonlinear solver:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>
                      <strong>Over-constrained systems:</strong> With only 4
                      control points and multiple tangency constraints, the
                      linear coefficient matrix becomes singular. The nonlinear
                      SLSQP optimizer can still find approximate solutions by
                      treating the constraints as optimization targets.
                    </li>
                    <li>
                      <strong>Circle tangency:</strong> Point-on-circle and
                      tangent-to-circle constraints are inherently nonlinear
                      (they involve squared radius terms). These are handled via
                      equality constraints in the SLSQP formulation.
                    </li>
                  </ul>
                  <p>
                    The architecture tries the linear solver first. If the
                    coefficient matrix is singular or the error after solving
                    exceeds tolerance, it automatically falls back to the
                    nonlinear path. Both solvers share the same constraint
                    specification API, making the fallback transparent.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Nonlinear Solver: SLSQP
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The nonlinear path reformulates the problem as a constrained
                    optimization:{" "}
                    <strong>minimize total control-point displacement</strong>{" "}
                    (or optionally control-polygon length for simpler shapes)
                    subject to all geometric constraints as equality
                    constraints.
                  </p>
                  <p>
                    Bounding boxes prevent the optimizer from exploring
                    unreasonable regions of the solution space, and the initial
                    guess is always the current control-point configuration —
                    ensuring solutions stay close to the user&apos;s intent. The
                    SLSQP algorithm (Sequential Least-Squares Quadratic
                    Programming) was selected after testing several alternatives
                    for its balance of speed and robustness on these small,
                    dense problems.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <Topic topicName="Implementation" />

            {/* Software architecture */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Software Architecture
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The solver is implemented as a single C++ class (~3,100 lines)
                  supporting Bézier, B-Spline, and NURBS curve types. The class
                  exposes a clean constraint-specification API: callers add
                  start/end tangency vectors, tangent-to-line, or
                  tangent-to-circle constraints, then call{" "}
                  <code>InitSolver()</code> for the initial solve and{" "}
                  <code>reCalculateControlPoints()</code> on each interactive
                  update.
                </p>
                <p>
                  Internally, the linear path constructs the coefficient matrix
                  using <strong>Eigen</strong> for dense linear algebra —
                  including Kronecker products, minimum-norm solutions via
                  pseudoinverse, and column extraction for re-parameterized
                  variables. The nonlinear path uses{" "}
                  <strong>NLopt&apos;s SLSQP</strong> implementation with
                  C-style callback wrappers and templated constraint/objective
                  functions for type flexibility.
                </p>
                <p>
                  Key computational patterns include DOF analysis before solver
                  selection, adaptive gradient vector updates when the user
                  drags a specific control point, and post-solve validation that
                  measures constraint error to decide whether to accept the
                  result or retry with the fallback solver.
                </p>
              </div>
            </FloatingSection>

            {/* Python prototype + Demo — side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Python Blade Section Editor
                </h2>
                {getItem(6) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(6)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    All formulations were prototyped in Python first — SciPy for
                    the nonlinear solver and NumPy for the matrix operations. An
                    interactive blade section editor was built to validate
                    real-time constraint maintenance during drag operations.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Two-Curve Constraint Demo
                </h2>
                {getItem(7) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(7)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The final Python demo shows two curve segments with tangency
                    constraints to circles, lines, and each other — validating
                    that the combined solver handles the full set of constraints
                    needed for production blade editing.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <Topic topicName="Publication" />

            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                MERS 2025 — Best Poster Award
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The linear formulation — specifically the directional tangency
                  constraint derivation and the start/end tangency
                  re-parameterization — was written up as a conference paper
                  titled{" "}
                  <em>
                    &quot;Linear Matrix Formulation for Directional Tangency
                    Constraints in Parametric Curve Design&quot;
                  </em>{" "}
                  and presented at the{" "}
                  <strong>
                    Mechanical Engineering Research Symposium (MERS) 2025
                  </strong>{" "}
                  at the University of Moratuwa. The paper received the{" "}
                  <strong>Best Poster Award</strong>.
                </p>
                <p>
                  The paper presents the mathematical framework in full detail;
                  a separate page with the complete derivation is planned. The
                  key contribution is showing that directional tangency — a
                  constraint that traditionally requires nonlinear solving — can
                  be expressed as a single linear row in the coefficient matrix
                  using a 2D rotation matrix and cross-product identity.
                </p>
              </div>
            </FloatingSection>

            <Topic topicName="Technologies" />

            <FloatingSection>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "C++",
                    desc: "Production implementation (~3,100 LOC)",
                  },
                  { name: "Eigen", desc: "Dense linear algebra & matrix ops" },
                  {
                    name: "NLopt (SLSQP)",
                    desc: "Nonlinear constrained optimization",
                  },
                  { name: "Python", desc: "Rapid prototyping & validation" },
                  {
                    name: "NumPy / SciPy",
                    desc: "Matrix ops & nonlinear solving",
                  },
                  {
                    name: "Qt Framework",
                    desc: "UI integration for blade editors",
                  },
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
              <LGComponent ref={lgRef} items={items} />
            </FloatingSection>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Project_ConstrainedSolver;
