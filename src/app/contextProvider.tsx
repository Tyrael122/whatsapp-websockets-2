"use client";

import { LeftSideRoute } from "@/components/leftSideRouter";
import { createContext, useContext } from "react";

interface LayoutContextType {
  currentRoute: LeftSideRoute | undefined;
  setCurrentRoute: (route: LeftSideRoute) => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};
