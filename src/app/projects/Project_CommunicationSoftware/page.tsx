"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import Topic from "@/components/ui/Topic";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
//import fjGallery from "flickr-justified-gallery";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "@/app/projects/galleryStyle.css";
import ImageDoc from "@/components/ui/ImageDoc";

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
      fetch("./Images/Projects/Project_CommunicationSoftware/images.json")
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
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center">
          <div className="flex flex-row gap-4 items-center justify-between ml-2 w-full">
            <button
              onClick={() => {
                window.history.back();
              }}
              className="text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
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
              className="text-4xl"
            >
              Communication Software
            </motion.p>
            <ThemeToggle />
          </div>
        </header>
        {/* Floating Tiles Content */}
        <main className="relative z-10 w-full overflow-y-auto overflow-x-hidden h-full">
          <div className="relative z-10 p-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="basis-3/4">
                <FloatingSection>
                  <h1 className="text-2xl mb-4">Overview</h1>
                  <motion.img
                    layoutId="Communication Software_img"
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpen(images[0].id)}
                    src="./Images/Projects/Communication_SOftware_HomePage.PNG"
                    alt="Landing Menu"
                    className="basis-1/2"
                  />
                  <p className="p-4 m-4 text-center lg:text-left lg:basis-1/2">
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
                  <h1 className="text-2xl mb-4">Project Structure</h1>
                  <div className="flex flex-col gap-8 justify-center">
                    <ImageDoc image={images[1]} onOpen={onOpen} />
                  </div>
                </FloatingSection>
              </div>
            </div>
            <FloatingSection>
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div className="xl:col-span-1 2xl:col-span-1">
                  <h1 className="text-2xl mb-4">Database Structure</h1>
                  <ImageDoc image={images[2]} onOpen={onOpen} />
                </div>
                <p className="m-4 p-5 text-center lg:text-left lg:basis-1/2">
                  Database contains tables to store on sales, products,
                  services, suppliers, customers, and much more. Actions such as
                  selling, adding items to inventory, buying from suppliers, and
                  paying salaries to the staff can all be recorded in the
                  database. respective relations between respective tables are
                  drawn for examples between sales and inventory (stock table).
                  Furthermore, suitable data types are assigned to each column.
                </p>
              </div>
            </FloatingSection>
            <Topic topicName="Features" />
            <FloatingSection>
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div className="xl:col-span-1 2xl:col-span-1">
                  <h1 className="text-2xl mb-4">Chart Generation</h1>
                  <ImageDoc image={images[3]} onOpen={onOpen} />
                </div>
                <p className="m-4 p-5 text-center lg:text-left lg:basis-1/2">
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
              </div>
            </FloatingSection>
            <FloatingSection>
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div className="xl:col-span-1 2xl:col-span-1">
                  <h1 className="text-2xl mb-4">
                    Printable Reports Generation
                  </h1>
                  <ImageDoc image={images[4]} onOpen={onOpen} />
                </div>
                <p className="m-4 p-5 text-center lg:text-left lg:basis-1/2">
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
              </div>
            </FloatingSection>
            <FloatingSection>
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div className="xl:col-span-1 2xl:col-span-1">
                  <h1 className="text-2xl mb-4">Barcode and QR Generation</h1>
                  <ImageDoc image={images[5]} onOpen={onOpen} />
                </div>
                <p className="m-4 p-5 text-center lg:text-left lg:basis-1/2">
                  If necessary, barcodes and QR codes for each product can be
                  generated through the software itself without using external
                  sources. The user will have to enter the text, which should be
                  represented by a field and the number of barcode rows
                  required. The same procedure is applied for QR codes, but they
                  require width and height dimensions. These barcodes and QR
                  codes can be attached to products, and they can be scanned by
                  the cashier when sales occur.
                </p>
              </div>
            </FloatingSection>
            <FloatingSection>
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div className="xl:col-span-1 2xl:col-span-1">
                  <h1 className="text-2xl mb-4">
                    Data Viewing, Filtering and Editing
                  </h1>
                  <ImageDoc image={images[6]} onOpen={onOpen} />
                </div>
                <p className="m-4 p-5 text-center md:text-left md:basis-1/2">
                  All types of data that were entered, such as sales, inventory,
                  incomes, expenses, services, and standard attendance, can be
                  viewed and edited. Apart from that, static data such as
                  customer, supplier, or staff details can be viewed and edited
                  as well. For more important data entries, such as sales, many
                  methods of searching are available, such as using date, time,
                  sales amount, and discount provided. Data can also be ascended
                  or descended according to these column values.
                </p>
              </div>
            </FloatingSection>
            <Topic topicName="Images" />
            <FloatingSection>
              <LightGallery
                onInit={onInit}
                elementClassNames={"gallery fj-gallery"}
                dynamic={true}
                hash={false}
                rotate={false}
                plugins={[lgZoom, lgThumbnail]}
                dynamicEl={images.map((image) => ({
                  src: image.loc,
                  thumb: image.thumb,
                }))}
              ></LightGallery>
              <div className="">
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
        </main>
      </div>
    </div>
  );
}

export default Project_CommunicationSoftware;
