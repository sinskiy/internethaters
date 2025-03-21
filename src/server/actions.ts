"use server";

import { redirect } from "next/navigation";
import { deleteAccountById, updateAccountById } from "./db/queries";
import { auth } from "./auth";
import { headers } from "next/headers";
import { fileUploader } from "./files";
import { extractPublicId } from "cloudinary-build-url";

export async function deleteAccountAction(username: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session && session.user.name === username) {
    await deleteAccountById(session.user.id);
  }
  redirect("/");
}

export async function updateAccountAction(
  id: string | undefined,
  image: string | null | undefined,
  formData: FormData
) {
  const username = formData.get("username");
  const pfp = formData.get("pfp");
  const deletePfp = formData.get("deletePfp");
  if (typeof username !== "string" || !id) return;

  if (deletePfp !== "on" && pfp instanceof File) {
    deleteImage(image);

    await new Promise(async (resolve) => {
      fileUploader.uploader
        .upload_stream({ resource_type: "raw" }, async (err, result) => {
          if (!err && result && result.url) {
            await updateAccountById(id, username, result.url);
            resolve(result);
          }
        })
        .end(await pfp.bytes());
    });
  } else if (deletePfp === "on") {
    deleteImage(image);

    await updateAccountById(id, username, null);
  }

  redirect(`/users/${username}`);
}

function deleteImage(image?: string | null) {
  const publicId = image && extractPublicId(image);
  if (publicId && !publicId.includes("https://avatars.githubusercontent.com")) {
    fileUploader.uploader.destroy(publicId, { resource_type: "raw" });
  }
}
