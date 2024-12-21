import {
  ChatDTO,
  IncomingEventType,
  MessageDTO,
  OutgoingEventType,
} from "@/lib/dtos";
import { Chat, Message } from "@/lib/models";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export interface UseChatServiceReturn {
  updateOnMessageCallback: (
    callback: (data: any, userId: string) => void
  ) => void;
  sendMessage: (message: string) => void;
  selectChat: (chatId: string) => void;
  requestChatList: () => void;
}

export interface UseChatServiceCallbacks {
  onMessageReceived: (messages: Message[]) => void;
  onChatListUpdate: (chatList: Chat[]) => void;
}

export const useChatService = (onConnection: () => void) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  if (!userId) {
    throw new Error("userId is required");
  }

  const [chatId, setChatId] = useState<string | null>(null);

  const socket = useWebSocketConnection();

  useEffect(() => {
    if (socket) {
      onConnection();
    }
  }, [socket]);

  const updateOnMessageCallback = useCallback(
    (callback: (data: any, userId: string) => void) => {
      if (!socket) {
        console.log("Events not registered because socket is not ready yet");
        return;
      }

      const onMessageCallback = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        callback(data, userId);
        // handleIncomingEvent(data, userId, callbacks);
      };

      socket.onmessage = onMessageCallback;

      console.log("Registered onmessage callback");

      return () => {
        socket.onmessage = null;
      };
    },
    [socket, userId]
  );

  const requestChatList = useCallback(() => {
    const request = JSON.stringify({
      type: IncomingEventType.CHAT_LIST_REQUEST,
      userId: userId,
    });

    console.log("Sending chat list request", request);
    console.log("Socket at chat list request: ", socket);

    socket?.send(request);
  }, [socket, userId]);

  const selectChat = useCallback(
    (chatId: string) => {
      const request = JSON.stringify({
        type: IncomingEventType.GET_CHAT_MESSAGES,
        chatId: chatId,
      });

      console.log("Requesting chat messages", request);

      socket?.send(request);

      setChatId(chatId);
    },
    [socket]
  );

  const sendMessage = useCallback(
    (message: string) => {
      const request = JSON.stringify({
        type: IncomingEventType.SEND_MESSAGE,
        chatId: chatId,
        from: userId,
        message: message,
      });

      console.log("Sending message", request);

      socket?.send(request);
    },
    [socket, chatId, userId]
  );

  return { updateOnMessageCallback, sendMessage, selectChat, requestChatList };
};

export const useChatServiceCallbacks = (
  callbacks: UseChatServiceCallbacks,
  updateCallbacks: (callback: (data: any, userId: string) => void) => void
) => {
  useEffect(() => {
    console.log("Setting up socket event listener");

    updateCallbacks((data, userId) => {
      handleIncomingEvent(data, userId, callbacks);
    });
  }, [...Object.values(callbacks), updateCallbacks]);
};

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
    const messagesDTOs = data.messages as MessageDTO[];

    const messages = messagesDTOs.map((messageDTO) =>
      parseMessageDTO(messageDTO, currentUserId)
    );

    onMessageReceived(messages);
    return;
  }

  console.warn("Unknown event type", data.type);
}

function useWebSocketConnection(): WebSocket | null {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws && ws.close();
  }, []);

  return socket;
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
