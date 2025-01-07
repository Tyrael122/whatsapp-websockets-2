"use client";

import { BottomBar } from "@/components/bottombar";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { LeftSideRoute } from "@/components/leftSideRouter";
import { useState } from "react";
import { LayoutContext } from "./contextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentRoute, setCurrentRoute] = useState<LeftSideRoute>(
    LeftSideRoute.CHATS
  );

  return (
    <html lang="en">
      <body>
        <LayoutContext.Provider value={{ currentRoute, setCurrentRoute }}>
          <div className="min-h-screen h-screen flex items-end sm:items-start">
            <Sidebar onRouteChange={setCurrentRoute} />
            {children}
            <BottomBar />
          </div>
        </LayoutContext.Provider>
      </body>
    </html>
  );
}
