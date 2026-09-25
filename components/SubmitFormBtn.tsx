"use client";

import { useFormStatus } from "react-dom";

type SubmitFormButtonProps = {
  title: string;
};

export const SubmitFormButton = ({ title }: SubmitFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
    >
      {title}
    </button>
  );
};
