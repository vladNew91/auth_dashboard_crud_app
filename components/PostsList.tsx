import Link from "next/link";
import { Post } from "@/types";
import { cn } from "@/utils/utils";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const editFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <ul className="mx-auto flex w-full max-w-3xl flex-col gap-2">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

function PostItem({ post }: { post: Post }) {
  const authorEmail = post.profiles?.email || "Anonymous Visitor";

  const formattedDate = post.created_at
    ? dateFormatter.format(new Date(post.created_at))
    : "Unknown date";

  const formattedUpdatedDate = post.updated_at
    ? editFormatter.format(new Date(post.updated_at))
    : null;

  return (
    <li className="rounded-xl px-3 py-2 dark:bg-gray-800">
      <Link
        href={`/posts/${post.id}`}
        className={cn(
          "flex-1 text-xl font-bold text-gray-900 transition-colors",
          "w-full truncate duration-200 hover:text-blue-600 dark:text-white",
        )}
      >
        {post.title}
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-500">
        <span className="dark:text-gray-400">By {authorEmail}</span>
        <span>•</span>
        <span>{formattedDate}</span>

        {formattedUpdatedDate && (
          <>
            <span>•</span>
            <span className="text-amber-400 dark:text-amber-700">
              Updated: {formattedUpdatedDate}
            </span>
          </>
        )}
      </div>
    </li>
  );
}
