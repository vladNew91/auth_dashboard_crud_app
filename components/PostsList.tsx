import Link from "next/link";
import { Post } from "@/types";
import { cn } from "@/utils/utils";

type PostsListProps = {
  posts: Post[];
};

export default async function PostsList({ posts }: PostsListProps) {
  if (!posts) return null;

  return (
    <ul className="mx-auto w-full max-w-3xl">
      {posts.map((post, i: number) => {
        const authorEmail = post.profiles?.email || "Anonymous Visitor";
        const formattedDate = post.created_at
          ? new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Unknown date";

        // Check if an update has taken place
        const isEdited = !!post.updated_at;
        const formattedUpdatedDate = isEdited
          ? new Date(post.updated_at!).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : null;

        return (
          <li
            key={post.id}
            className={cn(
              "my-3 rounded-2xl",
              "border border-gray-100 p-4 shadow-sm transition-all duration-200",
              "hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
            )}
          >
            <div className="flex flex-col gap-1">
              {/* Meta Information Tag */}
              <div className="mb-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span className="font-medium text-gray-500 dark:text-gray-400">
                  By {authorEmail}
                </span>
                <span>•</span>
                <span>{formattedDate}</span>

                {isEdited && (
                  <>
                    <span>•</span>
                    <span className="rounded-md px-1.5 py-0.5 font-medium text-amber-400 dark:text-amber-700">
                      Updated: {formattedUpdatedDate}
                    </span>
                  </>
                )}
              </div>

              {/* Title & Body */}
              <Link
                href={`/posts/${post.id}`}
                className={cn(
                  "flex-1 text-xl font-bold transition dark:text-white",
                  "colors duration-200 hover:text-blue-600",
                )}
              >
                {i + 1}. {post.title}
              </Link>

              <textarea
                name="body"
                defaultValue={post.body}
                className={cn(
                  "mt-1 max-h-7 w-full resize-none overflow-y-auto",
                  "line-clamp-2 text-sm text-gray-500 dark:text-gray-400",
                )}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
