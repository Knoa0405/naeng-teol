"use client";

import { useSession } from "next-auth/react";

import SignIn from "../ui/sign-in";
import SignOut from "../ui/sign-out";

const SessionSign = () => {
  const session = useSession();

  return <>{session.data?.user?.id ? <SignOut /> : <SignIn />}</>;
};

export default SessionSign;
