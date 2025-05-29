"use client";

import React from "react";

import { useSession } from "next-auth/react";

const AuthOnly = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex h-10 w-20 items-center justify-center rounded-md bg-gray-100" />
    );
  }

  if (session.status !== "authenticated") return null;

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
