"use client";

import { ChatList } from "@/components/chatlist";
import { ChatSection } from "@/components/chatsection";
import { Chat, Message } from "@/lib/models";
import { useChatService } from "@/services/chatService";
import { useState } from "react";

export default function ChatsPage() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage, selectChat, requestChatList } = useChatService({
    onMessageReceived: handleIncomingMessage,
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
            return;
          }

          setMessages([]);
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

  function handleIncomingMessage(messages: Message[]) {
    console.log("Received message", messages);

    // if (currentChat && message.chatId === currentChat.id) {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // } else {
    //   loadChatList();
    // }
    setMessages((prevMessages) => [...prevMessages, ...messages]);
  }

  function handleChatListUpdate(chats: Chat[]) {
    setChatList(chats);
  }
}
