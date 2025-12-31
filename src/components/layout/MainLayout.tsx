"use client";

import React, { useEffect } from "react";
import MainNavbar from "@/components/navbar/MainNavbar";
import Footer from "@/components/footer/Footer";
import { onRouteChanged } from "@/lib/use-view-transition";

interface MainLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function MainLayout({ children, currentPath }: MainLayoutProps) {
  useEffect(() => {
    onRouteChanged();
  }, [currentPath]);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <header 
        className="relative z-15 flex items-center top-0 m-2 w-screen justify-center"
        style={{ viewTransitionName: "navbar" }}
      >
        <MainNavbar currentPath={currentPath} />
      </header>
      <main 
        className="relative z-10 p-1 w-full flex-1 overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]"
        style={{ viewTransitionName: "main-content" }}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
