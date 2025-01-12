import { Routes } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirection() {
  const router = useRouter();

  useEffect(() => {
    // const userIsLoggedIn = true;
    // if (userIsLoggedIn) {
    //   router.push(Routes.CHATS);
    // } else {
    //   router.push(Routes.LOGIN);
    // }
  }, []);
}
