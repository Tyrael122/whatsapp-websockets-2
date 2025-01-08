import {
  Mic,
  Pause,
  Play,
  SendHorizonal,
  StopCircle,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import useAudioRecorder from "./useAudioRecorder";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { formatAudioDuration } from "@/lib/utils";

export interface AudioRecorderButtonProps {
  onStartRecording?: () => void;
  onStopRecording?: (blob: Blob) => void;
  onSend?: (blob: Blob) => void;
  onClear?: () => void;
}

export function AudioRecorderButton({
  onStartRecording,
  onStopRecording,
  onSend,
  onClear,
}: AudioRecorderButtonProps) {
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleRecordingStart = () => {
    startRecording();

    if (onStartRecording) {
      onStartRecording();
    }
  };

  const handleRecordingStop = async () => {
    const audioBlob = await stopRecording();

    if (onStopRecording && audioBlob) {
      onStopRecording(audioBlob);
    }

    if (audioBlob) {
      setAudioBlob(audioBlob);

      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    }
  };

  const handlePlayAudio = () => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.pause();
        setIsPlaying(false);
      } else {
        audioPlayer.play();
        setIsPlaying(true);
      }

      return;
    }

    if (audioURL) {
      const audio = new Audio(audioURL);
      setAudioPlayer(audio);

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        console.log("Current time at ontimeupdate: ", audio.currentTime);
      };

      audio.onprogress = () => {
        console.log("progress");
        console.log("Current time: ", audio.currentTime);
      };

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.play();
      setIsPlaying(true);
    }
  };

  const deleteAudioURL = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
      setAudioPlayer(null);

      if (onClear) {
        onClear();
      }
    }
  };

  return (
    <div className="flex gap-x-5 items-center">
      {audioURL && (
        <Button variant="ghost" size="icon" onClick={deleteAudioURL}>
          <Trash />
        </Button>
      )}

      {audioURL && (
        <Button variant="ghost" size="icon" onClick={handlePlayAudio}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      )}

      {audioURL && (
        <Slider
          className="w-40"
          value={[currentTime]}
          onValueChange={(value) => {
            console.log(value);
            if (audioPlayer) {
              audioPlayer.currentTime = value[0];
              setCurrentTime(value[0]);
            }
          }}
          max={audioPlayer?.duration || 0}
          step={0.002}
        />
      )}

      {audioURL && (
        <span className="text-sm text-muted-foreground">
          {formatAudioDuration(audioPlayer?.duration || 0)}
        </span>
      )}

      {!audioURL && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (audioURL) {
              handlePlayAudio();
              return;
            }

            isRecording ? handleRecordingStop() : handleRecordingStart();
          }}
        >
          {isRecording ? <StopCircle /> : <Mic />}
        </Button>
      )}

      {audioURL && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (onSend && audioBlob) {
              onSend(audioBlob);
            }

            deleteAudioURL();
          }}
        >
          <SendHorizonal />
        </Button>
      )}
    </div>
  );
}
