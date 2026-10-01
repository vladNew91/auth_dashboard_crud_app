import { CreatePostWelcome } from "@/components/ui/create-post-welcome";
import { CreatePostForm } from "@/components/PostForms";
import { cn } from "@/utils/utils";

export default function Home() {
  return (
    <section
      className={cn(
        "w-full max-w-3xl space-y-2 rounded-xl border-gray-100",
        "m-3 bg-white p-4 shadow-md sm:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-800",
      )}
    >
      <CreatePostWelcome />
      <CreatePostForm />
    </section>
  );
}
