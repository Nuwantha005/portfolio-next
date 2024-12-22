"use client";
import React from "react";
import { motion } from "framer-motion";
import FloatingSection from "@/components/ui/FloatingSection";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import Topic from "@/components/ui/Topic";
import { useTransitionRouter } from "next-view-transitions";

function Project_CommunicationSoftware() {
  const router = useTransitionRouter();
  return (
    <div>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center">
          <div className="flex flex-row gap-4 items-center justify-between ml-2 w-full">
            <button
              onClick={() => {
                router.back();
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
                    src="/Images/Projects/Communication_SOftware_HomePage.PNG"
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
                    database. The UI was designed using NetBeans IDE's
                    drag-and-drop UI designer. The MySQL workbench was used to
                    manage the database.
                  </p>
                </FloatingSection>
              </div>
              <div className="basis-1/4 justify-center">
                <FloatingSection>
                  <h1 className="text-2xl mb-4">Project Structure</h1>
                  <div className="flex flex-col gap-8 justify-center">
                    {/* <Image
                      loc="./Images/Projects/Communication_SOftware_ProjectTree.PNG"
                      name="Project Tree"
                      className="basis-1/2 "
                    /> */}
                  </div>
                </FloatingSection>
              </div>
            </div>
            <FloatingSection>
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div className="xl:col-span-1 2xl:col-span-1">
                  <h1 className="text-2xl mb-4">Database Structure</h1>
                  {/* <Image
                    loc=".\Images\Projects\CommunicationEER.PNG"
                    name="EER Diagram"
                  /> */}
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
                  {/* <Image
                    loc=".\Images\Projects\Communication_SOftware_Chart.PNG"
                    name="Chart Window"
                  /> */}
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
                  {/* <Image
                    loc=".\Images\Projects\Communication_Software_Jasper_Report.png"
                    name="Sales Chart"
                  /> */}
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
                  {/* <Image
                    loc=".\Images\Projects\Communication_SOftware_BarCode_AndQR_Code.PNG"
                    name="Generated Barcodes"
                  /> */}
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
                  {/* <Image
                    loc=".\Images\Projects\Communication_SOftware_Windows.PNG"
                    name="Viewing Data"
                  /> */}
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Project_CommunicationSoftware;
