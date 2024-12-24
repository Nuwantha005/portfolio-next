import React from "react";
import ProgrammingLanguages from "./ProgrammingLanguages";
import FloatingSection from "../ui/FloatingSection";

function Skills() {
  return (
    <FloatingSection>
      <h1 className="text-bold text-3xl">Skills</h1>
      <p className="m-4">
        This section list down some of software and technologies I&apos;m familiar
        with. They are the ones used for my projects I have listed in the other
        tab.
      </p>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-row">
        <div className="m-4">
          <h2 className="underline">Programming</h2>
          <li>Python</li>
          <li>Java</li>
          <li>JavaFX</li>
          <li>C++</li>
          <li>Javascript</li>
          <li>Processing</li>
          <li>Arduino</li>
          <li>CSS</li>
        </div>
        <div className="m-4">
          <h2 className="underline">Design Software</h2>
          <li>SolidWorks</li>
          <li>AutoCAD</li>
        </div>

        <div className="m-4">
          <h2 className="underline">Simulation</h2>
          <li>AnSYS Mechanical</li>
          <li>AnSYS Fluent</li>
          <li>MATLAB</li>
        </div>
        <div className="m-4">
          <h2 className="underline">Libraries and Tools</h2>
          <li>Jupyter Notebooks</li>
          <li>Numpy</li>
          <li>OpenCV</li>
          <li>MatplotLib</li>
        </div>
      </div>
      <div className="w-11/12  mx-auto px-4 md:px-6 py-12 ">
        <ProgrammingLanguages />
      </div>
    </FloatingSection>
  );
}

export default Skills;
