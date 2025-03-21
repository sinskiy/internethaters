"use server";

import { redirect } from "next/navigation";
import { deleteAccountById, updateAccountById } from "./db/queries";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function deleteAccountAction(username: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session && session.user.name === username) {
    await deleteAccountById(session.user.id);
  }
  redirect("/");
}

export async function updateAccountAction(
  id: string | undefined,
  formData: FormData
) {
  const username = formData.get("username");
  if (typeof username !== "string" || !id) return;
  await updateAccountById(id, username);
  redirect(`/users/${username}`);
}
