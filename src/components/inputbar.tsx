"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { AudioRecorderButton } from "./audio/audioRecorderButton";

export interface InputBarProps {
  onSend: (message: string) => void;
  onAudioSend: (audioBlob: Blob) => void;
}

export function InputBar({ onSend, onAudioSend }: InputBarProps) {
  const [isRecording, setIsRecording] = useState(false);

  const [message, setMessage] = useState("");

  const sendMessage = (message: string) => {
    onSend(message);

    setMessage("");
  };

  return (
    <div className="flex justify-end items-center gap-3 box-border pb-6 pt-2 px-10">
      <Textarea
        placeholder="Type your message here"
        disabled={isRecording}
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

      {message.trim() === "" ? (
        <AudioRecorderButton
          onStartRecording={() => setIsRecording(true)}
          onClear={() => setIsRecording(false)}
          onSend={(audioBlob) => {
            onAudioSend(audioBlob);
            setIsRecording(false);
          }}
        />
      ) : (
        <SendButton onSend={() => sendMessage(message)} />
      )}
    </div>
  );
}

function SendButton({ onSend }: { onSend: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onSend}>
      <SendHorizonal />
    </Button>
  );
}
