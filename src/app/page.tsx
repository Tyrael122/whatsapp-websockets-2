"use client";

import { ChatList } from "@/components/chatlist";
import { ChatSection } from "@/components/chatsection";
import { Chat, Message } from "@/lib/models";
import { useChatService } from "@/services/chatService";
import { useCallback, useState } from "react";

export default function ChatsPage() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleIncomingMessage = useCallback(
    (messages: Message[]) => {
      for (const message of messages) {
        console.log("Received message", message);
        console.log("Current chat", currentChat);

        if (message.chatId === currentChat?.id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      }
    },
    [currentChat]
  );

  const { sendMessage, selectChat, requestChatList } = useChatService({
    onMessageReceived: (messages) => {
      handleIncomingMessage(messages);
      requestChatList();
    },
    onChatListUpdate: handleChatListUpdate,
    onConnection: () => {
      requestChatList();
    },
  });

  return (
    <div className="w-full h-full flex">
      <ChatList
        chatlist={chatList}
        selectedChat={currentChat}
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

  function handleChatListUpdate(chats: Chat[]) {
    setChatList(chats);
  }
}
