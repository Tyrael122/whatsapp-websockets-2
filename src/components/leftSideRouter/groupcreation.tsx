import { User } from "@/lib/models";
import { useChatService } from "@/services/chatService";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Camera, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";
import { useFileInput } from "./fileinput";
import { WhatsappAvatar } from "./avatar";

export interface GroupCreationProps {
  onCreateGroup: () => void;
}

export function GroupCreation({ onCreateGroup }: GroupCreationProps) {
  const [currentRoute, setCurrentRoute] = useState(
    GroupCreationRoute.ADDING_USERS
  );

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { createGroupChat } = useChatService();

  return (
    <GroupCreationRouter
      onUsersSelected={(newSelectedUsers) => {
        setSelectedUsers(newSelectedUsers);

        console.log("Selected users", newSelectedUsers);

        setCurrentRoute(GroupCreationRoute.GROUP_INFO);
      }}
      onChooseGroupInfo={(info) => {
        createGroupChat({
          avatarSrc: info.groupIconSrc ? info.groupIconSrc : undefined,
          name: info.groupName,
          userIds: selectedUsers,
        });
        onCreateGroup();
      }}
      currentRoute={currentRoute}
    />
  );
}

function AddingGroupUsers({
  navigateToGroupInfo,
}: {
  navigateToGroupInfo: (users: string[]) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { getAllUsers } = useChatService();

  useEffect(() => {
    getAllUsers().then((users) => {
      console.log("Users", users);
      setUsers(users);
    });
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col h-full">
        <span className="font-bold text-xl pb-2 pl-3">Adicione pessoas</span>

        {users.map((user) => {
          return (
            <div
              key={user.id}
              className={
                `flex border-b pl-4 py-2 min-h-16 cursor-pointer hover:bg-gray-100 ` +
                (selectedUsers.includes(user.id) ? "bg-gray-100" : "")
              }
              onClick={() => {
                console.log("Clicked on user", user.id);

                setSelectedUsers((prevUsers) => {
                  if (prevUsers.includes(user.id)) {
                    return prevUsers.filter((id) => id !== user.id);
                  }

                  return [...prevUsers, user.id];
                });
              }}
            >
              <WhatsappAvatar src={user.avatarSrc} />
              <div className="w-full h-full px-3">
                <div className="w-full flex justify-between">
                  <span>{user.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end p-6">
        <Button size="icon" onClick={() => navigateToGroupInfo(selectedUsers)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

interface GroupInfo {
  groupIconSrc: string | null;
  groupName: string;
}

function GroupInfo({
  onGroupInfoSelected,
}: {
  onGroupInfoSelected: (info: GroupInfo) => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGroupIconSrc(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile); // Read the image as a Data URL (base 64)
    }
  };

  const [groupName, setGroupName] = useState("");
  const [groupIconSrc, setGroupIconSrc] = useState<string | null>(null);

  const { openFileInput, FileInput } = useFileInput({
    accept: "image/*",
    handleFileChange,
  });

  return (
    <div className="flex flex-col pt-3 px-6 justify-between h-full">
      <div className="flex flex-col items-center gap-10">
        <div
          className="flex flex-col rounded-full bg-gray-200 w-[200px] h-[200px] justify-center items-center text-muted-foreground cursor-pointer"
          onClick={openFileInput}
        >
          {groupIconSrc ? (
            <img
              src={groupIconSrc}
              alt="Preview"
              className="rounded-full object-cover w-full h-full"
            />
          ) : (
            <>
              <Camera size={64} absoluteStrokeWidth={true} />
              <span>Add group icon</span>
            </>
          )}

          {FileInput}
        </div>

        <Input
          placeholder="Nome do grupo"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
        />
      </div>

      <div className="flex justify-end p-6">
        <Button
          size="icon"
          onClick={() => onGroupInfoSelected({ groupIconSrc, groupName })}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

enum GroupCreationRoute {
  ADDING_USERS,
  GROUP_INFO,
}

interface GroupCreationRouterProps {
  onUsersSelected: (users: string[]) => void;
  onChooseGroupInfo: (info: GroupInfo) => void;
  currentRoute: GroupCreationRoute;
}

function GroupCreationRouter({
  onUsersSelected,
  onChooseGroupInfo: onChooseName,
  currentRoute,
}: GroupCreationRouterProps) {
  if (currentRoute === GroupCreationRoute.ADDING_USERS) {
    return <AddingGroupUsers navigateToGroupInfo={onUsersSelected} />;
  }

  if (currentRoute === GroupCreationRoute.GROUP_INFO) {
    return <GroupInfo onGroupInfoSelected={onChooseName} />;
  }
}
