import { cn } from "@/utils/utils";
import Link from "next/link";

interface FooterProps {
  appName?: string;
}

export const Footer = ({ appName }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full border-t border-gray-800 bg-gray-900 text-gray-300",
        "flex flex-col justify-between px-5 py-4 text-center sm:flex-row",
      )}
    >
      <p className="text-sm">
        {appName}. &copy; {currentYear}. All rights reserved.
      </p>

      <div className="space-x-5 text-xs">
        <Link
          href="/#"
          prefetch={false}
          className="transition-colors hover:text-white"
        >
          Privacy Policy
        </Link>

        <Link
          href="/#"
          prefetch={false}
          className="transition-colors hover:text-white"
        >
          Terms of Service
        </Link>

        <Link
          href="/contact"
          prefetch={false}
          className="transition-colors hover:text-white"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
};
