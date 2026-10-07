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
    <ul className="mx-auto w-full max-w-3xl">
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
    <li
      className={cn(
        "my-3 rounded-xl border border-gray-100 px-3 py-1",
        "shadow-sm transition-all duration-200",
        "hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
      )}
    >
      <div className="flex flex-col gap-1">
        <Link
          href={`/posts/${post.id}`}
          className={cn(
            "flex-1 text-xl font-bold text-gray-900 transition-colors",
            "w-full truncate duration-200 hover:text-blue-600 dark:text-white",
          )}
        >
          {post.title}
        </Link>

        <div className="mb-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span className="font-medium text-gray-500 dark:text-gray-400">
            By {authorEmail}
          </span>
          <span>•</span>
          <span>{formattedDate}</span>

          {formattedUpdatedDate && (
            <>
              <span>•</span>
              <span className="rounded-md px-1.5 py-0.5 font-medium text-amber-400 dark:text-amber-700">
                Updated: {formattedUpdatedDate}
              </span>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
