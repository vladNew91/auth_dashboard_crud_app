"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// AUTH
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/signin?error=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  return redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (
    data?.user &&
    (!data.user.identities || data.user.identities.length === 0)
  ) {
    return redirect(
      `/signup?error=${encodeURIComponent(
        "An account with this email already exists. Please log in using your original provider (e.g., GitHub).",
      )}`,
    );
  }

  return redirect("/signin?message=Check your email to confirm registration");
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    revalidatePath("/", "layout");
  }

  return;
}

export async function signInWithOAuth(provider: Provider) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`,
      // Optional: inclusion of queryParams for Google's account selection screen
      queryParams: provider === 'google' ? {
        access_type: 'offline',
        prompt: 'select_account',
      } : undefined,
    },
  });

  if (error) {
    const formattedProvider = provider.charAt(0).toUpperCase() + provider.slice(1);
    return redirect(`/signin?error=${formattedProvider} authentication failed`);
  }

  if (data.url) {
    return redirect(data.url);
  }
}
