import { motion } from "framer-motion";
import ThemeToggle from "../navbar/ThemeToggle";

interface ProjectTitleBarProps {
  title: string;
}

const ProjectTitleBar: React.FC<ProjectTitleBarProps> = ({ title }) => {
  return (
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
        <motion.p layoutId={`${title}_title`} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center flex-1">
          {title}
        </motion.p>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default ProjectTitleBar;
