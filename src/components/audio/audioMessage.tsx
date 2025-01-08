import { Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { formatAudioDuration } from "@/lib/utils";

export interface AudioMessageProps {
  audioURL: string;
}

export function AudioMessage({ audioURL }: AudioMessageProps) {
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const player = new Audio(audioURL);
    player.ontimeupdate = () => {
      setCurrentTime(player.currentTime);
    };

    player.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    setAudioPlayer(player);

    return () => {
      player.pause();
      player.src = "";
      player.load();
    };
  }, []);

  const handlePlayAudio = () => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.pause();
        setIsPlaying(false);
      } else {
        audioPlayer.play();
        setIsPlaying(true);
      }
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="ghost" size="icon" onClick={handlePlayAudio}>
        {isPlaying ? <Pause /> : <Play />}
      </Button>

      <div className="relative">
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
        <span className="absolute text-sm text-muted-foreground left-0 top-4">
          {formatAudioDuration(audioPlayer?.duration || 0)}
        </span>
      </div>
    </div>
  );
}
