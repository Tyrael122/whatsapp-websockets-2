"use client";

import { ChatList } from "@/components/chatlist";
import { ChatSection } from "@/components/chatsection";
import { Chat, Message } from "@/lib/models";
import {
  getChats,
  getMessagesFromChat,
  sendMessage,
} from "@/services/apiService";
import { useEffect, useState } from "react";

export default function ChatsPage() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadChatList();
  }, []);

  return (
    <div className="w-full h-full flex">
      <ChatList
        chatlist={chatList}
        selectedChat={currentChat}
        onSelectChat={(chat) => {
          setCurrentChat(chat);

          loadMessagesFromChat(chat);
        }}
      />

      <ChatSection
        chat={currentChat}
        messages={messages}
        sendMessage={(message) => {
          if (!currentChat) {
            return;
          }

          sendMessage(message).then(() => loadMessagesFromChat(currentChat));
        }}
      />
    </div>
  );

  function loadMessagesFromChat(chat: Chat) {
    getMessagesFromChat(chat.id.toString()).then((messages) => {
      setMessages(messages);
    });
  }

  function loadChatList() {
    getChats().then((chats) => {
      setChatList(chats);
    });
  }
}
