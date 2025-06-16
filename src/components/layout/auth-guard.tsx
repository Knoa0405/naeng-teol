import React from "react";

import { auth } from "@/auth";

const AuthOnly = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return null;

  return <>{children}</>;
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map(child => {
        if (
          React.isValidElement(child) &&
          (child.props as { "data-auth-only"?: boolean })["data-auth-only"] ===
            true
        ) {
          return <AuthOnly key={child.key}>{child}</AuthOnly>;
        }
        return child;
      })}
    </>
  );
};

export default AuthGuard;
