"use client";

import { useSession } from "next-auth/react";

import SignIn from "@/components/ui/sign-in";
import SignOut from "@/components/ui/sign-out";

const SessionSign = () => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex h-10 w-20 items-center justify-center rounded-md bg-gray-200" />
    );
  }

  return <>{session.data?.user?.id ? <SignOut /> : <SignIn />}</>;
};

export default SessionSign;
