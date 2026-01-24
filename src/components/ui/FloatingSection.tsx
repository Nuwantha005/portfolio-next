import { cn } from "@/lib/utils";

const FloatingSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "bg-slate-400/50 dark:bg-slate-900/50 flex flex-col shadow-lg rounded-lg p-3 sm:p-4 md:p-6 hover:shadow-2xl transition duration-300 border sm:border-2 border-gray-800 dark:border-gray-200 backdrop-blur-sm text-left",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default FloatingSection;
