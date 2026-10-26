"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateUsername(formData: FormData) {
  const supabase = createClient();

  const { error } = await (
    await supabase
  ).auth.updateUser({
    data: {
      full_name: formData.get("name") as string,
    },
  });

  if (error) {
    console.error("Error updating profile:", error.message);
    return;
  }

  return;
}
