"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ImageDoc from "@/components/ui/ImageDoc";
import VideoDock from "@/components/ui/VideoDock";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";

function Project_TSP() {
  return (
    <ProjectPageLayout
      title="Travelling Salesman Problem Visualization"
      fetchUrl="/projects/project_tsp/files.json"
      projectSlug="projects/project_tsp"
    >
      {(items, getItem, handleOpen) => (
        <>
          {/* Hero / Overview */}
          <FloatingSection>
            <h1 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Overview
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-1/2 flex justify-center">
                {items.length > 0 && (
                  <motion.img
                    layoutId="Travelling Salesman Problem Visualization_img"
                    style={{
                      cursor: "pointer",
                      border: "4px solid gray",
                      borderRadius: "8px",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    onClick={() => handleOpen(items[0].id)}
                    src="/Images/Projects/TSP_Bruteforce_Genetic_Comparison.png"
                    alt="TSP Brute Force vs Genetic Algorithm side-by-side"
                    className="border-gray-800 dark:border-gray-200"
                  />
                )}
              </div>
              <div className="lg:w-1/2 text-justify">
                <p className="mb-4">
                  A real-time visualization built in Processing (Java) that
                  solves the Travelling Salesman Problem using two fundamentally
                  different approaches displayed <strong>side by side</strong>.
                  The left half runs a <strong>Genetic Algorithm</strong> that
                  evolves a population of candidate routes through selection,
                  crossover, and mutation, while the right half executes a{" "}
                  <strong>Brute Force</strong> search that enumerates every
                  possible permutation.
                </p>
                <p>
                  Both algorithms operate on the same set of 25 randomly placed
                  cities, allowing a direct visual comparison of convergence
                  speed and solution quality. Green paths indicate the best
                  route found so far, while white paths show the current attempt
                  being evaluated.
                </p>
              </div>
            </div>
          </FloatingSection>

          {/* ─── The Problem ─── */}
          <Topic topicName="The Problem" />
          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              Travelling Salesman Problem (TSP)
            </h2>
            <div className="text-justify space-y-3">
              <p>
                Given <InlineMath math="n" /> cities, the Travelling Salesman
                Problem asks:{" "}
                <em>
                  what is the shortest route that visits every city exactly once
                  and returns to the starting city?
                </em>{" "}
                Despite its simple statement, TSP is one of the most studied{" "}
                <strong>NP-hard</strong> problems in combinatorial optimization.
              </p>
              <p>
                A brute force approach must evaluate every possible permutation
                of cities. For <InlineMath math="n" /> cities, the number of
                distinct routes is:
              </p>
              <BlockMath math="\text{Routes} = n! = n \times (n-1) \times (n-2) \times \cdots \times 1" />
              <p>For the 25 cities used in this project, that means:</p>
              <BlockMath math="25! \approx 1.55 \times 10^{25} \text{ permutations}" />
              <p>
                Even at billions of evaluations per second, exhaustively
                checking all routes would take longer than the age of the
                universe. This astronomical complexity motivates the use of{" "}
                <strong>metaheuristic algorithms</strong> like the Genetic
                Algorithm, which trade guaranteed optimality for practical
                run-time by exploring the search space intelligently.
              </p>
            </div>
          </FloatingSection>

          {/* ─── Brute Force Approach ─── */}
          <Topic topicName="Brute Force Approach" />
          <AutoAdjustingSection
            title="Lexicographic Permutation Enumeration"
            imagePosition="left"
            mediaContent={
              getItem(2) && <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
            }
          >
            <div className="text-justify space-y-3">
              <p>
                The brute force solver uses the{" "}
                <strong>lexicographic next-permutation algorithm</strong> to
                systematically enumerate every possible route without
                repetition. Starting from the identity permutation, each step
                produces the next permutation in lexicographic order by finding
                the rightmost ascent, swapping with the smallest larger element,
                and reversing the suffix.
              </p>
              <p>
                Every generated permutation is evaluated as a candidate route —
                the total Euclidean distance is computed and compared against
                the current best. The display shows the{" "}
                <strong>current permutation number</strong> out of the total{" "}
                <InlineMath math="n!" />, the{" "}
                <strong>percentage completion</strong>, and the{" "}
                <strong>best distance</strong> found so far.
              </p>
              <p>
                While this approach <strong>guarantees</strong> finding the
                optimal solution, its <InlineMath math="O(n!)" /> time
                complexity makes it computationally infeasible for anything
                beyond a handful of cities. For 25 cities, the percentage
                counter effectively never moves — a powerful visual
                demonstration of factorial growth.
              </p>
            </div>
          </AutoAdjustingSection>

          {/* ─── Genetic Algorithm ─── */}
          <Topic topicName="Genetic Algorithm" />
          <AutoAdjustingSection
            title="Population-Based Metaheuristic"
            imagePosition="right"
            mediaContent={
              getItem(3) && <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
            }
          >
            <div className="text-justify space-y-3">
              <p>
                The Genetic Algorithm (GA) is a population-based metaheuristic
                inspired by natural selection. A population of{" "}
                <strong>800 candidate routes</strong> evolves over successive
                generations, with fitter individuals more likely to pass their
                genetic material to the next generation.
              </p>
              <p>
                Each route&apos;s fitness is computed using an inverse distance
                function with a high exponent to amplify differences between
                good and bad solutions:
              </p>
              <BlockMath math="\text{fitness}_i = \frac{1}{d_i^{\,8} + 1}" />
              <p>
                Fitness values are normalized across the population so they sum
                to 1, enabling <strong>roulette wheel selection</strong> where
                the probability of selecting an individual is proportional to
                its normalized fitness. Two parents are selected this way, and
                their offspring inherits genetic material from both.
              </p>
              <p>
                <strong>Mutation</strong> operates by swapping random adjacent
                cities in the route with a mutation rate of{" "}
                <InlineMath math="0.5" /> per gene — intentionally high to
                maintain diversity and prevent premature convergence. The
                display shows the{" "}
                <strong>current best of each generation</strong> in white and
                the <strong>overall best ever found</strong> in green, along
                with the generation count and best distance.
              </p>
              <p>
                Unlike brute force, the GA converges to a near-optimal solution
                within seconds to minutes, demonstrating the power of
                evolutionary search on combinatorial problems.
              </p>
            </div>
          </AutoAdjustingSection>

          {/* ─── Side-by-Side Comparison ─── */}
          <Topic topicName="Side-by-Side Comparison" />
          <AutoAdjustingSection
            title="Real-Time Visual Comparison"
            imagePosition="left"
            mediaContent={
              getItem(1) && (
                <VideoDock video={getItem(1)!} onOpen={handleOpen} />
              )
            }
          >
            <div className="text-justify space-y-3">
              <p>
                Both algorithms run <strong>simultaneously</strong> on the same
                randomly generated set of 25 cities, providing a direct
                comparison of their search strategies. The screen is split
                vertically: the Genetic Algorithm on the left and Brute Force on
                the right.
              </p>
              <p>
                In both halves, <strong>green paths</strong> represent the best
                route discovered so far, while <strong>white paths</strong> show
                the current route being tested (brute force) or the best of the
                current generation (genetic algorithm).
              </p>
              <p>
                The contrast is striking: the Genetic Algorithm rapidly
                converges on increasingly shorter routes, with the green path
                stabilizing within moments. Meanwhile, the Brute Force side
                churns through permutations with the percentage counter barely
                moving from 0%, its best route improving only occasionally. This
                visualization powerfully demonstrates why heuristic approaches
                are essential for NP-hard problems at scale.
              </p>
            </div>
          </AutoAdjustingSection>

          {/* ─── Technology Stack ─── */}
          <Topic topicName="Technology Stack" />
          <FloatingSection>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  name: "Processing (Java)",
                  desc: "Real-time graphics and animation framework",
                },
                {
                  name: "Genetic Algorithm",
                  desc: "Population-based evolutionary optimization",
                },
                {
                  name: "Brute Force Search",
                  desc: "Lexicographic permutation enumeration",
                },
                {
                  name: "Real-time Visualization",
                  desc: "Side-by-side algorithm comparison",
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

          {/* Gallery at bottom — hidden on 2xl */}
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

export default Project_TSP;
