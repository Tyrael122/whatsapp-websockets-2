"use client";

import { ChatList } from "@/components/chatlist";
import { ChatSection } from "@/components/chatsection";
import { Button } from "@/components/ui/button";
import { Chat, Message } from "@/lib/models";
import {
  useChatService,
  useChatServiceCallbacks,
} from "@/services/chatService";
import { useCallback, useState } from "react";

export default function ChatsPage() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatListUpdate = useCallback(setChatList, []);

  const { updateOnMessageCallback, sendMessage, selectChat, requestChatList } =
    useChatService(() => requestChatList());

  const handleIncomingMessage = useCallback(
    (messages: Message[]) => {
      console.log("Current chat id at handleIncomingMessage", currentChat?.id);

      for (const message of messages) {
        if (message.chatId === currentChat?.id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      }

      requestChatList();
    },
    [currentChat, requestChatList]
  );

  useChatServiceCallbacks(
    {
      onMessageReceived: handleIncomingMessage,
      onChatListUpdate: handleChatListUpdate,
    },
    updateOnMessageCallback
  );

  return (
    <div className="w-full h-full flex">
      <ChatList
        chatlist={chatList}
        selectedChatId={currentChat?.id}
        onSelectChat={(chat) => {
          if (currentChat?.id === chat.id) {
            console.log("Already in chat", chat.id);
            return;
          }

          setMessages([]);

          console.log("Navigating to chat", chat);

          setCurrentChat(chat);

          selectChat(chat.id);
        }}
      />

      <ChatSection
        chat={currentChat}
        messages={messages}
        sendMessage={(message) => {
          if (!currentChat) {
            return;
          }

          sendMessage(message);
        }}
      />
    </div>
  );
}
