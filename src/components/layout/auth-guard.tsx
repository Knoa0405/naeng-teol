import React from "react";

import { useSession } from "next-auth/react";

import AuthNav from "./auth-nav";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map(child => {
        if (React.isValidElement(child) && child.type === AuthNav) {
          return isAuthenticated ? child : null;
        }
        return child;
      })}
    </>
  );
};

export default AuthGuard;
