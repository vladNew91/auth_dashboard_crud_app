import { Post } from "@/types";
import { cn } from "@/utils/utils";
import ErrorPage from "@/app/error";
import notFound from "@/app/not-found";
import { updatePost } from "../actions";
import { supabase } from "@/utils/supabase/client";
import { SubmitFormButton } from "@/components/SubmitFormBtn";
import { DeletePostButton } from "@/components/DeletePostButton";

type PostPageProps = {
  params: Promise<{ id: number }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single<Post>();

  if (!post || !id) return notFound();
  if (error) return ErrorPage(error);

  return (
    <form
      action={updatePost}
      className={cn(
        "w-full max-w-3xl space-y-4 rounded-xl border-gray-100",
        "m-3 bg-white p-4 shadow-md sm:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-800",
      )}
    >
      <h3>Edit post</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>

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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content
        </label>

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
      </div>

      <input type="hidden" id="id" name="id" value={id} />
      <SubmitFormButton title="Update" />
      <DeletePostButton id={id} />
    </form>
  );
}
