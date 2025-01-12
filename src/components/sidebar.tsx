import { menuItems } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden sm:flex h-full flex-col p-4 gap-5 border-2">
      {menuItems.map((item, index) => {
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => router.replace(item.route)}
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
