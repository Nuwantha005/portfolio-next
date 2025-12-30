import Projects from "@/components/projects/ProjectsContent";
import MainLayout from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <MainLayout currentPath="/projects">
      <Projects />
    </MainLayout>
  );
}
