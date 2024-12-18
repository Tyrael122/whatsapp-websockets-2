import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { WhatsappAvatar } from "./avatar";
import { ScrollArea } from "./ui/scroll-area";

const messages = [
  { id: 1, name: "Alice", text: "Hello, how are you?" },
  { id: 2, name: "Bob", text: "Hi, I'm good. How about you?" },
  { id: 3, name: "Alice", text: "I'm good too, thanks for asking." },
  { id: 4, name: "Bob", text: "That's great to hear." },
  { id: 5, name: "Alice", text: "Yes, it is." },
  { id: 6, name: "Bob", text: "I have to go now, see you later." },
  { id: 7, name: "Alice", text: "Bye." },
  { id: 8, name: "Bob", text: "Bye." },
  { id: 9, name: "Alice", text: "What are you up to later?" },
  { id: 10, name: "Bob", text: "Just some work. What about you?" },
  { id: 11, name: "Alice", text: "Not much, maybe a movie." },
  { id: 12, name: "Bob", text: "Nice! Any movie in mind?" },
  { id: 13, name: "Alice", text: "Thinking about an action one. Suggestions?" },
  { id: 14, name: "Bob", text: "John Wick is great if you haven't seen it." },
  { id: 15, name: "Alice", text: "Oh, I love John Wick! Seen all of them." },
  { id: 16, name: "Bob", text: "Then maybe Mission Impossible?" },
  { id: 17, name: "Alice", text: "Not bad, I'll check if it's available." },
  { id: 18, name: "Bob", text: "Cool. Let me know how it is if you watch it." },
  { id: 19, name: "Alice", text: "For sure. Thanks for the idea!" },
  { id: 20, name: "Bob", text: "No problem. Always happy to help." },
  { id: 21, name: "Alice", text: "Have you been watching any series lately?" },
  { id: 22, name: "Bob", text: "Yeah, I just started 'The Witcher'." },
  { id: 23, name: "Alice", text: "Nice! How is it so far?" },
  {
    id: 24,
    name: "Bob",
    text: "Pretty good, although it can get a bit confusing.",
  },
  {
    id: 25,
    name: "Alice",
    text: "Yeah, I've heard the timeline is a bit tricky.",
  },
  { id: 26, name: "Bob", text: "Exactly. But it's worth it for the action." },
  { id: 27, name: "Alice", text: "Cool, I'll add it to my list." },
  { id: 28, name: "Bob", text: "Do it. You'll enjoy it." },
  { id: 29, name: "Alice", text: "By the way, are you free this weekend?" },
  { id: 30, name: "Bob", text: "Hmm, I might be. What's up?" },
  {
    id: 31,
    name: "Alice",
    text: "Just thinking we could grab lunch or something.",
  },
  { id: 32, name: "Bob", text: "Sounds good! Let's plan for Saturday?" },
  { id: 33, name: "Alice", text: "Perfect. Where should we go?" },
  { id: 34, name: "Bob", text: "How about that new Italian place downtown?" },
  {
    id: 35,
    name: "Alice",
    text: "Oh, I've been wanting to try it. Great idea!",
  },
  { id: 36, name: "Bob", text: "Cool. I'll make a reservation." },
  { id: 37, name: "Alice", text: "Thanks! Looking forward to it." },
  { id: 38, name: "Bob", text: "Me too. It'll be fun." },
  {
    id: 39,
    name: "Alice",
    text: "Absolutely. It's been a while since we caught up in person.",
  },
  { id: 40, name: "Bob", text: "Yeah, life gets busy, doesn't it?" },
  { id: 41, name: "Alice", text: "Totally. But it's nice to take a break." },
  {
    id: 42,
    name: "Bob",
    text: "Agreed. By the way, do you still play tennis?",
  },
  { id: 43, name: "Alice", text: "Not as much, but I miss it. Do you?" },
  { id: 44, name: "Bob", text: "Sometimes. We should play sometime!" },
  { id: 45, name: "Alice", text: "Yes! Let's do it soon." },
  { id: 46, name: "Bob", text: "Alright. I'll bring my gear." },
  { id: 47, name: "Alice", text: "Great. Let me know when you're free." },
  { id: 48, name: "Bob", text: "Will do. This week is packed, though." },
  { id: 49, name: "Alice", text: "No worries. Whenever you have time." },
  { id: 50, name: "Bob", text: "Got it. Catch you later, Alice!" },
];

export function ChatSection() {
  return (
    <div className="hidden sm:flex flex-col flex-[2] h-full">
      <TopChatBar />
      <MessageList />
      <InputBar />
    </div>
  );

  function TopChatBar() {
    return (
      <div className="flex items-center gap-4 border-b-2 p-3">
        <WhatsappAvatar src={""} />

        <span>+55 11 95145-1541</span>
      </div>
    );
  }

  function MessageList() {
    return (
      <ScrollArea>
        <div className="flex flex-col gap-4 flex-1 p-4">
          {messages.map((message) => {
            const isFromMe = message.name === "Alice";

            return (
              <div
                key={message.id}
                className={`${isFromMe ? "justify-end" : ""} flex gap-2`}
              >
                <div
                  className={`flex flex-col ${
                    isFromMe ? "bg-green-400" : "bg-gray-300"
                  } rounded-lg p-2`}
                >
                  <span>{message.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    );
  }

  function InputBar() {
    return (
      <div className="flex gap-3 box-border pb-6 px-10">
        <Input placeholder="Type a message" />
        <Button variant="ghost" size="icon">
          <SendHorizonal />
        </Button>
      </div>
    );
  }
}
