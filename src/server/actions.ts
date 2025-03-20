"use server";

import { redirect } from "next/navigation";
import { deleteAccountById } from "./db/queries";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function deleteAccountAction(username: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session && session.user.name === username) {
    await deleteAccountById(session.user.id);
  }
  redirect("/");
}
