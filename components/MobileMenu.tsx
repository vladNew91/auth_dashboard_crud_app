"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { SignOutBtn } from "./SignOutBtn";
import { User } from "@supabase/supabase-js";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface MobileMenuProps {
  appName?: string;
  user: User | null;
}

export const MobileMenu = ({ appName, user }: MobileMenuProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <>
      {/* Menu Trigger Button */}
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className={cn(
            "-m-2.5 inline-flex cursor-pointer items-center justify-center",
            "rounded-md p-2.5 text-gray-400 transition-colors hover:text-white",
          )}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>

      {/* Slide-out Panel with functional layout styles */}
      <Dialog
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className="relative z-50 lg:hidden"
      >
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Panel Container positioning */}
        <div className="fixed inset-0 flex justify-end">
          <DialogPanel
            className={cn(
              "relative w-full max-w-sm overflow-y-auto bg-gray-900 p-6 shadow-xl",
              "ring-1 ring-white/10 transition duration-200 ease-out",
            )}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 p-1.5"
                onClick={toggleMobileMenu}
              >
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

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="-m-2.5 cursor-pointer rounded-md p-2.5 text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-4">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    onClick={toggleMobileMenu}
                  >
                    Home
                  </Link>

                  <Link
                    href="/posts"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    onClick={toggleMobileMenu}
                  >
                    Posts
                  </Link>

                  {user && (
                    <>
                      <Link
                        href="/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                        onClick={toggleMobileMenu}
                      >
                        Dashboard
                      </Link>

                      <Link
                        href="/profile"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                        onClick={toggleMobileMenu}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                </div>

                <div className="py-6">
                  {!user ? (
                    <Link href="/signin" className="text-base/7 text-white">
                      Sign in
                    </Link>
                  ) : (
                    <SignOutBtn />
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
