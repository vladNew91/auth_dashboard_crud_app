"use client";

import { Post } from "@/types";
import { cn } from "@/utils/utils";
import { showToast } from "./showToast";
import { SubmitFormButton } from "./SubmitFormBtn";
import { DeletePostButton } from "./DeletePostButton";
import { createPost, updatePost } from "@/app/(main)/posts/actions";

export function CreatePostForm() {
  async function handleSubmit(formData: FormData) {
    const result = await createPost(formData);

    if (result.success) {
      showToast({ type: "success", description: result.message });
    } else {
      showToast({ type: "error", title: "Error", description: result.message });
    }
  }

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        id="title"
        placeholder="Title..."
        name="title"
        className={cn(
          "mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2",
          "focus:ring-blue-500 dark:bg-gray-900 dark:text-white",
        )}
        required
      />

      <textarea
        id="body"
        name="body"
        rows={4}
        placeholder="Content..."
        className={cn(
          "mt-1 w-full py-2 focus:ring-blue-500 dark:border-gray-700",
          "rounded-lg border px-3 focus:ring-2 dark:bg-gray-900 dark:text-white",
        )}
        required
      />

      <SubmitFormButton title="Create post" />
    </form>
  );
}

export function EditPostForm({ id, post }: { id: number; post: Post }) {
  async function handleSubmit(formData: FormData) {
    const result = await updatePost(formData);

    if (result.success) {
      showToast({ type: "success", description: result.message });
    } else {
      showToast({ type: "error", title: "Error", description: result.message });
    }
  }

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        defaultValue={post.title}
        id="title"
        name="title"
        className={cn(
          "mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2",
          "focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white",
        )}
        required
      />

      <textarea
        id="body"
        name="body"
        rows={4}
        defaultValue={post.body}
        className={cn(
          "mt-1 w-full py-2 focus:ring-blue-500 dark:border-gray-700",
          "rounded-lg border px-3 focus:ring-2 dark:bg-gray-900 dark:text-white",
        )}
        required
      />

      <input type="hidden" id="id" name="id" value={id} />
      <SubmitFormButton title="Update" />
      <DeletePostButton id={id} />
    </form>
  );
}
