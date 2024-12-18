import { JSX } from "react";

export type MenuItem = {
    icon: () => JSX.Element;
    description: string;
} 