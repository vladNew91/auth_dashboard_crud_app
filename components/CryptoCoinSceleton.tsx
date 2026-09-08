import { cn } from "@/utils/utils";

export function CryptoCoinSceleton() {
  return (
    <div
      className={cn(
        "mt-5 block h-[251px] rounded-2xl p-5",
        "animate-pulse bg-[#1e2939] shadow-sm dark:border-neutral-800",
      )}
    >
      <div className="flex w-full">
        <div className="flex-1 space-y-2">
          <div className="h-7 w-1/6 rounded-md bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-8 w-1/5 rounded-md bg-neutral-200 dark:bg-neutral-700" />
        </div>

        <div className="h-6 w-17 shrink-0 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
      </div>

      <div className="mt-10 h-3 w-full rounded-md bg-neutral-200 dark:bg-neutral-700" />

      <div className="mt-5 flex w-full justify-between">
        <div className="h-7 w-1/9 rounded-md bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-7 w-1/9 rounded-md bg-neutral-200 dark:bg-neutral-700" />
      </div>

      <div className="m-auto mt-3 h-4 w-1/10 rounded-md bg-neutral-200 dark:bg-neutral-700" />
    </div>
  );
}
