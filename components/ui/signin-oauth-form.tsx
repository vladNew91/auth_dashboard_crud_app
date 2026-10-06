import { signInWithOAuth } from "@/app/(auth)/actions";
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
    <form
      action={signInWithOAuth.bind(null, provider)}
      className="inline-block"
    >
      <button
        className="box-border cursor-pointer rounded-lg p-2 font-semibold text-white hover:bg-white/5"
        type="submit"
      >
        <span title={`Sign in with ${provider}`}>{children}</span>
      </button>
    </form>
  );
}
