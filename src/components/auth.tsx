"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useState } from "react";
import Button from "../ui/button";

export function OAuthButton() {
  const [loading, setLoading] = useState(false);

  async function signIn() {
    await authClient.signIn.social({
      provider: "github",
      fetchOptions: { onRequest: () => setLoading(true) },
    });
  }

  return (
    <Button onClick={signIn} small loading={loading}>
      sign in with github
    </Button>
  );
}

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: true;
}

export function SignOutButton({ ...props }: SignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.refresh(),
        onRequest: () => setLoading(true),
      },
    });
  }

  return (
    <Button onClick={signOut} loading={loading} {...props}>
      sign out
    </Button>
  );
}
