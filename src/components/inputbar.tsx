"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function InputBar({
  onSend,
}: Readonly<{ onSend: (message: string) => void }>) {
  const [message, setMessage] = useState("");

  const sendMessage = (message: string) => {
    onSend(message);

    setMessage("");
  }

  return (
    <div className="flex gap-3 box-border pb-6 pt-2 px-10">
      <Input
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage(message);
          }
        }}
      />
      <Button variant="ghost" size="icon" onClick={() => sendMessage(message)}>
        <SendHorizonal />
      </Button>
    </div>
  );
}
