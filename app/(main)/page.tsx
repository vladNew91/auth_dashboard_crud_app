import { CreatePostWelcome } from "@/components/ui/create-post-welcome";
import { CreatePostForm } from "@/components/PostForms";
import { cn } from "@/utils/utils";

export default function Home() {
  return (
    <section
      className={cn(
        "w-full max-w-3xl space-y-2 rounded-xl",
        "m-3 p-4 sm:p-6 lg:p-8 dark:bg-gray-800",
      )}
    >
      <CreatePostWelcome />
      <CreatePostForm />
    </section>
  );
}
