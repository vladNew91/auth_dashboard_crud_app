"use server";

import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

  if (error) {
    console.error("Database Insert Error:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/posts");
}

export async function updatePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  await supabase
    .from("posts")
    .update({ title: title, body: body })
    .eq("id", +id);
  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
}

export async function deletePost(id: number) {
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/posts");
}
