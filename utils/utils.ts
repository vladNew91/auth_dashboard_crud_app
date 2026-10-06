import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHighResGoogleAvatar(
  url: string | undefined,
): string | undefined {
  if (!url) return;

  // Check if it's a Google image domain
  if (url.includes("googleusercontent.com")) {
    // 1. Remove standard size query strings like ?sz=50 or ?sz=96
    let cleanUrl = url.split("?")[0];

    // 2. Strip sizing segments added to the path like =s96-c, =s400, etc.
    cleanUrl = cleanUrl.split("=")[0];

    // 3. Append your preferred size (e.g., =s400 for 400x400px or =s1024 for high-res)
    return `${cleanUrl}=s400`;
  }

  return url;
}
