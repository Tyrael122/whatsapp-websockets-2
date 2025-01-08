"use client";

import { ChatSection } from "@/components/chatsection";
import { LeftSideRoute, LeftSideRouter } from "@/components/leftSideRouter";
import { Chat, Message } from "@/lib/models";
import {
  useChatService,
  useChatServiceCallbacks,
} from "@/services/chatService";
import { useCallback, useState } from "react";
import { useLayoutContext } from "./contextProvider";

export default function App() {
  const { setCurrentRoute } = useLayoutContext();

  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { updateCallbacks, sendMessage, selectChat, requestChatList } =
    useChatService(() => requestChatList().then(setChatList));

  const handleChatListUpdate = useCallback(() => {
    requestChatList().then((chatList) => {
      console.log("Chat list updated", chatList);
    });
  }, [requestChatList]);

  const handleIncomingMessage = useCallback(
    (messages: Message[], currentChatId?: string) => {
      console.log("Incoming messages", messages);

      for (const message of messages) {
        if (message.chatId === currentChatId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      }

      requestChatList().then((chatList) => {
        console.log("Chat list updated", chatList);
        setChatList(chatList);
      });
    },
    [requestChatList]
  );

  useChatServiceCallbacks(
    {
      onMessageReceived: useCallback(
        (messages) => {
          handleIncomingMessage(messages, currentChat?.id);
        },
        [currentChat]
      ),
      onChatListUpdate: setChatList,
    },

    updateCallbacks
  );

  return (
    <div className="w-full h-full flex">
      <LeftSideRouter
        chatListProps={{
          chatlist: chatList,
          selectedChatId: currentChat?.id,
          onSelectChat: (chat) => {
            if (currentChat?.id === chat.id) {
              console.log("Already in chat", chat.id);
              return;
            }

            setMessages([]);

            console.log("Navigating to chat", chat);

            setCurrentChat(chat);

            selectChat(chat.id).then((messages) => {
              console.log("Messages received", messages);
              handleIncomingMessage(messages, chat.id);
            });
          },
        }}
        groupCreationProps={{
          onCreateGroup: () => {
            handleChatListUpdate();

            setCurrentRoute(LeftSideRoute.CHATS);
          },
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
