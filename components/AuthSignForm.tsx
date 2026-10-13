import { cn } from "@/utils/utils";

interface AuthSignFormProps {
  action: (formData: FormData) => Promise<never>;
  children?: React.ReactNode;
  params: {
    message?: string | undefined;
    error?: string | undefined;
  };
}

export async function AuthSignForm({
  action,
  children,
  params,
}: AuthSignFormProps) {
  return (
    <form action={action} className="flex flex-col gap-3">
      {children}

      <label
        htmlFor="email"
        className="font-medium text-zinc-700 dark:text-zinc-300"
      >
        Email
      </label>

      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="name@company.com"
        className={cn(
          "text-m w-full rounded-lg p-3 text-zinc-900",
          "dark:bg-zinc-900 dark:text-zinc-100",
        )}
      />

      <label
        htmlFor="password"
        className="font-medium text-zinc-700 dark:text-zinc-300"
      >
        Password
      </label>

      <input
        id="password"
        name="password"
        type="password"
        required
        placeholder="••••••••••••••••"
        className={cn(
          "text-m w-full rounded-lg p-3 text-zinc-900",
          "dark:bg-zinc-900 dark:text-zinc-100",
        )}
      />

      {/* Dynamic Provider Error Notice Box */}
      {params.error && <p className="text-sm text-red-500">{params.error}</p>}

      {params.message && (
        <p className="text-sm text-green-500">{params.message}</p>
      )}

      <button
        type="submit"
        className={cn(
          "text-m w-full cursor-pointer rounded-lg bg-zinc-900 py-2",
          "font-medium text-white transition-colors hover:bg-zinc-800",
          "focus:bg-blue-400 focus:outline-none dark:bg-zinc-50",
          "dark:text-zinc-900 dark:hover:bg-zinc-200",
        )}
      >
        Continue
      </button>
    </form>
  );
}
