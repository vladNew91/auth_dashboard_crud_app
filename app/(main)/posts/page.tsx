import { Suspense } from "react";
import { Post } from "@/types";
import PostsList from "@/components/PostsList";
import { supabase } from "@/utils/supabase/client";
import { PostsListSkeleton } from "@/components/PostsListSkeleton";

export default async function PostsPage() {
  const { data: posts } = await supabase
    .from<"posts", Post>("posts")
    .select("*")
    .returns<Post[]>();
  const countPosts = posts ? posts.length : 0;

  return (
    <section className="w-md p-4 font-sans sm:p-6 lg:p-8">
      <h2 className="m-3 text-lg font-semibold">
        All posts: <b>{countPosts}</b>
      </h2>

      {!posts || posts.length === 0 ? (
        <div className="rounded-2xl py-16 text-center shadow-sm dark:bg-gray-800">
          <p className="text-lg font-medium text-slate-400">No posts found</p>
        </div>
      ) : (
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList posts={posts} />
        </Suspense>
      )}
    </section>
  );
}
