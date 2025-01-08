export interface IncomingWhatsAppEvent {
  type: IncomingEventType;
}

export interface OutgoingWhatsAppEvent {
  type: OutgoingEventType;
}

export enum IncomingEventType {
  USER_ID_INFO = "USER_ID_INFO",
  CHAT_LIST_REQUEST = "CHAT_LIST_REQUEST",
  GET_CHAT_MESSAGES = "GET_CHAT_MESSAGES",
  SEND_MESSAGE = "SEND_MESSAGE",
  CREATE_GROUP_CHAT = "CREATE_GROUP_CHAT",
  GET_ALL_USERS = "GET_ALL_USERS",
}

export enum OutgoingEventType {
  CHAT_LIST_RESPONSE = "CHAT_LIST_RESPONSE",
  INCOMING_MESSAGES = "INCOMING_MESSAGES",
}

export interface ChatListRequest {
  userId?: string;
}

export interface GetChatMessagesRequest extends IncomingWhatsAppEvent {
  chatId: string;
}

export interface SendMessageRequest extends IncomingWhatsAppEvent {
  chatId: string;
  from: string;
  message: string;
}

export interface CreateGroupChatRequest extends IncomingWhatsAppEvent {
  name: string;
  userIds: string[];
  avatarSrc?: string;
}

export interface ChatListResponse extends OutgoingWhatsAppEvent {
  chats: ChatDTO[];
}

export interface IncomingMessages extends OutgoingWhatsAppEvent {
  messages: MessageDTO[];
}

export interface ChatDTO {
  id: string;
  name: string;
  isGroup: boolean;
  avatarSrc: string;
  lastMessage?: MessageDTO;
}

export interface MessageDTO {
  id: number;
  chatId: string;
  from: string;
  text: string;
  timestamp: string;
}

export interface UserDTO {
  id: string;
  name: string;
  avatarSrc: string;
}