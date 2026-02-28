"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import LGComponent from "@/components/ui/LGComponent";
import Topic from "@/components/ui/Topic";
import ImageDoc from "@/components/ui/ImageDoc";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";

function Project_MoviesSoftware() {
  return (
    <ProjectPageLayout
      title="Movies and Series Management Software"
      fetchUrl="/projects/project_movies_and_tv_series_software/images.json"
      projectSlug="projects/Project_MoviesSoftware"
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
                  A desktop application for managing a personal movie and TV
                  series collection, built as the final project for my course at
                  the ATARI city campus. Although assigned as a group project, I
                  developed the entire application independently as a challenge
                  to test my own skills. The project assignment subject for our
                  group changed later, and this version was never formally
                  presented.
                </p>
                <p className="mb-4">
                  The application was written entirely in <strong>Java</strong>{" "}
                  using <strong>JavaFX</strong> with <strong>JFoenix</strong>{" "}
                  Material Design components for a polished dark-themed UI.{" "}
                  <strong>MySQL</strong> serves as the backend database, with
                  poster images stored directly as BLOBs. The UI layouts were
                  designed visually using <strong>Scene Builder</strong> (FXML),
                  and the project was managed with <strong>NetBeans IDE</strong>{" "}
                  and built via <strong>Apache Ant</strong>.
                </p>
              </div>
              <div className="lg:w-1/2">
                {items.length > 0 && (
                  <motion.img
                    layoutId="Movies and Series Management Software_img"
                    style={{
                      cursor: "pointer",
                      border: "4px solid gray",
                      borderRadius: "8px",
                      width: "100%",
                      height: "auto",
                    }}
                    onClick={() => handleOpen(items[0].id)}
                    src="/Images/Projects/movies_and_tv_series_Software_Window.PNG"
                    alt="Main application window"
                    className="border-gray-800 dark:border-gray-200"
                  />
                )}
              </div>
            </div>
          </FloatingSection>

          {/* ─── Topic: Features ─── */}
          <Topic topicName="Features" />

          <AutoAdjustingSection
            title="Movie Management"
            imagePosition="right"
            mediaContent={
              getItem(4) && <ImageDoc image={getItem(4)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4">
              Full <strong>CRUD operations</strong> for movies and TV series
              with auto-generated IDs. Each entry stores a name, category,
              description, and an IMDB rating validated between 0 and 10.
              Relational selectors let you assign a franchise, producer, and
              studio to each title.
            </p>
            <p>
              Poster images can be loaded via a <strong>FileChooser</strong>{" "}
              dialog or by pasting a URL directly. Images are stored as binary
              BLOBs in the MySQL database, keeping the collection self-contained
              without external file dependencies.
            </p>
          </AutoAdjustingSection>

          <AutoAdjustingSection
            title="Material Design UI"
            imagePosition="left"
            mediaContent={
              getItem(0) && <ImageDoc image={getItem(0)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4">
              The interface is built with <strong>JFoenix</strong> components
              that bring Google&apos;s Material Design language to JavaFX.
              Custom confirmation and error dialogs use{" "}
              <strong>JFXDialog</strong> with a blurred background overlay and
              color-coded headers for clear visual feedback.
            </p>
            <p>
              A fully custom <strong>dark CSS theme</strong> with a{" "}
              <code>#2A2E37</code> background and green accent colors creates a
              modern, comfortable viewing experience. Interactive elements
              feature animated icon transitions and ripple effects throughout
              the application.
            </p>
          </AutoAdjustingSection>

          <AutoAdjustingSection
            title="Search & Browse"
            imagePosition="right"
            mediaContent={
              getItem(5) && <ImageDoc image={getItem(5)!} onOpen={handleOpen} />
            }
          >
            <p className="mb-4">
              Movies and TV series are displayed in an{" "}
              <strong>alphabetical sidebar list</strong>. Selecting a title
              reveals its poster image (scrollable and zoomable), along with
              metadata including IMDB rating, category, franchise, producer, and
              studio in a dedicated detail panel.
            </p>
            <p>
              A dedicated <strong>Search tab</strong> provides real-time keyword
              filtering using <code>JFXTreeTableView</code>, displaying results
              in a sortable table with columns for ID, Name, IMDB Rating,
              Category, Franchise, Producer, and Studio.
            </p>
          </AutoAdjustingSection>

          {/* ─── Topic: Architecture ─── */}
          <Topic topicName="Architecture" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 sm:gap-3 items-stretch">
            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                UI Design
              </h2>
              {getItem(2) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(2)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  All UI layouts were created visually using{" "}
                  <strong>JavaFX Scene Builder</strong>, producing FXML files
                  that cleanly separate layout from logic. The main window uses
                  a nested <strong>TabPane</strong> architecture with dedicated
                  tabs for movie browsing, TV series browsing, search, and
                  management operations.
                </p>
              </div>
            </FloatingSection>

            <FloatingSection className="flex flex-col">
              <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                Project Structure
              </h2>
              {getItem(3) && (
                <div className="mb-3 flex justify-center">
                  <ImageDoc image={getItem(3)!} onOpen={handleOpen} />
                </div>
              )}
              <div className="text-justify space-y-3 flex-1">
                <p>
                  The codebase follows a clean separation of concerns with
                  distinct layers: <strong>model classes</strong> (Movie,
                  Franchise, Producer, Studio, Actor),{" "}
                  <strong>UI controllers</strong> bound to FXML views,{" "}
                  <strong>database helpers</strong> for MySQL queries, and{" "}
                  <strong>coding utilities</strong> including a singleton DB
                  connection manager and <code>RecursiveTreeItem</code> pattern
                  for hierarchical table views.
                </p>
              </div>
            </FloatingSection>
          </div>

          {/* ─── Topic: Database ─── */}
          <Topic topicName="Database" />

          <FloatingSection>
            <h2 className="text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              MySQL Schema
            </h2>
            <div className="text-justify space-y-4">
              <p>
                The application uses a <strong>MySQL</strong> relational
                database with a normalized schema. The core{" "}
                <strong>movies</strong> table stores ID, name, description, IMDB
                rating, category, and poster image as a binary BLOB, along with
                foreign keys to supporting tables: <strong>franchises</strong>,{" "}
                <strong>producers</strong>, and <strong>studios</strong> — each
                with their own ID, name, and description fields. The studios
                table additionally tracks a founding date. Model classes for
                actors, characters, and fans also exist in the codebase for
                future expansion.
              </p>
              <p>
                A <strong>first-run setup wizard</strong> guides the user
                through MySQL connection configuration — host, port, username,
                and password — and persists the credentials as JSON in a local{" "}
                <code>config.txt</code> file. The{" "}
                <strong>singleton connection manager</strong> (
                <code>MyConn</code>) reads this configuration on startup,
                establishing a single shared database connection for all
                operations throughout the application lifecycle.
              </p>
            </div>
          </FloatingSection>

          {/* ─── Topic: Technology Stack ─── */}
          <Topic topicName="Technology Stack" />

          <FloatingSection>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "Java",
                "JavaFX",
                "JFoenix",
                "MySQL",
                "Scene Builder",
                "NetBeans IDE",
                "Apache Ant",
                "CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </span>
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

export default Project_MoviesSoftware;
