"use server";

import { redirect } from "next/navigation";
import { deleteAccountById } from "./db/queries";

export async function deleteAccountAction(id: string) {
  await deleteAccountById(id);
  redirect("/");
}
