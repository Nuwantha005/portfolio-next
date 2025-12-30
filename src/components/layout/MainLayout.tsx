"use client";

import React from "react";
import MainNavbar from "@/components/navbar/MainNavbar";
import Footer from "@/components/footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function MainLayout({ children, currentPath }: MainLayoutProps) {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <header 
        className="relative z-15 flex items-center top-0 m-2 w-screen justify-center"
        style={{ viewTransitionName: "navbar" }}
      >
        <MainNavbar currentPath={currentPath} />
      </header>
      <main 
        className="relative z-10 p-1 w-full overflow-y-auto overflow-x-hidden h-full"
        style={{ viewTransitionName: "main-content" }}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
