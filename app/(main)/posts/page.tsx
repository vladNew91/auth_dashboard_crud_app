export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Post } from "@/types";
import PostsList from "@/components/PostsList";
import { createClient } from "@/utils/supabase/server";
import { PostsListSkeleton } from "@/components/PostsListSkeleton";

export default async function PostsPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
    id,
    title,
    body,
    created_at,
    user_id,
    profiles!left (
      email
    )
  `,
    )
    .returns<Post[]>();

  if (error) console.error(error);

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
