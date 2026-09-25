"use client";

import { useFormStatus } from "react-dom";

import { deletePost } from "@/app/(main)/posts/actions";
import { redirect } from "next/navigation";

type DeleteButtonProps = {
  id: number;
};

export const DeletePostButton = ({ id }: DeleteButtonProps) => {
  const { pending } = useFormStatus();

  const handleDelete = () => {
    deletePost(id);
    redirect("/posts");
  };

  return (
    <button
      disabled={pending}
      onClick={handleDelete}
      className="w-full rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
};
