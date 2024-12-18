"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export function InputBar({
  onSend,
}: Readonly<{ onSend: (message: string) => void }>) {
  const [message, setMessage] = useState("");

  const sendMessage = (message: string) => {
    onSend(message);

    setMessage("");
  };

  return (
    <div className="flex items-center gap-3 box-border pb-6 pt-2 px-10">
      <Textarea
        placeholder="Type your message here"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (message.trim() === "") return;
            sendMessage(message.trim());
          }
        }}
      />
      <Button variant="ghost" size="icon" onClick={() => sendMessage(message)}>
        <SendHorizonal />
      </Button>
    </div>
  );
}
