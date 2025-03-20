"use client";

import { ButtonHTMLAttributes } from "react";
import Button from "../ui/button";
import { useFormStatus } from "react-dom";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
  loading?: boolean;
}

export default function FormButton({ ...props }: Props) {
  const { pending } = useFormStatus();
  return <Button {...props} loading={pending} />;
}
