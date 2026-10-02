import { cn } from "@/utils/utils";
import Link from "next/link";
import { signup } from "../actions";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div
        className={cn(
          "m-3 w-full max-w-md rounded-2xl p-8",
          "shadow-[0_0_20px_rgba(34,211,238,1),inset_0_0_20px_rgba(34,211,238,0.3)]",
        )}
      >
        <h2 className="mb-4 text-center text-2xl">Sign up</h2>

        <form action={signup} className="space-y-4">
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
            <span className="mr-2">Already have an Account?</span>
            <Link href={"/signin"} className="text-blue-300">
              Sign in
            </Link>
          </div>

          {/* Dynamic Provider Error Notice Box */}
          {params.error && (
            <div className="text-sm dark:text-green-600">{params.error}</div>
          )}

          <button
            type="submit"
            className="text-m w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}
