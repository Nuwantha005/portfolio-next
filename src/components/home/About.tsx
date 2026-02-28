import React from "react";
import { MdLocationPin } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import SocialDock from "./SocialDock";
import FloatingSection from "../ui/FloatingSection";
import Image from "next/image";

function About() {
  return (
    <div
      id="about"
      className="flex flex-col sm:flex-row gap-4 justify-between justify-items-stretch content-center "
    >
      <FloatingSection className="flex justify-center items-center sm:items-stretch">
        <Image
          src="./Images/Profile.jpg"
          alt="Profile"
          width={288}
          height={288}
          className="rounded-full aspect-square max-w-48 sm:max-w-60 md:max-w-72 mx-auto"
        />
      </FloatingSection>
      <div className="justify-self-stretch grow">
        <FloatingSection>
          <h1 className="text-bold text-2xl sm:text-3xl">About</h1>

          <p className="mt-4 text-sm sm:text-md">
            Hello, my name is Nuwantha Kumara. I&apos;m a mechanical engineering
            undergraduate in University of Moratuwa.
          </p>
          <section className="mt-4 flex flex-row gap-2 content-center align-center max-h-20 grow">
            <MdLocationPin className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />{" "}
            <p className="text-sm self-center">Padukka</p>
          </section>
          <section className="mt-2 flex flex-row gap-2 content-center align-center max-h-20 ">
            <HiOutlineMail className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />{" "}
            <p className="text-xs sm:text-sm self-center break-all">
              nuwanthakumara999@gmail.com
            </p>
          </section>
          <div className=" flex flex-row gap-2 content-center align-center justify-start">
            <SocialDock />
          </div>

          <div className="mt-4 flex flex-row justify-end">
            <a href="/resume.pdf" download="Nuwantha Kumara CV.pdf">
              <button className="dark:bg-gray-300 bg-slate-800 dark:hover:bg-gray-400 hover:bg-slate-600 dark:text-gray-800 text-slate-50 font-bold py-2 px-3 sm:px-4 rounded inline-flex items-center text-sm sm:text-base">
                <svg
                  className="fill-current w-3 h-3 sm:w-4 sm:h-4 mr-2"
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
