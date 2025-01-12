"use client";

import { BottomBar } from "@/components/bottombar";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { useRedirection } from "./middleware";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useRedirection();

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen h-screen flex items-end sm:items-start">
          <Sidebar />
          {children}
          <BottomBar />
        </div>
      </body>
    </html>
  );
}
