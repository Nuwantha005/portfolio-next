import { motion } from "framer-motion";
import ThemeToggle from "../navbar/ThemeToggle";

interface ProjectTitleBarProps {
  title: string;
}

const ProjectTitleBar: React.FC<ProjectTitleBarProps> = ({ title }) => {
  return (
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
        <motion.p layoutId={`${title}_title`} className="text-4xl">
          {title}
        </motion.p>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default ProjectTitleBar;
