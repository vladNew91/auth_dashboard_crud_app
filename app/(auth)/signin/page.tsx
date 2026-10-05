import { cn } from "@/utils/utils";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { login } from "../actions";
import { SignInWithOAuth } from "@/components/ui/signin-oauth-form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div
        className={cn(
          "m-3 w-full max-w-md rounded-2xl p-8 pb-5",
          "shadow-[0_0_20px_rgba(34,211,238,1),inset_0_0_20px_rgba(34,211,238,0.3)]",
        )}
      >
        <h2 className="mb-4 text-center text-2xl">Sign in</h2>

        <form action={login} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-s font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-s font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="text-xs font-medium dark:text-zinc-300">
            <span className="mr-2">Don&apos;t have an Account?</span>
            <Link href={"/signup"} className="text-blue-300">
              Sign up
            </Link>
          </div>

          {params.error && (
            <p className="text-s text-red-500">{params.error}</p>
          )}
          {params.message && (
            <p className="text-s text-green-500">{params.message}</p>
          )}

          <button
            type="submit"
            className="text-m w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Log in
          </button>
        </form>

        {/* Social Provider Options */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-zinc-400 uppercase dark:bg-zinc-950">
            Or log in with:
          </span>
        </div>

        <div className="text-center">   
          <SignInWithOAuth provider="github">
            <FiGithub size={20} />
          </SignInWithOAuth>

          <SignInWithOAuth provider="google">
            <FaGoogle size={20} />
          </SignInWithOAuth>
        </div>
      </div>
    </section>
  );
}
