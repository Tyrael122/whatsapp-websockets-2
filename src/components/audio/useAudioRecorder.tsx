import { useRef, useState } from "react";

type UseAudioRecorderReturn = {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
};

const useAudioRecorder = (): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null); // Store the MediaStream

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream; // Save the stream
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = (): Promise<Blob | null> => {
    console.log("Stopping recording");

    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) {
        resolve(null);
      }

      mediaRecorderRef.current!!.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {
          type: "audio/ogg; codecs=opus",
        });
        audioChunks.current = [];
        setIsRecording(false);

        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }

        console.log("Audio recording has stopped successfully");
        resolve(audioBlob);
      };

      mediaRecorderRef.current!!.stop();
    });
  };

  return { isRecording, startRecording, stopRecording };
};

export default useAudioRecorder;
