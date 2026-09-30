"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "./ui/spinner";
import { useFormStatus } from "react-dom";
import { Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { deletePost } from "@/app/(main)/posts/actions";
import { cn } from "@/utils/utils";

type DeleteButtonProps = {
  id: number;
};

export const DeletePostButton = ({ id }: DeleteButtonProps) => {
  const { pending } = useFormStatus();

  const handleDelete = () => {
    deletePost(id);
    redirect("/posts");
  };

  const dleteBtn = (
    <button
      disabled={pending}
      className="w-full rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
    >
      {!pending ? "Delete" : <Spinner />}
    </button>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger render={dleteBtn} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia
            className={cn(
              "bg-destructive/10 text-destructive",
              "dark:bg-destructive/20 dark:text-destructive",
            )}
          >
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete post?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={pending}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
