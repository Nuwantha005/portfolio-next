"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import AutoAdjustingSection from "@/components/ui/AutoAdjustingSection";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import Topic from "@/components/ui/Topic";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
//import fjGallery from "flickr-justified-gallery";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "@/app/projects/galleryStyle.css";
import ImageDoc from "@/components/ui/ImageDoc";
import Head from "next/head";
import Footer from "@/components/footer/Footer";

interface Images {
  id: number;
  loc: string;
  name: string;
  thumb: string;
}

function Project_CommunicationSoftware() {
  const [images, setImages] = useState<Images[]>([]);
  const lightGallery = useRef<LightGalleryInstance | null>(null);

  // LightGallery instance interface
  interface LightGalleryDetail {
    instance: LightGalleryInstance;
  }
  interface LightGalleryInstance {
    openGallery: (index: number) => void;
  }

  // Fetch images
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("/projects/project_communication_software/images.json")
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
        })
        .catch((err) => console.error("Failed to fetch images:", err));
    }
  }, []);

  // Initialize LightGallery
  const onInit = useCallback((detail: LightGalleryDetail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  // Initialize fjGallery
  useEffect(() => {
    if (typeof window !== "undefined") {
      const elements = document.querySelectorAll(".fj-gallery");
      if (elements.length > 0) {
        import("flickr-justified-gallery").then((fjGallery) => {
          fjGallery.default(elements, {
            itemSelector: ".fj-gallery-item",
            rowHeight: 180,
            maxRowsCount: 2,
            lastRow: "start",
            gutter: 2,
            rowHeightTolerance: 0.1,
            calculateItemsHeight: false,
          });
        });
      }
    }
  }, []);

  // Open LightGallery
  const onOpen = (index: number): void => {
    lightGallery.current?.openGallery(index);
  };
  return (
    <div>
      <Head>
        <title>Communication Software Project</title>
        <meta name="description" content="This is my portfolio website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center">
          <div className="flex flex-row gap-2 sm:gap-4 items-center justify-between ml-2 w-full px-2 sm:px-4">
            <button
              onClick={() => {
                window.history.back();
              }}
              className="text-lg flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <motion.p
              layoutId="Communication Software_title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center flex-1"
            >
              Communication Software
            </motion.p>
            <ThemeToggle />
          </div>
        </header>
        {/* Floating Tiles Content */}
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="basis-3/4">
                <FloatingSection>
                  <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4">Overview</h1>
                  <motion.img
                    layoutId="Communication Software_img"
                    style={{
                      cursor: "pointer",
                      border: "4px solid gray",
                      borderRadius: "8px",
                    }}
                    onClick={() => onOpen(images[0].id)}
                    src="/Images/Projects/Communication_SOftware_HomePage.PNG"
                    alt="Landing Menu"
                    className="basis-1/2 border-gray-800 dark:border-gray-200"
                  />
                  <p className="p-2 sm:p-4 m-2 sm:m-4 text-sm sm:text-base text-center lg:text-left lg:basis-1/2">
                    This program was created as the final project for my course
                    at the ATARI city campus. It was a group project; however,
                    it was done all by myself as a test for my own skills.
                    Project assignment subject for our group changed later, and
                    this was never presented. I wrote it entirely using Java and
                    my SQL knowledge was used because MySQL was used as the
                    database. The UI was designed using NetBeans IDEs
                    drag-and-drop UI designer. The MySQL workbench was used to
                    manage the database.
                  </p>
                </FloatingSection>
              </div>
              <div className="basis-1/4 justify-center">
                <FloatingSection>
                  <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4">Project Structure</h1>
                  <div className="flex flex-col gap-8 justify-center">
                    <ImageDoc image={images[1]} onOpen={onOpen} />
                  </div>
                </FloatingSection>
              </div>
            </div>
            {images[2] && (
              <AutoAdjustingSection
                title="Database Structure"
                imageSrc={images[2].thumb}
                imageAlt="Database Structure"
                imagePosition="left"
                onImageClick={() => onOpen(images[2].id)}
              >
                <p>
                  Database contains tables to store on sales, products,
                  services, suppliers, customers, and much more. Actions such as
                  selling, adding items to inventory, buying from suppliers, and
                  paying salaries to the staff can all be recorded in the
                  database. respective relations between respective tables are
                  drawn for examples between sales and inventory (stock table).
                  Furthermore, suitable data types are assigned to each column.
                </p>
              </AutoAdjustingSection>
            )}
            <Topic topicName="Features" />
            {images[3] && (
              <AutoAdjustingSection
                title="Chart Generation"
                imageSrc={images[3].thumb}
                imageAlt="Chart Generation"
                imagePosition="left"
                onImageClick={() => onOpen(images[3].id)}
              >
                <p>
                  Charts section in the program can generate 2D and 3D charts
                  for different data such as sales, income, inventory, and
                  expenses. These charts can be in the form of line charts, bar
                  charts, or pie charts. A date range can be selected to plot
                  the data, and usually data values are plotted against date.
                  Generated charts can be saved as images to local storage.
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
            {images[4] && (
              <AutoAdjustingSection
                title="Printable Reports Generation"
                imageSrc={images[4].thumb}
                imageAlt="Printable Reports Generation"
                imagePosition="left"
                onImageClick={() => onOpen(images[4].id)}
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
                  was used to export these data and generate their reports
                  through the library. Apart from reports, invoices can also be
                  generated for customers and suppliers through the same
                  techniques.
                </p>
              </AutoAdjustingSection>
            )}
            {images[5] && (
              <AutoAdjustingSection
                title="Barcode and QR Generation"
                imageSrc={images[5].thumb}
                imageAlt="Barcode and QR Generation"
                imagePosition="left"
                onImageClick={() => onOpen(images[5].id)}
              >
                <p>
                  If necessary, barcodes and QR codes for each product can be
                  generated through the software itself without using external
                  sources. The user will have to enter the text, which should be
                  represented by a field and the number of barcode rows
                  required. The same procedure is applied for QR codes, but they
                  require width and height dimensions. These barcodes and QR
                  codes can be attached to products, and they can be scanned by
                  the cashier when sales occur.
                </p>
              </AutoAdjustingSection>
            )}
            {images[6] && (
              <AutoAdjustingSection
                title="Data Viewing, Filtering and Editing"
                imageSrc={images[6].thumb}
                imageAlt="Data Viewing, Filtering and Editing"
                imagePosition="left"
                onImageClick={() => onOpen(images[6].id)}
              >
                <p>
                  All types of data that were entered, such as sales, inventory,
                  incomes, expenses, services, and standard attendance, can be
                  viewed and edited. Apart from that, static data such as
                  customer, supplier, or staff details can be viewed and edited
                  as well. For more important data entries, such as sales, many
                  methods of searching are available, such as using date, time,
                  sales amount, and discount provided. Data can also be ascended
                  or descended according to these column values.
                </p>
              </AutoAdjustingSection>
            )}
            <Topic topicName="Images" />
            <FloatingSection>
              <LightGallery
                onInit={onInit}
                elementClassNames={"gallery fj-gallery"}
                dynamic={true}
                hash={false}
                rotate={true}
                plugins={[lgZoom, lgThumbnail]}
                dynamicEl={images.map((image) => ({
                  src: image.loc,
                  thumb: image.thumb,
                }))}
                zoomFromOrigin={true}
                rotateLeft={true}
                rotateRight={true}
              ></LightGallery>
              <div>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                  <Masonry gutter="10px">
                    {images.map((image, index) => (
                      <ImageDoc key={index} image={image} onOpen={onOpen} />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            </FloatingSection>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Project_CommunicationSoftware;
