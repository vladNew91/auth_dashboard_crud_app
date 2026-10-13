import Link from "next/link";
import { cn } from "@/utils/utils";
import { signup } from "../actions";
import { AuthSignForm } from "@/components/AuthSignForm";

export default async function SignUpPage({
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
      <h2 className="text-center text-xl">Create an Account</h2>

      <AuthSignForm action={signup} params={params} />

      <div className="text-center text-xs dark:text-zinc-300">
        <span>Already have an Account?&ensp;</span>
        <Link href={"/signin"} className="text-blue-300">
          Sign in
        </Link>
      </div>
    </section>
  );
}
