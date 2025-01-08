import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMessageDate = (timestamp: Date): string => {
  const today = new Date();
  const timeDifference = today.getTime() - timestamp.getTime();
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  // Check if the message is from today
  const isSameDay = today.toDateString() === timestamp.toDateString();

  if (isSameDay) {
    // If it's from today, show the time (hh:mm AM/PM)
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else if (timeDifference <= oneWeekInMilliseconds) {
    // If it's within the last week, show the day of the week (e.g., "Friday")
    return timestamp.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    // If it's beyond the last week, show the date in dd/mm/yyyy format
    return timestamp.toLocaleDateString("en-GB"); // UK format: dd/mm/yyyy
  }
};

export const formatMessageTime = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatAudioDuration = (duration: number): string => {
  console.log("Formatting audio duration", duration);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  // return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  return "0:00";
};

export const extractAudioDuration = (audioURL: string): string => {
  const audio = new Audio(audioURL);
  return formatAudioDuration(audio.duration);
};
