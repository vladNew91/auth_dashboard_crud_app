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
      <button
        className="w-full cursor-pointer text-left text-base/7 text-white"
        type="submit"
      >
        {children || "Sign Out"}
      </button>
    </form>
  );
};
