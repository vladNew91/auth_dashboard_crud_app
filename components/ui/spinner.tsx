import { cn } from "@/utils/utils";
import { LoaderIcon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("m-auto size-6 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
