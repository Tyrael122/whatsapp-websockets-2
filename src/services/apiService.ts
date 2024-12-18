"use server";

import { Chat, Message } from "@/lib/models";

const currentUser = "Alice";

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
  {
    id: 13,
    name: "Alice",
    text: "Thinking about an action one. Suggestions?",
  },
  { id: 14, name: "Bob", text: "John Wick is great if you haven't seen it." },
  { id: 15, name: "Alice", text: "Oh, I love John Wick! Seen all of them." },
  { id: 16, name: "Bob", text: "Then maybe Mission Impossible?" },
  { id: 17, name: "Alice", text: "Not bad, I'll check if it's available." },
  {
    id: 18,
    name: "Bob",
    text: "Cool. Let me know how it is if you watch it.",
  },
  { id: 19, name: "Alice", text: "For sure. Thanks for the idea!" },
  { id: 20, name: "Bob", text: "No problem. Always happy to help." },
  {
    id: 21,
    name: "Alice",
    text: "Have you been watching any series lately?",
  },
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
].map((msg) => ({
  from: msg.name,
  text: msg.text,
  timestamp: new Date(), // For demonstration, we'll use the current time for all messages
}));

export async function getMessagesFromChat(id: string): Promise<Message[]> {
  return messages;
}

export async function getChats(): Promise<Chat[]> {
  return [
    {
      id: 1,
      avatarSrc: "https://example.com/avatars/alice.png", // Avatar source for Alice
      name: "Alice",
      lastMessage: {
        from: "Alice",
        text: "Hello",
        timestamp: new Date("2024-12-01T10:00:00Z"),
      },
    },
    {
      id: 2,
      avatarSrc: "https://example.com/avatars/bob.png", // Avatar source for Bob
      name: "Bob",
      lastMessage: {
        from: "Bob",
        text: "Hi",
        timestamp: new Date("2024-12-02T14:30:00Z"),
      },
    },
    {
      id: 3,
      avatarSrc: "https://example.com/avatars/charlie.png", // Avatar source for Charlie
      name: "Charlie",
      lastMessage: {
        from: "Charlie",
        text: "Hey",
        timestamp: new Date("2024-12-03T16:45:00Z"),
      },
    },
    {
      id: 4,
      avatarSrc: "https://example.com/avatars/david.png", // Avatar source for David
      name: "David",
      lastMessage: {
        from: "David",
        text: "Yo",
        timestamp: new Date("2024-12-04T08:25:00Z"),
      },
    },
    {
      id: 5,
      avatarSrc: "https://example.com/avatars/eve.png", // Avatar source for Eve
      name: "Eve",
      lastMessage: {
        from: "Eve",
        text: "Sup",
        timestamp: new Date("2024-12-05T13:10:00Z"),
      },
    },
    {
      id: 6,
      avatarSrc: "https://example.com/avatars/frank.png", // Avatar source for Frank
      name: "Frank",
      lastMessage: {
        from: "Frank",
        text: "Hi",
        timestamp: new Date("2024-12-06T19:15:00Z"),
      },
    },
    {
      id: 7,
      avatarSrc: "https://example.com/avatars/grace.png", // Avatar source for Grace
      name: "Grace",
      lastMessage: {
        from: "Grace",
        text: "Hello",
        timestamp: new Date("2024-12-07T11:30:00Z"),
      },
    },
    {
      id: 8,
      avatarSrc: "https://example.com/avatars/hannah.png", // Avatar source for Hannah
      name: "Hannah",
      lastMessage: {
        from: "Hannah",
        text: "Hey",
        timestamp: new Date("2024-12-08T17:05:00Z"),
      },
    },
    {
      id: 9,
      avatarSrc: "https://example.com/avatars/isaac.png", // Avatar source for Isaac
      name: "Isaac",
      lastMessage: {
        from: "Isaac",
        text: "Yo",
        timestamp: new Date("2024-12-09T12:20:00Z"),
      },
    },
    {
      id: 10,
      avatarSrc: "https://example.com/avatars/jack.png", // Avatar source for Jack
      name: "Jack",
      lastMessage: {
        from: "Jack",
        text: "Sup",
        timestamp: new Date("2024-12-10T09:50:00Z"),
      },
    },
    {
      id: 11,
      avatarSrc: "https://example.com/avatars/katie.png", // Avatar source for Katie
      name: "Katie",
      lastMessage: {
        from: "Katie",
        text: "Hi",
        timestamp: new Date("2024-12-11T18:40:00Z"),
      },
    },
    {
      id: 12,
      avatarSrc: "https://example.com/avatars/liam.png", // Avatar source for Liam
      name: "Liam",
      lastMessage: {
        from: "Liam",
        text: "Hello",
        timestamp: new Date("2024-12-12T15:30:00Z"),
      },
    },
    {
      id: 13,
      avatarSrc: "https://example.com/avatars/mia.png", // Avatar source for Mia
      name: "Mia",
      lastMessage: {
        from: "Mia",
        text: "Hey",
        timestamp: new Date("2024-12-13T20:25:00Z"),
      },
    },
    {
      id: 14,
      avatarSrc: "https://example.com/avatars/nathan.png", // Avatar source for Nathan
      name: "Nathan",
      lastMessage: {
        from: "Nathan",
        text: "Yo",
        timestamp: new Date("2024-12-14T07:15:00Z"),
      },
    },
    {
      id: 15,
      avatarSrc: "https://example.com/avatars/olivia.png", // Avatar source for Olivia
      name: "Olivia",
      lastMessage: {
        from: "Olivia",
        text: "Sup",
        timestamp: new Date("2024-12-15T21:50:00Z"),
      },
    },
    {
      id: 16,
      avatarSrc: "https://example.com/avatars/peter.png", // Avatar source for Peter
      name: "Peter",
      lastMessage: {
        from: "Peter",
        text: "Hi",
        timestamp: new Date("2024-12-16T10:35:00Z"),
      },
    },
    {
      id: 17,
      avatarSrc: "https://example.com/avatars/quinn.png", // Avatar source for Quinn
      name: "Quinn",
      lastMessage: {
        from: "Quinn",
        text: "Hello",
        timestamp: new Date("2024-12-17T14:00:00Z"),
      },
    },
    {
      id: 18,
      avatarSrc: "https://example.com/avatars/rachel.png", // Avatar source for Rachel
      name: "Rachel",
      lastMessage: {
        from: "Rachel",
        text: "Hey",
        timestamp: new Date("2024-12-18T09:05:00Z"),
      },
    },
    {
      id: 19,
      avatarSrc: "https://example.com/avatars/steve.png", // Avatar source for Steve
      name: "Steve",
      lastMessage: {
        from: "Steve",
        text: "Yo",
        timestamp: new Date("2024-12-18T13:00:00Z"),
      },
    },
    {
      id: 20,
      avatarSrc: "https://example.com/avatars/tina.png", // Avatar source for Tina
      name: "Tina",
      lastMessage: {
        from: "Tina",
        text: "Sup",
        timestamp: new Date("2024-12-18T16:30:00Z"),
      },
    },
  ];
}

export async function sendMessage(message: string) {
  const newMessage = {
    from: currentUser,
    text: message,
    timestamp: new Date(),
  };

  messages.push(newMessage);
}
