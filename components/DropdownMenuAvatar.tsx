"use client";

import { BadgeCheckIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutBtn } from "./SignOutBtn";
import { cn } from "@/utils/utils";

type DropdownMenuAvatarProps = {
  avatarURL?: string;
};

export function DropdownMenuAvatar({ avatarURL }: DropdownMenuAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "cursor-pointer rounded-full transition-all duration-300 hover:bg-cyan-400",
              "hover:shadow-[0_0_5px_rgba(34,211,238,0.8),0_0_10px_rgba(34,211,238,0.4)]",
            )}
          >
            <Avatar>
              <AvatarImage src={avatarURL} alt="avatar" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <SignOutBtn>
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </SignOutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
