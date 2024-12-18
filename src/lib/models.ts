import { JSX } from "react";

export type MenuItem = {
    icon: () => JSX.Element;
    description: string;
} 

export interface Message {
    from: string;
    text: string;
    timestamp: Date;
}

export interface Chat {
    id: number;
    avatarSrc: string;
    name: string;
    lastMessage: Message;
}