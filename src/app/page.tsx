import { ChatList } from "@/components/chatlist";
import { ChatSection } from "@/components/chatsection";

export default function ChatsPage() {
  return (
    <div className="w-full h-full flex">
      <ChatList />
      <ChatSection />
    </div>
  );
}
