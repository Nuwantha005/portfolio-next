"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import "@/app/projects/galleryStyle.css";
import LGComponent, { LGRef } from "@/components/ui/LGComponent";
import ProjectTitleBar from "@/components/ui/ProjectTitleBar";
import Topic from "@/components/ui/Topic";
import Footer from "@/components/footer/Footer";
import ImageDoc from "@/components/ui/ImageDoc";
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

function Project_CFD_Microchannel() {
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
      fetch("/projects/project_cfd_microchannel/files.json")
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
        <ProjectTitleBar title="CFD Study on Micro Channel Heat Sink" />
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
            {/* ─── Hero / Overview ─── */}
            <FloatingSection>
              <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Overview
              </h1>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/2 text-justify">
                  <p className="mb-4">
                    A numerical study on heat transfer and fluid flow
                    characteristics of a{" "}
                    <strong>silicon micro channel heat sink</strong> with{" "}
                    <strong>circular ribs</strong> on the channel walls. The
                    ribs disrupt the thermal boundary layer to enhance
                    convective heat transfer — a critical need as chip power
                    densities push past 500 W in modern AI accelerators and
                    GPUs.
                  </p>
                  <p className="mb-4">
                    The study simulates{" "}
                    <strong>9 Reynolds numbers (100–900)</strong> using ANSYS
                    Fluent with conjugate heat transfer on a 2.3M-cell mesh.
                    Results were validated against published literature for both
                    Nusselt number and friction factor. The geometry was
                    modelled in SolidWorks due to ANSYS SpaceClaim&apos;s
                    inability to handle the micro-scale rib dimensions (25 µm
                    radius).
                  </p>
                  <p>
                    The contour comparison plots were built by{" "}
                    <strong>
                      exporting section plane data from Fluent and stacking them
                      in Matplotlib
                    </strong>{" "}
                    under a unified colour bar — something that cannot be done
                    natively inside ANSYS.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  {items.length > 0 && (
                    <motion.img
                      layoutId="CFD Study on Micro Channel Heat Sink_img"
                      style={{
                        cursor: "pointer",
                        border: "4px solid gray",
                        borderRadius: "8px",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={() => handleOpen(13)}
                      src="/Images/Projects/CFD_Microchannel_Thumbnail.jpeg"
                      alt="Temperature contours across Reynolds numbers"
                      className="border-gray-800 dark:border-gray-200"
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            {/* ─── Topic 1: Geometry & Problem Setup ─── */}
            <Topic topicName="Geometry & Problem Setup" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Micro Channel with Circular Ribs
                </h2>
                {getItem(1) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(1)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The computational domain represents a{" "}
                    <strong>single periodic element</strong> of a heatsink with
                    50 parallel channels. The channel has a rectangular cross
                    section (W = 0.1 mm, H = 0.2 mm) and a length of 20 mm. The
                    solid domain (silicon) surrounds the channel on three sides
                    while the top is modelled as an adiabatic wall.
                  </p>
                  <p>
                    Symmetry boundary conditions on both lateral walls of the
                    solid domain replicate the full heatsink behaviour, reducing
                    the computational cost to a single-channel slice. A constant
                    heat flux of{" "}
                    <InlineMath math="1 \times 10^6 \, \text{W/m}^2" /> is
                    applied to the bottom face.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Rib Arrangement
                </h2>
                {getItem(2) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Circular ribs of <strong>25 µm radius</strong> protrude from
                    the vertical channel walls with a pitch of 0.4 mm. The
                    sector angle (60° for this study) controls how far the rib
                    extends into the flow. These features disrupt the developing
                    boundary layer and introduce local velocity increases that
                    enhance mixing and heat transfer.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Assumptions ─── */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Assumptions & Simplifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    title: "Steady-State",
                    text: "No temporal variation — heatsink operates at thermal equilibrium with constant heat flux and flow rate.",
                  },
                  {
                    title: "Laminar Flow",
                    text: "Reynolds numbers 100–900, well below the critical Re = 2300 for internal flow. Laminar viscous model used.",
                  },
                  {
                    title: "Incompressible",
                    text: "Water as working fluid at low velocities — density treated as constant with no compressibility effects.",
                  },
                  {
                    title: "Constant Properties",
                    text: "Fluid and solid properties evaluated at inlet conditions. Justified by the small temperature rise in the fluid.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400"
                  >
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </FloatingSection>

            {/* ─── Topic 2: Boundary Layer Calculation ─── */}
            <Topic topicName="Boundary Layer Sizing" />
            <FloatingSection className="max-w-[60%] mx-auto">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                First Cell Height from y⁺ Requirement
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The paper requires y⁺ &lt; 1 at the solid-fluid interface. A
                  conservative target of <InlineMath math="y^+ = 0.8" /> was
                  used to derive the first boundary layer cell height
                  analytically.
                </p>
                <p>Starting from the y⁺ definition:</p>
                <div className="flex justify-center my-4">
                  <BlockMath math="y^+ = \frac{y \, u^*}{\nu}" />
                </div>
                <p>
                  Substituting the friction velocity{" "}
                  <InlineMath math="u^* = \sqrt{\tau_w / \rho}" /> and
                  approximating wall shear stress with the Darcy friction factor
                  for laminar flow (
                  <InlineMath math="C_f = 64 / Re" />
                  ), the first cell height simplifies to:
                </p>
                <div className="flex justify-center my-4">
                  <BlockMath math="y = \frac{0.8 \, D_h}{4} \sqrt{\frac{1}{2 \, Re}}" />
                </div>
                <p>
                  where{" "}
                  <InlineMath math="D_h = 2WH / (W + H) = 0.1333 \, \text{mm}" />{" "}
                  is the hydraulic diameter. Using the most restrictive case (Re
                  = 900) gives:
                </p>
                <div className="flex justify-center my-4">
                  <BlockMath math="y_\text{min} = 6.285 \times 10^{-7} \, \text{m} \approx 0.63 \, \mu\text{m}" />
                </div>
                <p>
                  This value was used as the first layer height for all
                  simulations. A separate boundary layer on the solid side with
                  a first height of 1 µm ensures adequate aspect ratio across
                  the interface.
                </p>
              </div>
            </FloatingSection>

            {/* ─── Topic 3: Computational Mesh ─── */}
            <Topic topicName="Computational Mesh" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Cross Section
                </h2>
                {getItem(3) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Cross-sectional view of the 2.3M-cell mesh showing the solid
                    and fluid domains. The fluid region has significantly finer
                    cells to resolve the velocity and thermal boundary layers,
                    while the solid region uses a coarser mesh graded toward the
                    interface.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Boundary Layers at Interface
                </h2>
                {getItem(4) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(4)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Detail of the inflation layers on both sides of the
                    solid-fluid interface. The fluid-side first cell height of
                    0.63 µm satisfies the y⁺ requirement, while the solid-side 1
                    µm first layer maintains reasonable aspect ratios across the
                    boundary.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Near the Circular Ribs
                </h2>
                {getItem(7) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(7)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Horizontal cut through the mesh at the rib locations. The 25
                    µm rib features required substantial local refinement to
                    resolve the flow disruption they create. This was one of the
                    main drivers of the overall cell count.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Surface Mesh at Rib
                </h2>
                {getItem(8) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(8)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Surface mesh on the solid-fluid boundary near a circular
                    rib. The extremely small boundary layer cells around the rib
                    curvature led to challenging mesh quality metrics — minimum
                    orthogonal quality of 0.25 and maximum skewness of 0.75,
                    both near the acceptable limits.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Mesh Quality Table ─── */}
            <FloatingSection className="max-w-[60%] mx-auto">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Mesh Quality Metrics
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600 dark:border-gray-400">
                      <th className="text-left py-2 px-3">Metric</th>
                      <th className="text-left py-2 px-3">Measured</th>
                      <th className="text-left py-2 px-3">Recommended</th>
                      <th className="text-left py-2 px-3">Acceptable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Total cells", "2,295,285", "—", "—"],
                      ["Min element quality", "0.127", "≥ 0.5", "0.1–0.5"],
                      ["Max aspect ratio", "83.2", "< 10 (bulk)", "10–50"],
                      ["Min orthogonal quality", "0.250", "≥ 0.3", "0.1–0.3"],
                      ["Max skewness", "0.750", "< 0.5", "0.5–0.85"],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-600/30 dark:border-gray-400/30"
                      >
                        {row.map((cell, j) => (
                          <td key={j} className="py-2 px-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FloatingSection>

            {/* ─── Topic 4: Simulation Settings ─── */}
            <Topic topicName="Simulation Settings" />
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Numerical Schemes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    name: "Convective Flux",
                    desc: "Second-order upwind — avoids numerical diffusion near ribs without QUICK oscillations",
                  },
                  {
                    name: "Diffusive Flux",
                    desc: "Second-order central differencing — Fluent default for finite volume gradients",
                  },
                  {
                    name: "Viscous Model",
                    desc: "Laminar — Re 100–900, below critical Re = 2300 for internal flow",
                  },
                  {
                    name: "Pressure-Velocity",
                    desc: "SIMPLE — segregated algorithm, lower memory than coupled solver",
                  },
                  {
                    name: "Pressure Interpolation",
                    desc: "Second-order — consistent with other scheme choices",
                  },
                  {
                    name: "Convergence Criteria",
                    desc: "Continuity: 10⁻³, Velocity: 10⁻⁶, Energy: 10⁻⁹",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg px-3 py-2 border border-gray-600 dark:border-gray-400"
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </FloatingSection>

            {/* ─── Topic 5: Grid Independence & Convergence ─── */}
            <Topic topicName="Grid Independence & Convergence" />
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Grid Independence Study
                </h2>
                {getItem(9) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(9)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Eight meshes from 908K to 2.3M cells were tested at Re =
                    100. Both the average Nusselt number and friction factor
                    converge as the cell count increases, with successive
                    variations dropping below 0.2%. The final 2.3M-cell mesh was
                    selected for all subsequent simulations.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Residual Convergence
                </h2>
                {getItem(10) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(10)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Residual plot for the Re = 100 case showing continuity,
                    velocity components, and energy residuals dropping to their
                    prescribed thresholds. Mass flow conservation was also
                    monitored — the inlet-outlet mass flow difference converges
                    to near zero, confirming global conservation.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Topic 6: Output Parameters ─── */}
            <Topic topicName="Output Parameters" />
            <FloatingSection className="max-w-[70%] mx-auto">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Nusselt Number & Friction Factor
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The two key performance metrics were computed from the
                  simulation data:
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 my-4">
                  <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                    <h3 className="font-semibold mb-2">
                      Average Nusselt Number
                    </h3>
                    <div className="flex justify-center my-2">
                      <BlockMath math="\overline{Nu} = \frac{\dot{m} \, C_p \, (\bar{T}_o - \bar{T}_i) \, D_h}{k \, A_c \, (\bar{T}_c - \bar{T}_f)}" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Computed from the energy balance of the fluid using mass
                      average temperatures at inlet/outlet and the area-weighted
                      average temperature of the solid-fluid interface.
                    </p>
                  </div>
                  <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                    <h3 className="font-semibold mb-2">
                      Average Friction Factor
                    </h3>
                    <div className="flex justify-center my-2">
                      <BlockMath math="\bar{f} = \frac{\Delta p \, D_h}{2 \, \rho_f \, L \, U_m^2}" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Calculated from the pressure drop across the channel.
                      Outlet pressure is the zero-gauge BC; inlet pressure is
                      extracted as the area-weighted average.
                    </p>
                  </div>
                </div>
              </div>
            </FloatingSection>

            {/* ─── Topic 7: Section Plane Results ─── */}
            <Topic topicName="Section Plane Results" />
            <FloatingSection>
              <div className="text-justify space-y-3 mb-4">
                <p>
                  Contour plots for all 9 Reynolds numbers (100–900) were
                  generated by{" "}
                  <strong>
                    exporting section plane data from ANSYS Fluent and
                    post-processing in Python with Matplotlib
                  </strong>
                  . Each subplot shares a unified colour bar so that the
                  variation across Reynolds numbers can be compared directly —
                  something that cannot be achieved natively in ANSYS, where
                  each plot uses its own auto-scaled colour range.
                </p>
              </div>
            </FloatingSection>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Pressure — Mid Plane
                </h2>
                {getItem(12) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(12)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Inlet pressure increases with Reynolds number as expected —
                    while higher flow rates improve heat transfer, they demand
                    proportionally higher pumping power. The outlet remains at
                    zero gauge pressure across all cases.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Temperature — Mid Plane
                </h2>
                {getItem(13) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(13)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The solid domain temperature increases along the flow
                    direction as the fluid heats up, reducing the local
                    temperature differential. At low Re, the fluid reaches
                    higher temperatures but the solid also runs hotter; at high
                    Re, efficient heat extraction keeps both domains cooler.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Temperature — Base Plane
                </h2>
                {getItem(14) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(14)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Temperature contours at the bottom of the fluid channel
                    (solid-fluid boundary). The distribution mirrors the mid
                    plane trends but reveals the direct contact thermal profile
                    where convective heat transfer occurs.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Velocity — Top Plane
                </h2>
                {getItem(15) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(15)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The effect of the ribs is visible at low Reynolds numbers as{" "}
                    <strong>periodic elliptical regions</strong> of increased
                    velocity coinciding with rib locations. As Re increases,
                    these regions elongate and eventually merge around Re ≈ 600.
                    The velocity structure transitions from isolated
                    disturbances to a developed core flow separated from the
                    boundary layers.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Topic 8: Validation ─── */}
            <Topic topicName="Validation & Comparison" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Nusselt Number vs. Reynolds Number
                </h2>
                {getItem(16) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(16)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Good agreement at low Reynolds numbers, with increasing
                    divergence at higher Re. The discrepancy is attributed to
                    the boundary layer height being derived purely from flow
                    dynamics (y⁺ calculation) without considering the thermal
                    boundary layer thickness — leading to under-resolved thermal
                    gradients at higher flow speeds.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Friction Factor vs. Reynolds Number
                </h2>
                {getItem(17) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(17)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The friction factor shows excellent trend agreement with a
                    constant offset from the literature values. This
                    Re-independent offset suggests a systematic mesh-related
                    difference rather than a physics modelling error —
                    consistent with the grid independence study being performed
                    only at Re = 100.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Key Findings ─── */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Key Findings
              </h2>
              <div className="text-justify space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Circular ribs <strong>enhance heat transfer</strong> by
                    disrupting the thermal boundary layer with minimal impact on
                    pumping power.
                  </li>
                  <li>
                    Higher Reynolds numbers reduce both fluid bulk temperature
                    rise and heatsink steady-state temperature, but at the cost
                    of{" "}
                    <strong>
                      significantly increased pressure drop and pumping power
                    </strong>
                    .
                  </li>
                  <li>
                    The <strong>laminar viscous model</strong> may miss
                    small-scale turbulence effects induced by the ribs,
                    particularly the elliptical high-velocity regions observed
                    in the velocity contours.
                  </li>
                  <li>
                    A more accurate approach for future work would consider the{" "}
                    <strong>thermal boundary layer</strong> when sizing the
                    first cell height, and use surface heat flux integration
                    rather than outlet temperature for Nusselt number
                    calculation.
                  </li>
                </ul>
              </div>
            </FloatingSection>

            {/* ─── Topic 9: Tech Stack ─── */}
            <Topic topicName="Technology Stack" />
            <FloatingSection>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "ANSYS Fluent", desc: "CFD solver and meshing" },
                  {
                    name: "SolidWorks",
                    desc: "Geometry — SpaceClaim failed at 25 µm ribs",
                  },
                  {
                    name: "Python + Matplotlib",
                    desc: "Contour plots with unified colour bars",
                  },
                  {
                    name: "ANSYS SpaceClaim",
                    desc: "Named selections and volume extraction",
                  },
                  {
                    name: "Fluent Meshing",
                    desc: "2.3M-cell mesh with inflation layers",
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

            {/* ─── Gallery ─── */}
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

export default Project_CFD_Microchannel;
