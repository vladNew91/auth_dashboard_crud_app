import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cn, getHighResGoogleAvatar } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUsername } from "./actions";

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const highResAvatar = getHighResGoogleAvatar(user.user_metadata?.avatar_url);
  const userName =
    user.user_metadata?.full_name || user.user_metadata?.name || user.email;

  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-evenly",
        "m-3 max-w-3xl rounded-xl border-gray-100 p-4 shadow-md sm:p-6",
        "gap-3 lg:p-8 dark:border-gray-700 dark:bg-gray-800",
      )}
    >
      <div className="mb-5 flex flex-col items-center">
        <Avatar className="h-50 w-50">
          <AvatarImage src={highResAvatar} alt="avatar" />
          <AvatarFallback className="text-8xl">AU</AvatarFallback>
        </Avatar>

        <span className="text-[clamp(0.75rem,4vw,2rem)]">{userName}</span>
      </div>

      <form action={updateUsername} className="flex w-full flex-col gap-3">
        <label
          htmlFor="name"
          className="text-sm text-zinc-700 dark:text-zinc-300"
        >
          Edit Full Name
        </label>

        <input
          required
          name="name"
          type="name"
          maxLength={40}
          placeholder={userName}
          className={cn(
            "text-m w-full rounded-lg p-3 text-zinc-900",
            "dark:bg-zinc-900 dark:text-zinc-100",
          )}
        />

        <button
          type="submit"
          className={cn(
            "text-m w-full cursor-pointer rounded-lg bg-zinc-900 py-2",
            "font-medium text-white transition-colors hover:bg-zinc-800",
            "focus:bg-blue-400 focus:outline-none dark:bg-zinc-50",
            "dark:text-zinc-900 dark:hover:bg-zinc-200",
          )}
        >
          Save
        </button>
      </form>
    </section>
  );
}
