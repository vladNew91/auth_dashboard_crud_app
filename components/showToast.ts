import { toast } from "./ui/toast";

type ToastProps = {
  title?: string;
  description?: string;
  children?: string;
  type?: "default" | "success" | "error" | "info" | "warning";
};

export function showToast({ title, description, children, type }: ToastProps) {
  const id = toast.add({
    title: title,
    description: description,
    type: type,
    actionProps: {
      children: children,
      onClick() {
        toast.close(id);
      },
    },
  });
}
