"use client";

import { ReactNode } from "react";
import { signout } from "@/app/(auth)/actions";

type SignOutBtnProps = {
  children?: ReactNode;
};

export const SignOutBtn = ({ children }: SignOutBtnProps) => {
  const handleSignOut = async () => await signout();

  return (
    <form action={handleSignOut}>
      <button className="cursor-pointer text-base/7 text-white" type="submit">
        {children || "Log out"}
      </button>
    </form>
  );
};
