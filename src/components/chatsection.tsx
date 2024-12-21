"use client";

import { WhatsappAvatar } from "./avatar";
import { InputBar } from "./inputbar";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useRef } from "react";
import { formatMessageTime } from "@/lib/utils";
import { Chat, Message } from "@/lib/models";

export interface ChatSectionProps {
  chat: Chat | null;
  messages: Message[];
  sendMessage: (message: string) => void;
}

export function ChatSection({ chat, messages, sendMessage }: ChatSectionProps) {
  if (!chat) {
    return null;
  }
  
  return (
    <div className="hidden sm:flex flex-col justify-between flex-[2] h-full">
      <TopChatBar chatName={chat.name} avatarSrc={chat.avatarSrc} />
      <MessageList isGroup={chat.isGroup} messages={messages} />
      <InputBar
        onSend={(messageText) => {
          sendMessage(messageText);
        }}
      />
    </div>
  );
}

function TopChatBar({
  chatName,
  avatarSrc,
}: Readonly<{ chatName: string; avatarSrc: string }>) {
  return (
    <div className="flex items-center gap-4 border-b-2 p-3">
      <WhatsappAvatar src={avatarSrc} />

      <span>{chatName}</span>
    </div>
  );
}

function MessageList({
  messages,
  isGroup,
}: Readonly<{ messages: Message[]; isGroup: boolean }>) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  console.log("Rendering message list");

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1">
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message) => {
          const shouldDisplayUsername = isGroup && !message.isFromMe;

          return (
            <div
              key={message.id}
              className={`${message.isFromMe ? "justify-end" : ""} flex gap-2`}
            >
              <div
                className={`flex flex-col ${
                  message.isFromMe ? "bg-green-400" : "bg-gray-300"
                } rounded-lg p-2 max-w-[75%]`}
              >
                <span className="font-bold">
                  {shouldDisplayUsername ? message.from : ""}
                </span>
                <span className="whitespace-pre-wrap">{message.text}</span>
                <span className="text-muted-foreground text-xs self-end">
                  {formatMessageTime(message.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
