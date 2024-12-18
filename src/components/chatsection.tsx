"use client";

import { Chat, Message } from "@/lib/models";
import { WhatsappAvatar } from "./avatar";
import { InputBar } from "./inputbar";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useRef } from "react";

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
    <div className="hidden sm:flex flex-col flex-[2] h-full">
      <TopChatBar chatName={chat.name} avatarSrc={chat.avatarSrc} />
      <MessageList messages={messages} />
      <InputBar
        onSend={(messageText) => {
          console.log("Message received: " + messageText);
          sendMessage(messageText);
        }}
      />
    </div>
  );

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

  function MessageList({ messages }: Readonly<{ messages: Message[] }>) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (scrollAreaRef.current) {
        const scrollArea = scrollAreaRef.current;
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, [messages]);

    return (
      <ScrollArea ref={scrollAreaRef}>
        <div className="flex flex-col gap-4 flex-1 p-4">
          {messages.map((message, index) => {
            const isFromMe = message.from === "Alice";

            return (
              <div
                key={index}
                className={`${isFromMe ? "justify-end" : ""} flex gap-2`}
              >
                <div
                  className={`flex flex-col ${
                    isFromMe ? "bg-green-400" : "bg-gray-300"
                  } rounded-lg p-2`}
                >
                  <span>{message.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    );
  }
}
