import {
  ChatDTO,
  IncomingEventType,
  MessageDTO,
  OutgoingEventType,
} from "@/lib/dtos";
import { Chat, Message } from "@/lib/models";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface UseChatServiceReturn {
  sendMessage: (message: string) => void;
  selectChat: (chatId: string) => void;
  requestChatList: () => void;
}

export interface UseChatServiceCallbacks {
  onMessageReceived: (messages: Message[]) => void;
  onChatListUpdate: (chatList: Chat[]) => void;
  onConnection: () => void;
}

export const useChatService = (
  callbacks: UseChatServiceCallbacks
): UseChatServiceReturn => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  if (!userId) {
    throw new Error("userId is required");
  }

  const [chatId, setChatId] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    createWebSocketConnection(setSocket, userId, callbacks);
  }, []);

  useEffect(() => {
    if (socket) {
      callbacks.onConnection();
    }
  }, [socket]);

  function requestChatList() {
    const request = JSON.stringify({
      type: IncomingEventType.CHAT_LIST_REQUEST,
      userId: userId,
    });

    console.log("Sending chat list request", request);

    socket?.send(request);
  }

  function selectChat(chatId: string) {
    const request = JSON.stringify({
      type: IncomingEventType.GET_CHAT_MESSAGES,
      chatId: chatId,
    });

    console.log("Requesting chat messages", request);

    socket?.send(request);

    setChatId(chatId);
  }

  function sendMessage(message: string) {
    const request = JSON.stringify({
      type: IncomingEventType.SEND_MESSAGE,
      chatId: chatId,
      from: userId,
      message: message,
    });

    console.log("Sending message", request);

    socket?.send(request);
  }

  return { sendMessage, selectChat, requestChatList };
};

function createWebSocketConnection(
  onConnection: (socket: WebSocket) => void,
  currentUserId: string,
  callbacks: UseChatServiceCallbacks
) {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("WebSocket connection established");
    onConnection(ws);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleIncomingEvent(data, currentUserId, callbacks);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  // Cleanup the WebSocket connection when the component unmount
  return () => {
    if (ws) {
      ws.close();
    }
  };
}

function handleIncomingEvent(
  data: any,
  currentUserId: string,
  { onMessageReceived, onChatListUpdate }: UseChatServiceCallbacks
) {
  console.log("Received event", data);

  if (data.type === OutgoingEventType.CHAT_LIST_RESPONSE) {
    const chatsDTOs = data.chats as ChatDTO[];

    const chats = chatsDTOs.map((chatDTO) => ({
      ...chatDTO,
      lastMessage: chatDTO.lastMessage
        ? parseMessageDTO(chatDTO.lastMessage, currentUserId)
        : undefined,
    }));

    onChatListUpdate(chats);
    return;
  }

  if (data.type === OutgoingEventType.INCOMING_MESSAGES) {
    console.log("Received messages", data.messages);

    const messagesDTOs = data.messages as MessageDTO[];

    const messages = messagesDTOs.map((messageDTO) =>
      parseMessageDTO(messageDTO, currentUserId)
    );

    onMessageReceived(messages);
    return;
  }

  console.warn("Unknown event type", data.type);
}

function parseMessageDTO(
  messageDTO: MessageDTO,
  currentUserId: string
): Message {
  return {
    ...messageDTO,
    isFromMe: messageDTO.from === currentUserId,
    timestamp: new Date(messageDTO.timestamp),
  };
}
