import { JSX } from "react";

export type MenuItem = {
  icon: () => JSX.Element;
  description: string;
};

export interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  avatarSrc: string;
  lastMessage?: Message;
}

export interface Message {
  id: number;
  chatId: string;
  from: string;
  isFromMe: boolean;
  text: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  avatarSrc: string;
}

export interface GroupCreationInfo {
  name: string;
  userIds: string[];
  avatarSrc?: string;
}