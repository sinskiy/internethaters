"use client";
import { useRouter } from "next/navigation";
import components from "@/app/components.module.css";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface BackProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export default function Back({ children, ...props }: BackProps) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} {...props}>
      {children}
    </button>
  );
}
