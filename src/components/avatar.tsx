import { Avatar, AvatarImage } from "./ui/avatar";

export function WhatsappAvatar({ src }: Readonly<{ src: string }>) {
  return (
    <Avatar>
      <AvatarImage src={src} alt="Alice" />
    </Avatar>
  );
}
