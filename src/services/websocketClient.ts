import { useEffect, useRef } from "react";

type WebSocketResponse = {
  id: number;
};

type MessageCallback = (message: any) => void;

class WebSocketManager {
  private socket: WebSocket | null = null;
  private requests: { [id: number]: { resolve: Function; reject: Function } } =
    {};
  private requestId: number = 0;
  private messageCallback: MessageCallback | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(onOpen?: () => void) {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }
    this.socket = new WebSocket(this.url);

    if (onOpen) {
      this.socket.onopen = onOpen;
    }

    // Handle incoming messages
    this.socket.onmessage = (event) => {
      const data: WebSocketResponse = JSON.parse(event.data);

      if (data.id !== undefined && this.requests[data.id]) {
        console.log("Received response for request", data.id);

        // Handle response for a specific request
        const id = data.id;
        // if (error) {
        //   this.requests[id].reject(error);
        // } else {
        //   this.requests[id].resolve(response);
        // }

        this.requests[id].resolve(data);

        delete this.requests[id];
      } else if (this.messageCallback) {
        // Pass unsolicited messages to the message callback
        this.messageCallback(data);
      }
    };

    // Handle WebSocket errors
    this.socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }

  request(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = this.requestId++;
      this.requests[id] = { resolve, reject };

      const message = JSON.stringify({ id, ...data });
      this.socket?.send(message);
    });
  }

  onMessage(callback: MessageCallback): void {
    this.messageCallback = callback;
  }
}

export const webSocketManager = new WebSocketManager("ws://localhost:8080");

// The hook returns the same WebSocketManager instance
export function useWebSocket(onConnect?: (instance: WebSocketManager) => void) {
  const connectionRef = useRef<WebSocketManager>(webSocketManager);

  useEffect(() => {
    webSocketManager.connect(() => onConnect?.(webSocketManager));
  }, []);

  return connectionRef.current;
}
