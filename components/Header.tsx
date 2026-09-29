import Link from "next/link";
import Image from "next/image";
import { PopoverGroup } from "@headlessui/react";
import { HiOutlineHome } from "react-icons/hi2";
import { createClient } from "@/utils/supabase/server";
import { MobileMenu } from "@/components/MobileMenu";
import { DropdownMenuAvatar } from "./DropdownMenuAvatar";

interface HeaderProps {
  appName?: string;
}

export const Header = async ({ appName }: HeaderProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-gray-900">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      >
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{appName}</span>
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </Link>
        </div>

        {/* Dynamic Client Menu for Mobile */}
        <MobileMenu appName={appName} user={user} />

        {/* Desktop Navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/">
            <span title="Home">
              <HiOutlineHome className="size-6 text-white" />
            </span>
          </Link>

          <Link href="/posts" className="font-semibold text-white">
            Posts
          </Link>

          {user && (
            <Link href="/dashboard" className="font-semibold text-white">
              Dashboard
            </Link>
          )}
        </PopoverGroup>

        {/* Desktop Action */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user ? (
            <Link href="/signin" className="text-base/7 text-white">
              Sign in
            </Link>
          ) : (
            <DropdownMenuAvatar avatarURL={user.user_metadata.avatar_url} />
          )}
        </div>
      </nav>
    </header>
  );
};
