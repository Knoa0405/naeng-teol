"use client";

import { useSession } from "next-auth/react";
import SignOut from "../ui/sign-out";
import SignIn from "../ui/sign-in";

const SessionSign = () => {
  const session = useSession();

  return <>{session.data?.user?.id ? <SignOut /> : <SignIn />}</>;
};

export default SessionSign;
