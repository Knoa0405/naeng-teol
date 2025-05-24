import React from "react";

import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map(child => {
        if (
          React.isValidElement(child) &&
          (child.props as { "data-auth-only"?: boolean })["data-auth-only"] ===
            true &&
          !isAuthenticated
        ) {
          return null;
        }
        return child;
      })}
    </>
  );
};

export default AuthGuard;
