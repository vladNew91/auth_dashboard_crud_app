import { createClient } from "@/utils/supabase/server";

export const CreatePostWelcome = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName =
    user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email;

  return (
    <>
      <h3 className="text-xl whitespace-pre-line">
        {!user ? "Create post" : `Welcome, ${userName}!\nCreate post.`}
      </h3>
    </>
  );
};
