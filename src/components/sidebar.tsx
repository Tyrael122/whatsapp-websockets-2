import { menuItems } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { LeftSideRoute } from "./leftSideRouter";

export function Sidebar({
  onRouteChange,
}: Readonly<{ onRouteChange: (route: LeftSideRoute) => void }>) {
  return (
    <div className="hidden sm:flex h-full flex-col p-4 gap-5 border-2">
      {menuItems.map((item, index) => {
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => onRouteChange(item.route)}
                >
                  <item.icon />
                </div>
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
