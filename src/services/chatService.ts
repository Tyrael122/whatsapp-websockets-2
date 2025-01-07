import {
  ChatDTO,
  IncomingEventType,
  MessageDTO,
  OutgoingEventType,
} from "@/lib/dtos";
import { GroupCreationInfo, Message, User } from "@/lib/models";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useWebSocket } from "./websocketClient";

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
}

export const useChatService = (onConnection?: () => void) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  if (!userId) {
    throw new Error("userId is required");
  }

  const [chatId, setChatId] = useState<string | null>(null);

  const socket = useWebSocket(onConnection);

  const updateOnMessageCallback = useCallback(
    (callback: (data: any, userId: string) => void) => {
      if (!socket) {
        console.log("Events not registered because socket is not ready yet");
        return;
      }

      const onMessageCallback = (event: MessageEvent) => {
        callback(event, userId);
      };

      socket.onMessage(onMessageCallback);

      console.log("Registered onmessage callback");
    },
    [socket, userId]
  );

  const requestChatList = useCallback(async () => {
    const request = {
      type: IncomingEventType.CHAT_LIST_REQUEST,
      userId: userId,
    };

    console.log("Sending chat list request", request);
    console.log("Socket at chat list request: ", socket);

    const response = await socket?.request(request);

    console.log("Chat list response", response);

    return handleChatListResponse(response, userId);
  }, [socket, userId]);

  const selectChat = useCallback(
    async (chatId: string) => {
      const request = {
        type: IncomingEventType.GET_CHAT_MESSAGES,
        chatId: chatId,
      };

      setChatId(chatId);

      console.log("Requesting chat messages", request);

      const response = await socket?.request(request);

      return handleIncomingMessages(response, userId);
    },
    [socket]
  );

  const sendMessage = useCallback(
    (message: string) => {
      const request = {
        type: IncomingEventType.SEND_MESSAGE,
        chatId: chatId,
        from: userId,
        message: message,
      };

      console.log("Sending message", request);

      socket?.request(request);
    },
    [socket, chatId, userId]
  );

  const createGroupChat = useCallback(
    (groupInfo: GroupCreationInfo) => {
      const request = {
        type: IncomingEventType.CREATE_GROUP_CHAT,
        name: groupInfo.name,
        userIds: groupInfo.userIds,
        avatarSrc: groupInfo.avatarSrc,
      };

      console.log("Creating group chat", request);

      socket?.request(request);
    },
    [socket]
  );

  const getAllUsers = useCallback(async () => {
    const request = {
      type: IncomingEventType.GET_ALL_USERS,
    };

    console.log("Requesting all users", request);

    const response = await socket?.request(request);

    return response.users as User[];
  }, [socket]);

  return {
    updateOnMessageCallback,
    sendMessage,
    selectChat,
    requestChatList,
    createGroupChat,
    getAllUsers
  };
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
  { onMessageReceived }: UseChatServiceCallbacks
) {
  console.log("Received event", data);

  if (data.type === OutgoingEventType.CHAT_LIST_RESPONSE) {
    const chats = handleChatListResponse(data, currentUserId);

    // onChatListUpdate(chats);
    return;
  }

  if (data.type === OutgoingEventType.INCOMING_MESSAGES) {
    const messages = handleIncomingMessages(data, currentUserId);

    onMessageReceived(messages);
    return;
  }

  console.warn("Unknown event type", data.type);
}

function handleChatListResponse(data: any, currentUserId: string) {
  const chatsDTOs = data.chats as ChatDTO[];

  return chatsDTOs.map((chatDTO) => ({
    ...chatDTO,
    lastMessage: chatDTO.lastMessage
      ? parseMessageDTO(chatDTO.lastMessage, currentUserId)
      : undefined,
  }));
}

function handleIncomingMessages(data: any, currentUserId: string) {
  const messagesDTOs = data.messages as MessageDTO[];

  return messagesDTOs.map((messageDTO) =>
    parseMessageDTO(messageDTO, currentUserId)
  );
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
