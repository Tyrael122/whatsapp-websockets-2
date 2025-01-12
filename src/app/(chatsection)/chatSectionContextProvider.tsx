"use client";

import { Chat, Message } from "@/lib/models";
import { createContext, useContext } from "react";

interface ChatSectionContextType {
  chat: Chat | null;
  messages: Message[];
  setChat: (chat: Chat) => void;
  setMessages: (messages: Message[]) => void;
}

export const ChatSectionContext = createContext<
  ChatSectionContextType | undefined
>(undefined);

export const useChatSectionContext = (): ChatSectionContextType => {
  const context = useContext(ChatSectionContext);
  if (!context) {
    throw new Error(
      "useChatSectionContext must be used within a ChatSectionContextProvider"
    );
  }
  return context;
};
