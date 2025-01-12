"use client";

import { ChatSection } from "@/components/chatsection";
import { ChatSectionContext } from "./chatSectionContextProvider";
import { Chat, Message } from "@/lib/models";
import { useState } from "react";
import {
  useChatService,
  useChatServiceCallbacks,
} from "@/services/chatService";

export default function ChatSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { registerCallbacks, requestChatList, sendMessage, sendAudioMessage } =
    useChatService();

  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useChatServiceCallbacks(
    {
      onChatListUpdate: requestChatList,
      onMessageReceived: (messages) => {
        for (const message of messages) {
          if (message.chatId === chat?.id) {
            setMessages((prevMessages) => [...prevMessages, message]);
          }
        }
      },
    },
    registerCallbacks
  );

  return (
    <ChatSectionContext.Provider
      value={{
        chat: chat,
        messages: messages,
        setChat: setChat,
        setMessages: setMessages,
      }}
    >
      <div className="w-full h-full flex">
        <div className="min-w-44 max-w-96 flex flex-col flex-1 border-r-2 pt-3">
          {children}
        </div>

        <ChatSection
          chat={chat}
          messages={messages}
          onSendMessage={(message) => chat && sendMessage(message, chat?.id)}
          onSendAudioMessage={(audioBlob) =>
            chat && sendAudioMessage(audioBlob, chat?.id)
          }
        />
      </div>
    </ChatSectionContext.Provider>
  );
}
