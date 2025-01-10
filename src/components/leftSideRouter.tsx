import { useLayoutContext } from "@/app/contextProvider";
import { ChatList, ChatListProps } from "./leftSideRouter/chatlist";
import { GroupCreation, GroupCreationProps } from "./leftSideRouter/groupcreation";
import { useEffect, useState } from "react";

export enum LeftSideRoute {
  CHATS,
  GROUP_CREATION,
  CALLS,
}

export interface LeftSideRouterProps {
  chatListProps: ChatListProps;
  groupCreationProps: GroupCreationProps;
}

export function LeftSideRouter({
  chatListProps,
  groupCreationProps,
}: LeftSideRouterProps) {
  const { currentRoute } = useLayoutContext();

  const [child, setChild] = useState<React.ReactElement>(
    <div>Not implemented</div>
  );

  useEffect(() => {
    if (currentRoute === LeftSideRoute.CHATS) {
      setChild(<ChatList {...chatListProps} />);
    }

    if (currentRoute === LeftSideRoute.GROUP_CREATION) {
      setChild(<GroupCreation {...groupCreationProps} />);
    }
  }, [currentRoute, chatListProps, groupCreationProps]);

  return <LeftSideSection>{child}</LeftSideSection>;
}

function LeftSideSection({ children }: { children: React.ReactElement }) {
  return (
    <div className="min-w-44 max-w-96 flex flex-col flex-1 border-r-2 pt-3">
      {children}
    </div>
  );
}
