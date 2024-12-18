import { menuItems } from "@/lib/constants";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export function Sidebar() {
  return (
    <div className="hidden sm:flex h-full flex-col p-4 gap-5 border-2">
      {menuItems.map((item) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="items-center flex">
                  <item.icon />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <span>{item.description}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
