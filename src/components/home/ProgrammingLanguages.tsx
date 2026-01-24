import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ProgrammingLanguages = () => {
  const logosRef = useRef<HTMLUListElement>(null);

  const imageArray = [
    { src: "./Images/svgIcons/icons8-c.svg", alt: "C++" },
    { src: "./Images/svgIcons/java-svgrepo-com.svg", alt: "Java" },
    { src: "./Images/svgIcons/matlab-svgrepo-com.svg", alt: "MATLAB" },
    { src: "./Images/svgIcons/icons8-solidworks-240.svg", alt: "SolidWorks" },
    { src: "./Images/svgIcons/icons8-autocad.svg", alt: "AutoCAD" },
    { src: "./Images/svgIcons/ANSS.D.svg", alt: "AnSYS" },
    { src: "./Images/svgIcons/python-svgrepo-com.svg", alt: "Python" },
    { src: "./Images/svgIcons/mysql-logo-svgrepo-com.svg", alt: "MySQL" },
    {
      src: "./Images/svgIcons/react-javascript-js-framework-facebook-svgrepo-com.svg",
      alt: "React",
    },
    { src: "./Images/svgIcons/arduino-svgrepo-com.svg", alt: "Arduino" },
    {
      src: "./Images/svgIcons/icons8-constructeur-de-scène.svg",
      alt: "SceneBuilder",
    },
    { src: "./Images/svgIcons/javascript-svgrepo-com.svg", alt: "JavaScript" },
    { src: "./Images/svgIcons/devicon--css3-wordmark.svg", alt: "CSS" },
    { src: "./Images/svgIcons/devicon--html5.svg", alt: "HTML5" },
    {
      src: "./Images/svgIcons/skill-icons--processing-light.svg",
      alt: "Processing",
    },
    { src: "./Images/svgIcons/logos--jupyter.svg", alt: "P5js" },
    { src: "./Images/svgIcons/logos--numpy.svg", alt: "Numpy" },
    { src: "./Images/svgIcons/devicon--matplotlib.svg", alt: "Matplotlib" },
    { src: "./Images/svgIcons/devicon--opencv.svg", alt: "OpenCV" },
    // Add more objects as needed
  ];

  useEffect(() => {
    // Duplicate the list for infinite scrolling effect
    const ul = logosRef.current;
    if (ul) {
      ul.insertAdjacentHTML("afterend", ul.outerHTML);
      if (ul.nextSibling) {
        (ul.nextSibling as HTMLElement).setAttribute("aria-hidden", "true");
      }
    }
  }, []);

  return (
    <main className="relative min-h-24 sm:min-h-32 flex flex-col justify-center align-middle rounded-3xl bg-slate-700/80 dark:bg-slate-900/80 overflow-hidden">
      <div className="w-11/12 mx-auto overflow-hidden align-slef-middle">
        <div className="text-center">
          {/* Logo Carousel animation */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul
              ref={logosRef}
              className="animate-marquee-infinite flex items-center align-middle justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
            >
              {imageArray.map((item, index) => (
                <li key={index} className="flex flex-col items-center">
                  <Image width={64} height={64} src={item.src} alt={item.alt} className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                  <span className="mt-1 sm:mt-2 text-white text-xs sm:text-sm">{item.alt}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* End: Logo Carousel animation */}
        </div>
      </div>
    </main>
  );
};

export default ProgrammingLanguages;
