"use server";

import { redirect } from "next/navigation";
import { deleteAccountById, updateAccountById } from "./db/queries";
import { auth } from "./auth";
import { headers } from "next/headers";
import { fileUploader } from "./files";

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
  const pfp = formData.get("pfp");
  if (typeof username !== "string" || !id || !(pfp instanceof File)) return;

  const uploadResult = await new Promise(async (resolve) => {
    fileUploader.uploader
      .upload_stream({ resource_type: "raw" }, async (err, result) => {
        if (!err && result && result.url) {
          await updateAccountById(id, username, result.url);
          resolve(result);
        }
      })
      .end(await pfp.bytes());
  });
  redirect(`/users/${username}`);
}
