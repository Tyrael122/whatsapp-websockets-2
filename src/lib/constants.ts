import {
  MessageCirclePlus,
  MessageSquareText,
  Phone,
} from "lucide-react";

export enum Routes {
  CHATS = "chats",
  GROUP_CREATION = "groups",
  CALLS = "calls",
  LOGIN = "login",
}

export const menuItems = [
  {
    icon: MessageSquareText,
    route: Routes.CHATS,
    description: "Chats",
  },
  {
    icon: MessageCirclePlus,
    route: Routes.GROUP_CREATION,
    description: "Create group chat",
  },
  {
    icon: Phone,
    route: Routes.CALLS,
    description: "Calls",
  },
];