import { Post } from "@/types";
import { cn } from "@/utils/utils";
import ErrorPage from "@/app/error";
import notFound from "@/app/not-found";
import { supabase } from "@/utils/supabase/client";
import { EditPostForm } from "@/components/PostForms";

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
    <section
      className={cn(
        "w-full max-w-3xl space-y-2 rounded-xl border-gray-100",
        "mx-3 bg-white p-4 shadow-md sm:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-800",
      )}
    >
      <h3 className="text-xl whitespace-pre-line">Edit post</h3>
      <EditPostForm id={id} post={post} />
    </section>
  );
}
