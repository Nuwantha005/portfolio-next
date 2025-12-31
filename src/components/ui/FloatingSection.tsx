const FloatingSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-slate-200/50 dark:bg-slate-900/50 flex flex-col shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 border-2 border-gray-300 dark:border-gray-700 backdrop-blur-sm">
      {children}
    </section>
  );
};

export default FloatingSection;
