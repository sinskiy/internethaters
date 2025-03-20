"use client";
import { cn } from "@/lib/utils";
import components from "@/app/components.module.css";
import { ButtonHTMLAttributes } from "react";
import { Loading } from "./loading";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
  loading?: boolean;
}

export default function Button({
  small,
  disabled,
  loading,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        components.button,
        small && components.small,
        loading && components.loading,
        className
      )}
      disabled={disabled ?? loading}
      {...props}
    >
      {children}
      {loading && <Loading />}
    </button>
  );
}
