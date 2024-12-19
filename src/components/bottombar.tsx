import { menuItems } from "@/lib/constants";
import { Button } from "./ui/button";
import Link from "next/link";

export function BottomBar() {
  return (
    <div className="flex min-w-full justify-evenly border-2 p-3 sm:hidden">
      {menuItems.map((item, index) => {
        return (
          <Link href="/" key={index} className="items-center flex flex-col">
            <Button
              variant="ghost"
              size="icon"
              key={item.description}
              className="flex flex-col"
            >
              <item.icon />
            </Button>

            <span>{item.description}</span>
          </Link>
        );
      })}
    </div>
  );
}
