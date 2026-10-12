import { signInWithOAuth } from "@/app/(auth)/actions";
import { cn } from "@/utils/utils";
import { Provider } from "@supabase/supabase-js";

type SignInWithProviderProps = {
  provider: Provider;
  children: React.ReactNode;
};

export function SignInWithOAuth({
  provider,
  children,
}: SignInWithProviderProps) {
  return (
    <form action={signInWithOAuth.bind(null, provider)}>
      <button
        type="submit"
        className={cn(
          "w-full cursor-pointer rounded-lg p-4 font-semibold hover:bg-white/5",
          "flex flex-row justify-center bg-white/3 text-black dark:text-white",
        )}
      >
        {children}
      </button>
    </form>
  );
}
