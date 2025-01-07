import { LeftSideRoute } from "@/components/leftSideRouter";
import {
  MessageCirclePlus,
  MessageSquareText,
  Phone,
} from "lucide-react";

export const menuItems = [
  {
    icon: MessageSquareText,
    route: LeftSideRoute.CHATS,
    description: "Chats",
  },
  {
    icon: MessageCirclePlus,
    route: LeftSideRoute.GROUP_CREATION,
    description: "Create group chat",
  },
  {
    icon: Phone,
    route: LeftSideRoute.CALLS,
    description: "Calls",
  },
];
