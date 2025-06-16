import { auth } from "@/auth";
import SignIn from "@/components/ui/sign-in";
import SignOut from "@/components/ui/sign-out";

const SessionSign = async () => {
  const session = await auth();

  return <>{session?.user?.id ? <SignOut /> : <SignIn />}</>;
};

export default SessionSign;
