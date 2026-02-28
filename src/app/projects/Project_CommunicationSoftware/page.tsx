"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import Topic from "@/components/ui/Topic";
import LGComponent from "@/components/ui/LGComponent";
import ImageDoc from "@/components/ui/ImageDoc";
import ProjectPageLayout from "@/components/projects/ProjectPageLayout";

function Project_CommunicationSoftware() {
  return (
    <ProjectPageLayout
      title="Communication Software"
      fetchUrl="/projects/project_communication_software/images.json"
      projectSlug="projects/Project_CommunicationSoftware"
    >
      {(items, getItem, handleOpen) => (
        <>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="basis-3/4">
              <FloatingSection>
                <h1 className="text-base sm:text-lg mb-2 sm:mb-3">Overview</h1>
                <motion.img
                  layoutId="Communication Software_img"
                  style={{
                    cursor: "pointer",
                    border: "4px solid gray",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleOpen(items[0].id)}
                  src="/Images/Projects/Communication_SOftware_HomePage.PNG"
                  alt="Landing Menu"
                  className="basis-1/2 border-gray-800 dark:border-gray-200"
                />
                <p className="text-sm sm:text-base text-left lg:basis-1/2">
                  This program was created as the final project for my course at
                  the ATARI city campus. It was a group project; however, it was
                  done all by myself as a test for my own skills. Project
                  assignment subject for our group changed later, and this was
                  never presented. I wrote it entirely using Java and my SQL
                  knowledge was used because MySQL was used as the database. The
                  UI was designed using NetBeans IDEs drag-and-drop UI designer.
                  The MySQL workbench was used to manage the database.
                </p>
              </FloatingSection>
            </div>
            <div className="basis-1/4 justify-center">
              <FloatingSection>
                <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                  Project Structure
                </h1>
                <div className="flex flex-col gap-8 justify-center">
                  <ImageDoc image={items[1]} onOpen={handleOpen} />
                </div>
              </FloatingSection>
            </div>
          </div>
          {items[2] && (
            <AutoAdjustingSection
              title="Database Structure"
              imageSrc={items[2].thumb}
              imageAlt="Database Structure"
              imagePosition="left"
              onImageClick={() => handleOpen(items[2].id)}
            >
              <p>
                Database contains tables to store on sales, products, services,
                suppliers, customers, and much more. Actions such as selling,
                adding items to inventory, buying from suppliers, and paying
                salaries to the staff can all be recorded in the database.
                respective relations between respective tables are drawn for
                examples between sales and inventory (stock table). Furthermore,
                suitable data types are assigned to each column.
              </p>
            </AutoAdjustingSection>
          )}
          <Topic topicName="Features" />
          {items[3] && (
            <AutoAdjustingSection
              title="Chart Generation"
              imageSrc={items[3].thumb}
              imageAlt="Chart Generation"
              imagePosition="left"
              onImageClick={() => handleOpen(items[3].id)}
            >
              <p>
                Charts section in the program can generate 2D and 3D charts for
                different data such as sales, income, inventory, and expenses.
                These charts can be in the form of line charts, bar charts, or
                pie charts. A date range can be selected to plot the data, and
                usually data values are plotted against date. Generated charts
                can be saved as images to local storage.
                <a
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  href="https://www.jfree.org/jfreechart/"
                >
                  {" "}
                  JFree Charts
                </a>{" "}
                and{" "}
                <a
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  href="https://github.com/jfree/orson-charts"
                >
                  Orson-Charts
                </a>{" "}
                libraries were used to generate charts.
              </p>
            </AutoAdjustingSection>
          )}
          {items[4] && (
            <AutoAdjustingSection
              title="Printable Reports Generation"
              imageSrc={items[4].thumb}
              imageAlt="Printable Reports Generation"
              imagePosition="left"
              onImageClick={() => handleOpen(items[4].id)}
            >
              <p>
                For several tables, data can be exported to a report, and
                physical copies can be obtained through printing them. These
                reports are of two kinds: detailed reports and simple reports.
                <a
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  href="https://github.com/TIBCOSoftware/jasperreports"
                >
                  {" "}
                  Jasper reports
                </a>{" "}
                was used to export these data and generate their reports through
                the library. Apart from reports, invoices can also be generated
                for customers and suppliers through the same techniques.
              </p>
            </AutoAdjustingSection>
          )}
          {items[5] && (
            <AutoAdjustingSection
              title="Barcode and QR Generation"
              imageSrc={items[5].thumb}
              imageAlt="Barcode and QR Generation"
              imagePosition="left"
              onImageClick={() => handleOpen(items[5].id)}
            >
              <p>
                If necessary, barcodes and QR codes for each product can be
                generated through the software itself without using external
                sources. The user will have to enter the text, which should be
                represented by a field and the number of barcode rows required.
                The same procedure is applied for QR codes, but they require
                width and height dimensions. These barcodes and QR codes can be
                attached to products, and they can be scanned by the cashier
                when sales occur.
              </p>
            </AutoAdjustingSection>
          )}
          {items[6] && (
            <AutoAdjustingSection
              title="Data Viewing, Filtering and Editing"
              imageSrc={items[6].thumb}
              imageAlt="Data Viewing, Filtering and Editing"
              imagePosition="left"
              onImageClick={() => handleOpen(items[6].id)}
            >
              <p>
                All types of data that were entered, such as sales, inventory,
                incomes, expenses, services, and standard attendance, can be
                viewed and edited. Apart from that, static data such as
                customer, supplier, or staff details can be viewed and edited as
                well. For more important data entries, such as sales, many
                methods of searching are available, such as using date, time,
                sales amount, and discount provided. Data can also be ascended
                or descended according to these column values.
              </p>
            </AutoAdjustingSection>
          )}

          {/* Gallery at bottom — hidden on 2xl */}
          <div className="2xl:hidden">
            <Topic topicName="Images" />
            <FloatingSection>
              <LGComponent items={items} />
            </FloatingSection>
          </div>
        </>
      )}
    </ProjectPageLayout>
  );
}

export default Project_CommunicationSoftware;
