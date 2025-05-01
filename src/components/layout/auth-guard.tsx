import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
