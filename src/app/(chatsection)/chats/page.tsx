"use client";

import { extractAudioDuration, formatMessageDate } from "@/lib/utils";
import { Chat } from "@/lib/models";
import { Mic } from "lucide-react";
import { WhatsappAvatar } from "@/components/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useChatService } from "@/services/chatService";
import { useChatSectionContext } from "../chatSectionContextProvider";

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([]);

  const { selectChat, requestChatList } = useChatService(() =>
    requestChatList().then(setChatList)
  );

  const {
    chat: currentChat,
    messages,
    setChat,
    setMessages,
  } = useChatSectionContext();

  useEffect(() => {
    requestChatList().then(setChatList);
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <span className="font-bold text-xl pb-2 pl-3">Chats</span>
      <ScrollArea>
        {chatList.map((chat) => {
          return (
            <div
              key={chat.id}
              className={`flex border-b-2 pl-4 py-2 h-16 cursor-pointer hover:bg-gray-100 ${
                chat.id === currentChat?.id ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                console.log(`Navigating to chat ${chat.id}`);

                setChat(chat);

                selectChat(chat.id).then((messages) => {
                  console.log("Selected chat", chat.id, messages);
                  setMessages(messages);
                });
              }}
            >
              <WhatsappAvatar src={chat.avatarSrc} />
              <div className="flex flex-col justify-between w-full h-full px-3">
                <div className="w-full flex justify-between">
                  <span>{chat.name}</span>
                  <span className="text-muted-foreground pr-1 text-xs">
                    {chat.lastMessage
                      ? formatMessageDate(chat.lastMessage.timestamp)
                      : ""}
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground text-sm gap-x-1">
                  {chat.lastMessage?.isAudio ? (
                    <>
                      <Mic className="w-4 h-4" />
                      {extractAudioDuration(chat.lastMessage.message)}
                    </>
                  ) : (
                    chat.lastMessage?.message
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
