import Link from "next/link";
import { cn } from "@/utils/utils";
import { login } from "../actions";
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { SignInWithOAuth } from "@/components/ui/signin-oauth-form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <section
      className={cn(
        "h-content m-3 flex w-xl flex-col gap-3 rounded-2xl p-8 shadow-none",
        "sm:shadow-[0_0_20px_rgba(34,211,238,1),inset_0_0_7px_rgba(34,211,238,0.3)]",
      )}
    >
      <SignInWithOAuth provider="github">
        Log In with GitHub&ensp;
        <FiGithub size={20} />
      </SignInWithOAuth>

      <SignInWithOAuth provider="google">
        Log In with Google&ensp;
        <FaGoogle size={20} />
      </SignInWithOAuth>

      <h2 className="text-center text-xl">Sign In</h2>

      <form action={login} className="flex flex-col gap-3">
        <label
          htmlFor="email"
          className="font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          className={cn(
            "text-m w-full rounded-lg p-3 text-zinc-900",
            "dark:bg-zinc-900 dark:text-zinc-100",
          )}
        />

        <label
          htmlFor="password"
          className="font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••••••••••"
          className={cn(
            "text-m w-full rounded-lg p-3 text-zinc-900",
            "dark:bg-zinc-900 dark:text-zinc-100",
          )}
        />

        {params.error && <p className="text-sm text-red-500">{params.error}</p>}
        {params.message && (
          <p className="text-sm text-green-500">{params.message}</p>
        )}

        <button
          type="submit"
          className={cn(
            "text-m w-full cursor-pointer rounded-lg bg-zinc-900 py-2",
            "font-medium text-white transition-colors hover:bg-zinc-800",
            "focus:bg-blue-400 focus:outline-none dark:bg-zinc-50",
            "dark:text-zinc-900 dark:hover:bg-zinc-200",
          )}
        >
          Sign in
        </button>

        <div className="text-center text-xs dark:text-zinc-300">
          <span>Don&apos;t have an Account?&ensp;</span>
          <Link href={"/signup"} className="text-blue-300">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
}
