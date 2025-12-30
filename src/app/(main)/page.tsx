import Home from "@/components/home/HomeContent";
import MainLayout from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <MainLayout currentPath="/">
      <Home />
    </MainLayout>
  );
}
