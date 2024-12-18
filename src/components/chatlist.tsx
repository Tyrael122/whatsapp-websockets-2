import { WhatsappAvatar } from "./avatar";
import { ScrollArea } from "./ui/scroll-area";

const chatlist = [
  { id: 1, name: "Alice", lastMessage: "Hello" },
  { id: 2, name: "Bob", lastMessage: "Hi" },
  { id: 3, name: "Charlie", lastMessage: "Hey" },
  { id: 4, name: "David", lastMessage: "Yo" },
  { id: 5, name: "Eve", lastMessage: "Sup" },
  { id: 6, name: "Frank", lastMessage: "Hi" },
  { id: 7, name: "Grace", lastMessage: "Hello" },
  { id: 8, name: "Hannah", lastMessage: "Hey" },
  { id: 9, name: "Isaac", lastMessage: "Yo" },
  { id: 10, name: "Jack", lastMessage: "Sup" },
  { id: 11, name: "Katie", lastMessage: "Hi" },
  { id: 12, name: "Liam", lastMessage: "Hello" },
  { id: 13, name: "Mia", lastMessage: "Hey" },
  { id: 14, name: "Nathan", lastMessage: "Yo" },
  { id: 15, name: "Olivia", lastMessage: "Sup" },
  { id: 16, name: "Peter", lastMessage: "Hi" },
  { id: 17, name: "Quinn", lastMessage: "Hello" },
  { id: 18, name: "Rachel", lastMessage: "Hey" },
  { id: 19, name: "Steve", lastMessage: "Yo" },
  { id: 20, name: "Tina", lastMessage: "Sup" },
];

export function ChatList() {
  return (
    <div className="min-w-44 max-w-96 flex flex-col flex-1 border-r-2 pt-3">
      <span className="font-bold text-xl pb-2 pl-3">Chats</span>
      <ScrollArea>
        {chatlist.map((chat) => {
          return (
            <div
              key={chat.id}
              className="flex items-center border-b-2 pl-4 py-2"
            >
              <WhatsappAvatar src={""} />
              <div className="w-full px-3">
                <div className="w-full flex justify-between">
                  <span>{chat.name}</span>
                  <span className="text-muted-foreground pr-1 text-xs">09:58</span>
                </div>

                <span className="text-muted-foreground text-sm">
                  {chat.lastMessage}
                </span>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}
