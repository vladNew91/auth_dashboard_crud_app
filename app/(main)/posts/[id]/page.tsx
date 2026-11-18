import { Post } from "@/types";
import ErrorPage from "@/app/error";
import notFound from "@/app/not-found";
import { supabase } from "@/utils/supabase/client";
import { EditPostForm } from "@/components/PostForms";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

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
    <article className="m-3 w-full max-w-3xl space-y-2">
      <BreadcrumbComponent />

      <section className="rounded-xl p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
        <h3 className="text-xl">Edit post</h3>
        <EditPostForm id={id} post={post} />
      </section>
    </article>
  );
}
