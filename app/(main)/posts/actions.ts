"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

// CRUD
export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("posts").insert([
    {
      title: title,
      body: body,
      user_id: user ? user.id : null,
    },
  ]);

  if (error) return { success: false, message: error.message };

  revalidatePath("/posts");
  return { success: true, message: "Post created successfully!" };
}

export async function updatePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const { error } = await supabase
    .from("posts")
    .update({ title: title, body: body })
    .eq("id", +id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
  return { success: true, message: "Post updated successfully!" };
}

export async function deletePost(id: number) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/posts");
  return { success: true, message: "Post deleted successfully!" };
}
