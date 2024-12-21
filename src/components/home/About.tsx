import React from "react";
import { MdLocationPin } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import SocialDock from "./SocialDock";
import FloatingSection from "../ui/FloatingSection";

function About() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between justify-items-stretch content-center ">
      <FloatingSection>
        <img
          src="./Images/Profile.jpg"
          className="rounded-full aspect-square max-w-72 justify-self-center"
        />
      </FloatingSection>
      <div className="justify-self-stretch grow">
        <FloatingSection>
          <h1 className="text-bold text-3xl">About</h1>

          <p className="mt-4 text-sm sm:text-md">
            Hello, my name is Nuwantha Kumara. I'm a mechanical engineering
            undergraduate in University of Moratuwa.
          </p>
          <section className="mt-4 flex flex-row gap-2 content-center align-center max-h-20 grow">
            <MdLocationPin size={35} />{" "}
            <p className="text-sm self-center">Padukka</p>
          </section>
          <section className="mt-2 flex flex-row gap-2 content-center align-center max-h-20 ">
            <HiOutlineMail size={35} />{" "}
            <p className="text-sm self-center ">nuwanthakumara999@gmail.com</p>
          </section>
          <div className=" flex flex-row gap-2 content-center align-center justify-start">
            <SocialDock />
          </div>

          <div className="mt-4 flex flex-row justify-end">
            <a
              href="/resume.pdf" // Path to the resume file in the public folder
              download="Nuwantha Kumara CV.pdf" // The name of the file when downloaded
            >
              <button className="dark:bg-gray-300 bg-slate-800 dark:hover:bg-gray-400 hover:bg-slate-600 dark:text-gray-800 text-slate-50 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download CV</span>
              </button>
            </a>
          </div>
        </FloatingSection>
      </div>
    </div>
  );
}

export default About;
