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
      "flex px-5 py-4 flex-col sm:flex-row justify-between text-center"

      )}
    >
        <p className="text-sm">
          {appName}. &copy; {currentYear}. All rights reserved.
        </p>

        <div className="text-xs space-x-5">
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
