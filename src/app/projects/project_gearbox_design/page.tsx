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

function Project_Gearbox_Design() {
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
      fetch("/projects/project_gearbox_design/files.json")
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
        <ProjectTitleBar title="Gearbox Design for a Spacer Cart" />
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
                    A group project to design a complete{" "}
                    <strong>3-speed forward + 3-speed reverse gearbox</strong>{" "}
                    for a spacer cart. The gearbox uses a three-shaft layout
                    (input, counter, output) with dog-clutch engagement and a
                    ball-and-socket shifting mechanism.
                  </p>
                  <p className="mb-4">
                    <strong>My contributions</strong> covered the full
                    analytical design pipeline: deriving gear radius equations
                    from the shaft geometry, writing a{" "}
                    <strong>brute-force search in Python</strong> to find
                    feasible tooth/module combinations, performing gear safety
                    calculations (Lewis, Buckingham, wear), shaft bending moment
                    analysis with <strong>Python-generated BMD plots</strong>,
                    bearing selection, and the complete shifting mechanism
                    geometry and CAD design.
                  </p>
                  <p>
                    The project was a collaborative effort between three team
                    members. The spacer cart concept was selected from three
                    proposals. The content on this page focuses on my individual
                    contributions.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  {items.length > 0 && (
                    <motion.img
                      layoutId="Gearbox Design for a Spacer Cart_img"
                      style={{
                        cursor: "pointer",
                        border: "4px solid gray",
                        borderRadius: "8px",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={() => handleOpen(11)}
                      src="/Images/Projects/Gearbox_Design_Thumbnail.jpeg"
                      alt="Shifting mechanism — overall design"
                      className="border-gray-800 dark:border-gray-200"
                    />
                  )}
                </div>
              </div>
            </FloatingSection>

            {/* ─── Topic 1: Gear System & Layout ─── */}
            <Topic topicName="Gear System & Layout" />
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Shaft Arrangement
                </h2>
                {getItem(1) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(1)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The gearbox uses a <strong>three-shaft layout</strong> —
                    input, counter, and output — with three gear ratios for
                    forward drive and three for reverse. A common gear pair
                    between the counter shaft and output shaft is shared across
                    all forward speeds.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Design Choices
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    A <strong>20° full-depth involute</strong> gear tooth system
                    was selected — it can be cut with standard hobs and the
                    higher pressure angle produces stronger teeth compared to
                    14½° systems. The minimum number of teeth on any pinion is
                    18 to avoid interference.
                  </p>
                  <p>
                    Shaft centre distances are constrained by the gear ratios
                    and the requirement that gear radius{" "}
                    <InlineMath math="R = mT/2" /> must yield a{" "}
                    <strong>positive whole-number tooth count</strong> for a{" "}
                    <strong>standard module</strong>. This creates a
                    combinatorial feasibility problem solved by exhaustive
                    search.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {[
                      {
                        title: "Gear Material",
                        text: "AISI 1065 Steel — UTS 635 MPa, Brinell 187. Used for shaft gearing.",
                      },
                      {
                        title: "Pinion Material",
                        text: "SAE J431 Gray Cast Iron (G2500) — selected after safety calculations showed 180 MPa UTS is sufficient.",
                      },
                      {
                        title: "Gear Ratios",
                        text: "Forward: 0.8, 1.5, 2.25 — Reverse: 1.6, 3.0, 4.5. Common pair: 2.0.",
                      },
                      {
                        title: "Shaft Distances",
                        text: "Input–Output: 107.25 mm, Input–Counter: 146.25 mm, Counter–Output: 99 mm.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400"
                      >
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Topic 2: Brute-Force Tooth Search ─── */}
            <Topic topicName="Tooth Count Search (Python)" />
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Brute-Force Feasibility Search
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Each gear&apos;s radius is determined by the shaft centre
                    distance and the velocity ratio. For example, for the first
                    reverse pinion:
                  </p>
                  <div className="flex justify-center my-3">
                    <BlockMath math="R_{r_{1}i} = \frac{L_{io}}{N_1 + 1}" />
                  </div>
                  <p>
                    Since <InlineMath math="D = m \times T" /> (diameter =
                    module × teeth), and both module and teeth count must be
                    discrete (<strong>standard module list</strong> and{" "}
                    <strong>integer teeth ≥ 18</strong>), the problem becomes a
                    combinatorial search. A{" "}
                    <strong>brute-force search in Python</strong> was used:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>
                      Choose a module from the standard list and iterate tooth
                      count from 18 upward for the first gear pair, calculating{" "}
                      <InlineMath math="L_{io}" /> for each.
                    </li>
                    <li>
                      For each feasible <InlineMath math="L_{io}" />, compute
                      radii of the remaining gears. Try every standard module
                      for each pair and keep only combinations yielding integer
                      teeth.
                    </li>
                    <li>
                      Filter: discard any entry with fractional teeth or count
                      below 18. The search produced 233 candidate rows for
                      reverse gears alone.
                    </li>
                    <li>
                      Select the row with the <strong>largest module</strong> —
                      fewer teeth, easier manufacturing, stronger tooth profile.
                    </li>
                  </ol>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Forward Gear Results
                </h2>
                {getItem(2) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Output of the Python search showing all feasible module
                    combinations for the forward gear set. The same iterative
                    method was applied to reverse gears and the common gear
                    pair. Entries with the largest modules were selected to
                    minimise tooth count and maximise strength.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Selected Gears Summary Table ─── */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Selected Gear Geometry
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600 dark:border-gray-400">
                      <th className="text-left py-2 px-3">Gear Pair</th>
                      <th className="text-left py-2 px-3">Module</th>
                      <th className="text-left py-2 px-3">VR</th>
                      <th className="text-left py-2 px-3">Pinion Teeth</th>
                      <th className="text-left py-2 px-3">Gear Teeth</th>
                      <th className="text-left py-2 px-3">Pinion ⌀ (mm)</th>
                      <th className="text-left py-2 px-3">Gear ⌀ (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "Reverse 1st",
                        "2.75",
                        "1.6",
                        "30",
                        "48",
                        "82.5",
                        "132.0",
                      ],
                      [
                        "Reverse 2nd",
                        "1.375",
                        "3.0",
                        "39",
                        "117",
                        "53.6",
                        "160.9",
                      ],
                      [
                        "Reverse 3rd",
                        "1.5",
                        "4.5",
                        "26",
                        "117",
                        "39.0",
                        "175.5",
                      ],
                      ["Common", "3.0", "2.0", "22", "44", "66.0", "132.0"],
                      [
                        "Forward 1st",
                        "2.5",
                        "0.8",
                        "52",
                        "65",
                        "130.0",
                        "162.5",
                      ],
                      [
                        "Forward 2nd",
                        "1.5",
                        "1.5",
                        "78",
                        "117",
                        "117.0",
                        "175.5",
                      ],
                      [
                        "Forward 3rd",
                        "2.5",
                        "2.25",
                        "36",
                        "81",
                        "90.0",
                        "202.5",
                      ],
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

            {/* ─── Topic 3: Gear Safety Calculations ─── */}
            <Topic topicName="Gear Safety Calculations" />
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Lewis, Buckingham & Wear Analysis
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  Each pinion was checked against three failure modes following
                  classical machine design methodology:
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 my-4">
                  <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                    <h3 className="font-semibold mb-2">Lewis Equation</h3>
                    <div className="flex justify-center my-2">
                      <BlockMath math="W_T = \sigma_w \, b \, p_c \, y" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tangential tooth load vs. permissible bending stress.
                      Determines minimum face width{" "}
                      <InlineMath math="b_{\min}" /> for each pinion. Velocity
                      factor <InlineMath math="C_v" /> scales the allowable
                      stress for pitch-line speed.
                    </p>
                  </div>
                  <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                    <h3 className="font-semibold mb-2">
                      Buckingham (Dynamic Load)
                    </h3>
                    <div className="flex justify-center my-2">
                      <BlockMath math="W_D = W_T + \frac{21v(bC + W_T)}{21v + \sqrt{bC + W_T}}" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accounts for tooth error and impact. The deformation
                      factor <InlineMath math="C" /> depends on tooth error in
                      action and gear/pinion moduli of elasticity. Safety:{" "}
                      <InlineMath math="W_S \geq 1.35 \, W_D" />.
                    </p>
                  </div>
                  <div className="bg-slate-300/50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-600 dark:border-gray-400">
                    <h3 className="font-semibold mb-2">Wear (Limiting Load)</h3>
                    <div className="flex justify-center my-2">
                      <BlockMath math="W_w = D_p \, b \, Q \, K" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Surface endurance check. Load stress factor{" "}
                      <InlineMath math="K" /> is derived from surface endurance
                      limit{" "}
                      <InlineMath math="\sigma_{es} = 2.8 \times \text{BHN} - 70" />
                      . All pinions passed with large margins.
                    </p>
                  </div>
                </div>
              </div>
            </FloatingSection>

            {/* ─── Topic 4: Shaft Bending Moment Analysis ─── */}
            <Topic topicName="Shaft Bending Analysis (Python)" />
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Reverse Gear Loads
                </h2>
                {getItem(3) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    When reverse gears are engaged, the tangential load acts
                    downward on the input shaft. The force at each gear is{" "}
                    <InlineMath math="F = \tau / R" /> where{" "}
                    <InlineMath math="\tau = 3.2" /> Nm (max engine torque). The
                    largest force occurs at the 3rd reverse gear (smallest
                    radius, 19.5 mm) at <strong>164 N</strong>.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  BMD — Reverse Engagements
                </h2>
                {getItem(4) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(4)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Free-body and bending moment diagrams for all three reverse
                    gear engagement cases. Each scenario considers gear weight
                    and tangential tooth load as point forces along the shaft.
                    These plots were <strong>generated in Python</strong> using
                    the gear positions and loads.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  BMD — Forward (Horizontal & Vertical)
                </h2>
                {getItem(6) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(6)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Forward gears create loads in both horizontal and vertical
                    planes. Separate BMDs were computed for each component. The
                    horizontal plane carries the tangential tooth load while the
                    vertical plane carries gear weight.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Combined BMD — Forward
                </h2>
                {getItem(8) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(8)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Combined bending moment diagram for all forward gear
                    engagement cases. The maximum bending moment across all
                    scenarios (reverse + forward) was <strong>9.68 Nm</strong>{" "}
                    at 3rd reverse engagement. This was used together with the
                    twisting moment (3.2 Nm) to find the equivalent twisting
                    moment and minimum shaft diameter.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── Shaft Diameter Result ─── */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Shaft Diameter & Bearing Selection
              </h2>
              <div className="text-justify space-y-3">
                <p>
                  The equivalent twisting moment combines bending and torsion
                  with shock factors:
                </p>
                <div className="flex justify-center my-3">
                  <BlockMath math="T_e = \sqrt{(K_m M)^2 + (K_t T)^2} = \sqrt{(1.5 \times 9.68)^2 + (1 \times 3.2)^2} = 14.87 \; \text{Nm}" />
                </div>
                <p>
                  Solving for minimum shaft diameter with{" "}
                  <InlineMath math="\tau_{\max} = 247" /> MPa:
                </p>
                <div className="flex justify-center my-3">
                  <BlockMath math="d_{\min} = \left(\frac{16 \, T_e}{\pi \, \tau_{\max}}\right)^{1/3} = 6.74 \; \text{mm}" />
                </div>
                <p>
                  A <strong>10 mm shaft diameter</strong> was selected to
                  provide a safety margin and match available bearing sizes.
                  Deep-groove ball bearings were chosen based on dynamic load
                  ratings calculated from the tangential tooth loads using
                  standard bearing life equations (20,000 hours design life).
                </p>
              </div>
            </FloatingSection>

            {/* ─── Topic 5: Shifting Mechanism ─── */}
            <Topic topicName="Shifting Mechanism" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  9-Position Shifting Arrangement
                </h2>
                {getItem(9) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(9)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The shifting mechanism has 9 positions — three rows
                    (left/middle/right), each with forward, neutral, and
                    reverse. A dog-clutch engagement was used: the shifter moves
                    a collar that slides on a splined shaft to mesh with the
                    target gear.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Shifter–Dog Clutch Link
                </h2>
                {getItem(10) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(10)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The shifting lever tip moves approximately the same distance
                    as the dog clutch travel (6.5 mm). The geometry calculations
                    derive the shifting angle{" "}
                    <InlineMath math="\theta = \tan^{-1}(l_1 / r_1)" /> and the
                    inter-fork angle{" "}
                    <InlineMath math="\alpha = \tan^{-1}(l_2 / r_2)" /> to
                    determine lever dimensions.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Lever Engagement Geometry
                </h2>
                {getItem(16) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(16)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Dimensions of the lever&apos;s engagement part were derived
                    analytically. Height, depth, and width were each constrained
                    by geometric relationships between the fork radius, shifter
                    tip radius, and the angular travel needed for reliable
                    engagement.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Shifting Geometry Results
                </h2>
                <div className="text-justify space-y-3 flex-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-gray-600 dark:border-gray-400">
                          <th className="text-left py-2 px-3">Parameter</th>
                          <th className="text-left py-2 px-3">Value</th>
                          <th className="text-left py-2 px-3">Parameter</th>
                          <th className="text-left py-2 px-3">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Fork radius (r₂)", "100.0 mm", "dr₁", "2.04 mm"],
                          ["Lever length (l)", "170.0 mm", "dr₂", "1.41 mm"],
                          [
                            "Socket radius (r₃)",
                            "23.5 mm",
                            "Total dr",
                            "3.45 mm",
                          ],
                          ["Tip radius (r₄)", "5.0 mm", "dl", "0.18 mm"],
                          ["Shifter radius (r₁)", "70.0 mm", "r₅", "8.45 mm"],
                          ["θ (forward/back)", "4.09°", "r₆", "5.18 mm"],
                          ["α (inter-fork)", "9.65°", "r₇", "8.50 mm"],
                          ["α′ (lever angle)", "13.85°", "", ""],
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
                </div>
              </FloatingSection>
            </div>

            {/* ─── Topic 6: Final CAD Design ─── */}
            <Topic topicName="Final Design (CAD)" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Overall Shifting Mechanism
                </h2>
                {getItem(11) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(11)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The shifting mechanism uses a{" "}
                    <strong>ball-and-socket joint</strong> for smooth multi-axis
                    shifting. The shifter is hollow (2 mm wall thickness) to
                    reduce weight, with a globular tip to minimise contact area
                    and wear against the levers.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Engagement Section View
                </h2>
                {getItem(12) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(12)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Sectional view of the engagement location. The lever
                    engagement parts are aligned in a straight line when all are
                    in neutral position. Levers connect to forks through
                    transition fits that lock relative rotation, while M10 bolts
                    constrain lateral movement.
                  </p>
                </div>
              </FloatingSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Socket & Shift Gate
                </h2>
                {getItem(14) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(14)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    The socket was designed so that only the allowable shifter
                    movements can be made — the internal geometry acts as a
                    shift gate. Cut dimensions were derived from the shifting
                    geometry calculations. The socket is machined separately and
                    welded to the housing top for tighter tolerances.
                  </p>
                </div>
              </FloatingSection>

              <FloatingSection className="flex flex-col">
                <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                  Shifter in Housing
                </h2>
                {getItem(15) && (
                  <div className="mb-3 flex justify-center">
                    <ImageDoc image={getItem(15)!} onOpen={handleOpen} />
                  </div>
                )}
                <div className="text-justify space-y-3 flex-1">
                  <p>
                    Location of the shifter in the overall gearbox housing.
                    Levers are held in place through clearance-fit slots built
                    into the middle housing section, allowing the sliding motion
                    needed during gear shifts. The longest lever has two holding
                    sockets for stability while the shorter ones rely on fork
                    interference fits.
                  </p>
                </div>
              </FloatingSection>
            </div>

            {/* ─── My Contributions Summary ─── */}
            <FloatingSection>
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                My Contributions (Summary)
              </h2>
              <div className="text-justify space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Gear radius & tooth count derivation</strong> —
                    derived the system of 31 equations relating shaft distances,
                    velocity ratios, and gear radii.
                  </li>
                  <li>
                    <strong>
                      Python brute-force search for feasible tooth/module
                      combinations
                    </strong>{" "}
                    — iterated standard modules and tooth counts across all gear
                    pairs to find geometrically valid configurations.
                  </li>
                  <li>
                    <strong>Gear safety calculations</strong> — Lewis bending,
                    Buckingham dynamic load, static tooth load, and limiting
                    wear load for every pinion.
                  </li>
                  <li>
                    <strong>
                      Shaft bending analysis with Python-generated BMD plots
                    </strong>{" "}
                    — free-body diagrams and bending moment curves for all 6
                    gear engagement cases (3 reverse + 3 forward), leading to
                    equivalent twisting moment and shaft diameter.
                  </li>
                  <li>
                    <strong>Bearing selection</strong> — static/dynamic load
                    ratings and bearing life calculations for deep-groove ball
                    bearings on a 10 mm shaft.
                  </li>
                  <li>
                    <strong>Shifting mechanism geometry & CAD</strong> — derived
                    all shifting angles and dimensions analytically, designed
                    the ball-and-socket mechanism, shift gate, lever system, and
                    housing integration in SolidWorks.
                  </li>
                </ul>
              </div>
            </FloatingSection>

            {/* ─── Tech Stack ─── */}
            <Topic topicName="Technology Stack" />
            <FloatingSection>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "Python (Jupyter)",
                    desc: "Brute-force tooth search & BMD plotting",
                  },
                  {
                    name: "SolidWorks",
                    desc: "Full gearbox CAD & shifting mechanism",
                  },
                  {
                    name: "Classical Machine Design",
                    desc: "Lewis, Buckingham, wear analysis",
                  },
                  {
                    name: "MATLAB",
                    desc: "Supplementary symbolic derivation",
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

export default Project_Gearbox_Design;
