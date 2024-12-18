import { Avatar, AvatarImage } from "./ui/avatar";

export function WhatsappAvatar({ src }: Readonly<{ src: string }>) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/Tyrael122.png" alt="Alice" />
    </Avatar>
  );
}
