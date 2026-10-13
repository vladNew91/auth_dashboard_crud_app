import Link from "next/link";
import { cn } from "@/utils/utils";
import { login } from "../actions";
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { AuthSignForm } from "@/components/AuthSignForm";
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
      <SignInWithOAuth provider="google">
        Log In with Google&ensp;
        <FaGoogle size={20} />
      </SignInWithOAuth>

      <SignInWithOAuth provider="github">
        Log In with GitHub&ensp;
        <FiGithub size={20} />
      </SignInWithOAuth>

      <h2 className="text-center text-xl">Sign In</h2>

      <AuthSignForm action={login} params={params} />

      <div className="text-center text-xs dark:text-zinc-300">
        <span>Don&apos;t have an Account?&ensp;</span>
        <Link href={"/signup"} className="text-blue-300">
          Sign up
        </Link>
      </div>
    </section>
  );
}
