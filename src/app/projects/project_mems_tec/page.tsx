"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ImageDoc from "@/components/ui/ImageDoc";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

function Project_MEMS_TEC() {
  const [showAppendix, setShowAppendix] = useState(false);

  return (
    <ProjectPageLayout
      title="MEMS Radial Thermoelectric Cooler"
      fetchUrl="/projects/project_mems_tec/files.json"
      projectSlug="projects/project_mems_tec"
    >
      {(items, getItem, handleOpen) => (
        <>
          {/* ─── Hero / Overview ─── */}
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Overview
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-1/2 text-justify">
                <p className="mb-4">
                  Hotspot management in <strong>3D stacked ICs</strong> is one
                  of the critical thermal challenges in modern chip design. This
                  project designed a{" "}
                  <strong>radial thermoelectric cooler (TEC)</strong> at MEMS
                  scale to actively pump heat from localized hotspots on a chip
                  surface, using the <strong>Peltier effect</strong> to move
                  thermal energy radially outward from a central heat source to
                  a surrounding micro-channel heat sink (MCHS).
                </p>
                <p className="mb-4">
                  The complete design pipeline spans{" "}
                  <strong>
                    analytical modelling → optimization → high-fidelity
                    simulation → fabrication planning
                  </strong>
                  : a compact thermal model (CTM) reduces the device to a
                  resistor network solved as a linear system in MATLAB,
                  multi-objective optimization selects the Pareto-optimal
                  geometry, and coupled multiphysics COMSOL simulations validate
                  the design through a{" "}
                  <strong>SolidWorks → COMSOL LiveLink → MATLAB API</strong>{" "}
                  workflow.
                </p>
                <p>
                  <a
                    href="https://github.com/Nuwantha005/CTM_for_TEC_MEMS_Project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 underline"
                  >
                    View the MATLAB source code on GitHub →
                  </a>
                </p>
              </div>
              <div className="lg:w-1/2">
                {items.length > 0 && (
                  <motion.img
                    layoutId="MEMS Radial Thermoelectric Cooler_img"
                    style={{
                      cursor: "pointer",
                      border: "4px solid gray",
                      borderRadius: "8px",
                      width: "100%",
                      height: "auto",
                    }}
                    onClick={() => handleOpen(1)}
                    src="/Images/Projects/MEMS_TEC_Thumbnail.jpeg"
                    alt="Radial TEC device design"
                    className="border-gray-800 dark:border-gray-200"
                  />
                )}
              </div>
            </div>
          </FloatingSection>

          {/* ─── Topic 1: Problem & Motivation ─── */}
          <Topic topicName="Problem & Motivation" />

          <AutoAdjustingSection
            title="Thermal Bottleneck in 3D Stacked Chips"
            imagePosition="right"
            mediaContent={
              getItem(6) && <ImageDoc image={getItem(6)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4">
              As transistor densities increase and chip architectures move to 3D
              stacking, localized thermal hotspots become the dominant failure
              and throttling mechanism. Conventional passive heat sinks cannot
              address temperature non-uniformity — the hottest region dictates
              the whole chip&apos;s clock speed even if the average temperature
              is acceptable.
            </p>
            <p>
              <strong>Thermoelectric coolers</strong> offer active, solid-state
              heat pumping with no moving parts. The Peltier effect drives heat
              from the cold junction (chip surface) to the hot junction (heat
              sink), and at MEMS scale these devices can be fabricated directly
              on-chip. This project explores a <strong>radial</strong> TEC
              geometry that exploits the natural circular symmetry of a hotspot.
            </p>
          </AutoAdjustingSection>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Conventional TEC Structure
              </h2>
              {getItem(7) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(7)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  A traditional TEC uses alternating n-type and p-type
                  thermoelectric legs connected electrically in series and
                  thermally in parallel between two ceramic substrates. When
                  current flows, heat is absorbed at one junction (cold side)
                  and released at the other (hot side) via the Peltier effect.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Chip Compartmentalization
              </h2>
              {getItem(8) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(8)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The concept places a TEC unit directly beneath a chip&apos;s
                  hotspot region. The chip area is compartmentalized — the
                  central high-heat-flux zone (e.g., cache) is cooled by the TEC
                  while the surrounding lower-flux zone (e.g., logic) is handled
                  by the MCHS ring. This targeted cooling reduces peak
                  temperature without over-cooling the entire die.
                </p>
              </div>
            </FloatingSection>
          </div>

          {/* ─── Topic 2: Proposed Design ─── */}
          <Topic topicName="Proposed Design" />

          <AutoAdjustingSection
            title="Radial TEC Architecture"
            imagePosition="left"
            mediaContent={
              getItem(2) && <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4">
              The device consists of{" "}
              <strong>12 wedge-shaped TEC modules</strong> arranged radially
              around a central aluminum nitride (AlN) heat-spreading cylinder.
              Each wedge contains multiple thermoelectric stages connected in
              series — the final optimized design uses{" "}
              <strong>7 stages per wedge</strong> with alternating n-type and
              p-type Bi₂Te₃ legs.
            </p>
            <p className="mb-4">
              Heat flows <strong>radially outward</strong>: the inner cold
              junction contacts the chip&apos;s hotspot through the central
              cylinder, while the outer hot junction connects to a circular
              micro-channel heat sink that carries the rejected heat away via
              forced liquid cooling.
            </p>
            <p>
              The radial geometry naturally provides increasing cross-sectional
              area toward the periphery, which helps accommodate the growing
              heat flux as Peltier effect adds Joule dissipation at each
              successive stage.
            </p>
          </AutoAdjustingSection>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Single Wedge
              </h2>
              {getItem(3) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  An isometric view of one TEC wedge showing the interconnectors
                  (copper), thermoelectric legs (Bi₂Te₃), radial insulators
                  (AlN-loaded epoxy), and azimuthal insulators (SiO₂). The wedge
                  angle is 30° for a 12-wedge assembly.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Layer System
              </h2>
              {getItem(4) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(4)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  Side view of the three-layer vertical stack: the chip layer
                  (heat source) on top, an AlN insulator layer in the middle,
                  and the TEC array layer on the bottom. Heat conducts
                  vertically from the chip into the insulator, then spreads
                  radially outward through the TEC stages.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                TE Element
              </h2>
              {getItem(5) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(5)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  A single thermoelectric element consisting of an n-type and
                  p-type Bi₂Te₃ leg pair connected by a copper interconnector at
                  the hot side and an outerconnect at the cold side. The legs
                  have a variable cross-section that increases radially.
                </p>
              </div>
            </FloatingSection>
          </div>

          {/* ─── Topic 3: Compact Thermal Model ─── */}
          <Topic topicName="Compact Thermal Model (CTM)" />

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Resistor-Network Formulation
              </h2>
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The analytical core of the project is a{" "}
                  <strong>compact thermal model</strong> that represents the
                  entire radial TEC as a network of thermal resistances. Each
                  component — chip layer, insulator, TE legs, interconnectors,
                  central cylinder — is modelled as a resistance element. Energy
                  balance at each node yields a <strong>linear system</strong>:
                </p>
                <div className="flex justify-center my-4">
                  <BlockMath math="\mathbf{A} \cdot \mathbf{T} = \mathbf{B}" />
                </div>
                <p>
                  where <InlineMath math="\mathbf{T}" /> is the vector of
                  unknown node temperatures, <InlineMath math="\mathbf{A}" /> is
                  a block matrix of thermal conductances, and{" "}
                  <InlineMath math="\mathbf{B}" /> contains heat generation
                  terms (chip power, split Joule heating) and boundary
                  conditions.
                </p>
                <p>
                  The matrix <InlineMath math="\mathbf{A}" /> has a structured
                  block form: <InlineMath math="\mathbf{A}_\text{chip}" />{" "}
                  (tridiagonal — radial conduction in the chip layer),{" "}
                  <InlineMath math="\mathbf{A}_\text{TEC}" /> (asymmetric
                  tridiagonal — TEC layer with Peltier coupling), and{" "}
                  <InlineMath math="\mathbf{A}_\text{ve}" /> (diagonal —
                  vertical coupling between layers). This yields sub-millisecond
                  solves in MATLAB, enabling rapid parameter sweeps that would
                  be infeasible with full FEA.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Peltier Effect & Thermal Resistance
              </h2>
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The cooling capacity of each TEC stage is governed by the
                  Peltier equation:
                </p>
                <div className="flex justify-center my-4">
                  <BlockMath math="Q_c = (S_p - S_n)\,I\,T_c - K\,(T_h - T_c) - \tfrac{1}{2}\,I^2 R" />
                </div>
                <p>
                  where <InlineMath math="S_p, S_n" /> are the Seebeck
                  coefficients, <InlineMath math="I" /> is the operating
                  current, <InlineMath math="T_c, T_h" /> the cold- and
                  hot-junction temperatures, <InlineMath math="K" /> the thermal
                  conductance, and <InlineMath math="R" /> the electrical
                  resistance.
                </p>
                <p>
                  Thermal resistances for wedge-shaped TE legs are computed by
                  integration over the variable cross-section:
                </p>
                <div className="flex justify-center my-4">
                  <BlockMath math="R_\text{th} = \int_{r_\text{in}}^{r_\text{out}} \frac{dr}{\kappa \cdot A(r)}" />
                </div>
                <p>
                  where <InlineMath math="A(r)" /> increases linearly with
                  radius due to the wedge geometry, and{" "}
                  <InlineMath math="\kappa" /> is the thermal conductivity of
                  the TE material.
                </p>
              </div>
            </FloatingSection>
          </div>

          {/* ─── Topic 4: Design Parameters ─── */}
          <Topic topicName="Design Parameters" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Parameter Space
            </h2>
            <div className="text-justify space-y-3">
              <p>
                The design involves approximately <strong>20 parameters</strong>{" "}
                organized into three categories:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                  <h3 className="font-semibold mb-2">Boundary Conditions</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Chip heat flux density</li>
                    <li>Heat sink temperature</li>
                    <li>Inlet water velocity</li>
                    <li>Convection coefficient</li>
                  </ul>
                </div>
                <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                  <h3 className="font-semibold mb-2">Geometric</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>
                      Number of stages (<InlineMath math="N" />)
                    </li>
                    <li>
                      Number of wedges (<InlineMath math="M" />)
                    </li>
                    <li>TEC layer thickness</li>
                    <li>
                      TE leg length ratio (<InlineMath math="f_L" />)
                    </li>
                    <li>Chip radius, insulator thickness</li>
                  </ul>
                </div>
                <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                  <h3 className="font-semibold mb-2">Operating</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>
                      Operating current (<InlineMath math="I" />)
                    </li>
                    <li>TE material properties (Bi₂Te₃)</li>
                    <li>Contact resistances</li>
                  </ul>
                </div>
              </div>
              <p>
                Sensitivity studies showed that{" "}
                <strong>TEC layer thickness</strong> and{" "}
                <strong>operating current</strong> have the most significant
                impact on peak chip temperature, while the number of stages and
                wedges are the primary discrete variables that define the device
                topology.
              </p>
            </div>
          </FloatingSection>

          {/* ─── Topic 5: Optimization ─── */}
          <Topic topicName="Preliminary Optimization" />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                CTM Temperature Profile
              </h2>
              {getItem(9) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(9)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The CTM&apos;s sub-millisecond solve time enables exhaustive
                  parameter exploration that would be impossible with FEA. The
                  MATLAB implementation evaluates the full thermal field across
                  chip and TEC layers for any combination of design parameters.
                </p>
                <p>
                  Each objective function call simply assembles and solves the{" "}
                  <InlineMath math="\mathbf{A} \cdot \mathbf{T} = \mathbf{B}" />{" "}
                  system, extracts the maximum chip temperature, and returns it
                  to the optimizer.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Grid Search on Discrete Parameters
              </h2>
              {getItem(10) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(10)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The first optimization stage performs a brute-force grid
                  search over the two integer parameters:{" "}
                  <InlineMath math="N" /> (1–10 stages) and{" "}
                  <InlineMath math="M" /> (4–36 wedges). For each{" "}
                  <InlineMath math="(N, M)" /> pair, the CTM is solved and the
                  maximum chip temperature is recorded. The matrix plot reveals
                  the feasible design space and identifies the optimal region
                  around <InlineMath math="N = 7, M = 16" />.
                </p>
                <p>
                  MATLAB&apos;s parallel computing toolbox was used to
                  distribute the grid evaluation across CPU cores, evaluating
                  all ~200 combinations in seconds.
                </p>
              </div>
            </FloatingSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Multi-Objective Optimization (NSGA-II)
              </h2>
              {getItem(11) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(11)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  With discrete parameters fixed, a multi-objective optimization
                  minimizes two conflicting objectives:{" "}
                  <strong>maximum chip temperature</strong> and{" "}
                  <strong>total device thickness</strong>. MATLAB&apos;s{" "}
                  <code>gamultiobj</code> (NSGA-II) generates a Pareto front
                  showing the trade-off between thermal performance and
                  fabrication complexity.
                </p>
                <p>
                  The <strong>knee-point</strong> solution was selected:{" "}
                  <InlineMath math="T_\text{max} = 77.8\,°\text{C}" />,
                  thickness = 264 µm, with <InlineMath math="N = 7" /> stages,{" "}
                  <InlineMath math="M = 16" /> wedges, and 112 total TE legs.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Knee-Point Solution
              </h2>
              {getItem(12) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(12)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The selected knee-point design achieves a maximum chip
                  temperature of <strong>77.8 °C</strong> — well below the
                  typical junction temperature limit of 85 °C — with a total
                  device thickness of only <strong>264 µm</strong>.
                </p>
                <p>
                  The complete optimal parameter set includes: 7 TEC stages, 16
                  radial wedges, operating current of 0.3 A, TE leg length ratio{" "}
                  <InlineMath math="f_L = 0.65" />, insulator thickness of 15
                  µm, and an inner radius of 1.5 mm for the central cylinder.
                </p>
              </div>
            </FloatingSection>
          </div>

          {/* ─── Topic 6: COMSOL Simulations ─── */}
          <Topic topicName="COMSOL High-Fidelity Simulations" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Simulation Workflow: SolidWorks → COMSOL → MATLAB
            </h2>
            <div className="text-justify space-y-3">
              <p>
                The high-fidelity validation uses a fully automated simulation
                pipeline driven entirely from MATLAB:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <div className="bg-blue-500/10 dark:bg-blue-400/10 rounded-lg p-3 border border-blue-500/30">
                  <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
                    1. SolidWorks (Geometry)
                  </h3>
                  <p className="text-sm">
                    Parametric CAD model of the radial TEC. Geometry dimensions
                    are driven by the optimization variables — changing a
                    parameter in MATLAB updates the SolidWorks model
                    automatically.
                  </p>
                </div>
                <div className="bg-green-500/10 dark:bg-green-400/10 rounded-lg p-3 border border-green-500/30">
                  <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                    2. COMSOL LiveLink
                  </h3>
                  <p className="text-sm">
                    COMSOL imports the SolidWorks geometry via LiveLink, applies
                    physics (thermoelectric + fluid flow + structural), meshes,
                    and solves. The coupled multiphysics includes
                    Peltier/Thomson effects, conjugate heat transfer, and
                    thermal stress.
                  </p>
                </div>
                <div className="bg-purple-500/10 dark:bg-purple-400/10 rounded-lg p-3 border border-purple-500/30">
                  <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
                    3. MATLAB API
                  </h3>
                  <p className="text-sm">
                    MATLAB orchestrates the entire pipeline: sets parameters,
                    triggers geometry rebuild, runs COMSOL solver, and extracts
                    results. This enables parametric sweeps and automated
                    validation against the CTM predictions.
                  </p>
                </div>
              </div>
              <p>
                The physics modules coupled in the simulation include:{" "}
                <strong>Electrical Currents</strong>,{" "}
                <strong>Heat Transfer in Fluids/Solids</strong>,{" "}
                <strong>Laminar Flow</strong>, and{" "}
                <strong>Solid Mechanics</strong>. Multiphysics couplings handle
                the thermoelectric effect, electromagnetic heating,
                non-isothermal flow, and thermal expansion. A segregated solver
                converges in 20–50 iterations.
              </p>
            </div>
          </FloatingSection>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                TEC Unit: Current Sweep
              </h2>
              {getItem(15) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(15)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  A parametric sweep of operating current identifies the optimal
                  value at <strong>0.3 A</strong>. Below this, Peltier cooling
                  is insufficient; above it, Joule heating dominates and the
                  device heats the chip rather than cooling it. The outward heat
                  flux at the optimum is 0.49 W per wedge.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Temperature Distribution
              </h2>
              {getItem(16) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(16)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The COMSOL temperature contour at the optimum current shows
                  the radial temperature gradient from the hot central region to
                  the cooler outer periphery. The simulation confirms the design
                  intent — heat is actively pumped outward through the TEC
                  stages, creating a smooth temperature drop across the device.
                </p>
              </div>
            </FloatingSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Coupled TEC + MCHS
              </h2>
              {getItem(17) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(17)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The full coupled simulation combines the TEC unit with the
                  circular micro-channel heat sink. The MCHS features 200 µm
                  wide channels with 50 µm walls at an inlet velocity of 0.8
                  m/s. Conjugate heat transfer between the solid walls and water
                  flow provides the final heat rejection path.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Near-Channel Temperature
              </h2>
              {getItem(18) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(18)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  Temperature distribution in the region near the micro channels
                  shows effective heat removal by the liquid coolant. The water
                  temperature rises from 25 °C at the inlet to approximately 28
                  °C at the outlet, confirming adequate thermal capacity for the
                  rejected heat load.
                </p>
              </div>
            </FloatingSection>
          </div>

          <AutoAdjustingSection
            title="Structural Analysis"
            imagePosition="right"
            mediaContent={
              getItem(20) && (
                <ImageDoc image={getItem(20)!} onOpen={handleOpen} />
              )
            }
          >
            <p className="mb-4">
              A thermal-structural analysis evaluates Von Mises stresses arising
              from thermal expansion mismatch between dissimilar materials
              (Bi₂Te₃, Cu, AlN, SiO₂, SU-8). The maximum stress is on the order
              of 10⁸ Pa, which remains within safe limits for the materials
              involved.
            </p>
            <p>
              The stress concentration occurs at the interfaces between
              materials with significantly different coefficients of thermal
              expansion, particularly at the Cu–Bi₂Te₃ and AlN–SiO₂ junctions.
              These results inform fabrication process choices and operating
              temperature limits.
            </p>
          </AutoAdjustingSection>

          {/* ─── Topic 7: Fabrication ─── */}
          <Topic topicName="MEMS Fabrication" />

          <AutoAdjustingSection
            title="Photomask Set & Process Flow"
            imagePosition="left"
            mediaContent={
              getItem(21) && (
                <ImageDoc image={getItem(21)!} onOpen={handleOpen} />
              )
            }
          >
            <p className="mb-4">
              A complete set of <strong>10 photomasks</strong> was designed for
              the MEMS fabrication process. The fabrication uses standard
              microfabrication techniques:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                <strong>Electroplating</strong> — copper interconnects and
                outerconnects
              </li>
              <li>
                <strong>DRIE</strong> (Deep Reactive Ion Etching) — silicon
                etching for insulator and TE cavities
              </li>
              <li>
                <strong>AlN-loaded epoxy paste</strong> — radial insulators
                (thermally conductive, electrically insulating)
              </li>
              <li>
                <strong>Spin-on Glass</strong> — azimuthal insulators (SiO₂
                thermal barriers)
              </li>
              <li>
                <strong>SU-8 negative photoresist</strong> — micro-channel heat
                sink structure (1:100 aspect ratio)
              </li>
              <li>
                <strong>Omnicoat</strong> — sacrificial layer for channel
                release
              </li>
            </ul>
            <p>
              Key materials include AlN substrate (thermal spreader), Bi₂Te₃
              (thermoelectric), Cu (wiring), SiO₂ (azimuthal insulation), and
              SU-8 (MCHS walls).
            </p>
          </AutoAdjustingSection>

          {/* ─── Topic 8: MATLAB Code ─── */}
          <Topic topicName="MATLAB Code Structure" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Repository Organization
            </h2>
            <div className="text-justify space-y-3">
              <p>
                The{" "}
                <a
                  href="https://github.com/Nuwantha005/CTM_for_TEC_MEMS_Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  MATLAB codebase
                </a>{" "}
                is organized into focused modules:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
                {[
                  {
                    name: "Geometry",
                    desc: "Parametric wedge, layer, and cylinder dimensions from design variables",
                  },
                  {
                    name: "Thermal Resistance",
                    desc: "Variable cross-section integration for TE legs, interconnects, insulators",
                  },
                  {
                    name: "CTM Assembly",
                    desc: "Block matrix construction (A_chip, A_TEC, A_ve) and RHS vector B",
                  },
                  {
                    name: "Optimization",
                    desc: "Grid search (parfor) + gamultiobj (NSGA-II) for Pareto front",
                  },
                  {
                    name: "Visualization",
                    desc: "Temperature profiles, Pareto fronts, matrix plots, parametric sweeps",
                  },
                  {
                    name: "COMSOL Interface",
                    desc: "LiveLink parameter setting, solver control, result extraction via API",
                  },
                ].map((mod) => (
                  <div
                    key={mod.name}
                    className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg px-3 py-2 border border-gray-600 dark:border-gray-400"
                  >
                    <span className="font-semibold">{mod.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {mod.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingSection>

          {/* ─── Topic 9: Documents ─── */}
          <Topic topicName="Documents" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              CTM Derivation (Appendix)
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Complete mathematical derivation of the compact thermal model:
              geometry parametrization, thermal/electrical resistance
              calculation, energy balance, and block matrix formulation.
            </p>
            {showAppendix ? (
              <iframe
                src="/projects/project_mems_tec/docs/Thermal_Network_CTM_Derivation.pdf"
                className="w-full min-h-[600px] rounded-lg border border-gray-600 dark:border-gray-400"
                title="CTM Derivation Appendix"
              />
            ) : (
              <button
                onClick={() => setShowAppendix(true)}
                className="w-full py-3 rounded-lg border border-gray-600 dark:border-gray-400 bg-slate-300/50 dark:bg-slate-700/50 hover:bg-slate-400/50 dark:hover:bg-slate-600/50 transition-colors font-medium"
              >
                Load CTM Derivation PDF
              </button>
            )}
          </FloatingSection>

          {/* ─── Topic 10: Tech Stack ─── */}
          <Topic topicName="Technology Stack" />

          <FloatingSection>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "MATLAB", desc: "CTM, optimization, orchestration" },
                { name: "COMSOL Multiphysics", desc: "FEA simulation" },
                { name: "SolidWorks", desc: "Parametric CAD geometry" },
                { name: "LiveLink for SolidWorks", desc: "CAD ↔ FEA bridge" },
                {
                  name: "MATLAB Parallel Computing",
                  desc: "Grid search parallelization",
                },
                {
                  name: "gamultiobj (NSGA-II)",
                  desc: "Multi-objective optimization",
                },
                { name: "Bi₂Te₃", desc: "Thermoelectric material" },
                { name: "L-Edit / KLayout", desc: "Photomask design" },
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

export default Project_MEMS_TEC;
