import { motion } from "framer-motion";
import ThemeToggle from "../navbar/ThemeToggle";

interface ProjectTitleBarProps {
  title: string;
  scrollProgress?: number; // 0–1
}

const ProjectTitleBar: React.FC<ProjectTitleBarProps> = ({
  title,
  scrollProgress,
}) => {
  return (
    <header className="relative z-15 flex flex-row items-center top-0 m-2 w-screen justify-center overflow-hidden">
      {/* Scroll progress fill */}
      {scrollProgress !== undefined && scrollProgress > 0 && (
        <div
          className="absolute inset-0 bg-blue-500/30 dark:bg-blue-500/25 transition-[width] duration-150 ease-out pointer-events-none rounded-lg"
          style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
        />
      )}
      {/* Progress bar thin line at bottom */}
      {scrollProgress !== undefined && scrollProgress > 0 && (
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-[width] duration-150 ease-out pointer-events-none"
          style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
        />
      )}
      <div className="flex flex-row gap-2 sm:gap-4 items-center justify-between ml-2 w-full px-2 sm:px-4 relative z-10">
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
          layoutId={`${title}_title`}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center flex-1"
        >
          {title}
        </motion.p>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default ProjectTitleBar;
