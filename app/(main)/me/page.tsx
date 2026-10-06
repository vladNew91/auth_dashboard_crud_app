import { redirect } from "next/navigation";
import { cn, getHighResGoogleAvatar } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Me() {
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
        "flex w-full flex-col items-center justify-evenly sm:flex-row",
        "m-3 max-w-3xl rounded-xl border-gray-100 p-4 shadow-md sm:p-6",
        "gap-3 lg:p-8 dark:border-gray-700 dark:bg-gray-800",
      )}
    >
      <Avatar className="h-50 w-50">
        <AvatarImage src={highResAvatar} alt="avatar" />
        <AvatarFallback className="text-8xl">AU</AvatarFallback>
      </Avatar>

      <span className="text-[clamp(0.75rem,4vw,2rem)]">{userName}</span>
    </section>
  );
}
