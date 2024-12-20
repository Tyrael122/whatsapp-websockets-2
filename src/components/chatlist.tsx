"use client";

import { WhatsappAvatar } from "./avatar";
import { ScrollArea } from "./ui/scroll-area";
import { formatMessageDate } from "@/lib/utils";
import { Chat } from "@/lib/models";

export interface ChatListProps {
  chatlist: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export function ChatList({
  chatlist,
  selectedChat,
  onSelectChat,
}: ChatListProps) {
  return (
    <div className="min-w-44 max-w-96 flex flex-col flex-1 border-r-2 pt-3">
      <span className="font-bold text-xl pb-2 pl-3">Chats</span>
      <ScrollArea>
        {chatlist.map((chat) => {
          return (
            <div
              key={chat.id}
              className={`flex border-b-2 pl-4 py-2 cursor-pointer hover:bg-gray-100 ${
                chat === selectedChat ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                console.log(`Navigating to chat ${chat.id}`);
                onSelectChat(chat);
              }}
            >
              <WhatsappAvatar src={chat.avatarSrc} />
              <div className="w-full h-full px-3">
                <div className="w-full flex justify-between">
                  <span>{chat.name}</span>
                  <span className="text-muted-foreground pr-1 text-xs">
                    {chat.lastMessage
                      ? formatMessageDate(chat.lastMessage.timestamp)
                      : ""}
                  </span>
                </div>

                <span className="text-muted-foreground text-sm">
                  {chat.lastMessage ? chat.lastMessage.text : ""}
                </span>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
