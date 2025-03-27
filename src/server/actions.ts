"use server";

import { redirect } from "next/navigation";
import {
  deleteAccountById,
  insertVoiceChat,
  updateAccountById,
  updateUserCurrentVoiceChat,
  updateUsernameById,
} from "./db/queries";
import { auth } from "./auth";
import { headers } from "next/headers";
import { fileUploader } from "./files";
import { extractPublicId } from "cloudinary-build-url";
import * as v from "valibot";
import { LANGUAGES, LEVELS } from "@/lib/const";

export async function deleteAccountAction(username: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session && session.user.name === username) {
    try {
      await deleteAccountById(session.user.id);
    } catch (err) {
      return { message: "error deleting account" };
    }
  }
  redirect("/");
}

export async function updateAccountAction(
  { id, image }: { id: string | undefined; image: string | null | undefined },
  state: unknown,
  formData: FormData
) {
  if (!id) return { message: "account id is undefined" };

  const result = v.safeParse(UpdateAccountSchema, Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: v.flatten<typeof UpdateAccountSchema>(result.issues).nested,
    };
  }
  const doDeletePfp = result.output.deletePfp === "on";
  const { username, pfp } = result.output;

  try {
    if (doDeletePfp) {
      deleteImage(image);

      await updateAccountById(id, username, null);
    } else if (pfp !== undefined) {
      deleteImage(image);

      await new Promise(async (resolve) => {
        fileUploader.uploader
          .upload_stream({ resource_type: "raw" }, async (err, result) => {
            if (!err && result && result.url) {
              await updateAccountById(id, result.output.username, result.url);
              resolve(result);
            }
          })
          .end(
            await result.output
              .pfp! /*already checked*/
              .bytes()
          );
      });
    } else {
      await updateUsernameById(id, result.output.username);
    }
  } catch (err) {
    return { message: "error updating account" };
  }

  redirect(`/users/${result.output.username}`);
}

const UpdateAccountSchema = v.object({
  username: v.pipe(v.string(), v.nonEmpty(), v.maxLength(255)),
  pfp: v.optional(v.file()),
  deletePfp: v.optional(v.string()),
});

function deleteImage(image?: string | null) {
  const publicId = image && extractPublicId(image);
  if (publicId && !publicId.includes("https://avatars.githubusercontent.com")) {
    fileUploader.uploader.destroy(publicId, { resource_type: "raw" });
  }
}

export async function createVoiceChatAction(
  { userId }: { userId: string | undefined },
  state: unknown,
  formData: FormData
) {
  if (!userId) return { message: "account id is undefined" };

  const result = v.safeParse(
    CreateVoiceChatSchema,
    Object.fromEntries(formData)
  );
  if (!result.success) {
    return {
      errors: v.flatten<typeof CreateVoiceChatSchema>(result.issues).nested,
    };
  }
  const { title, language, level, maxMembers } = result.output;
  try {
    await insertVoiceChat(userId, title, language, level, maxMembers);
  } catch (err) {
    return { message: "server error creating voice chat" };
  }
}

const CreateVoiceChatSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty(), v.maxLength(255)),
  language: v.picklist(LANGUAGES),
  level: v.pipe(
    v.union([v.picklist(LEVELS), v.literal("")]),
    v.transform((input) => input || undefined)
  ),
  maxMembers: v.pipe(
    v.string(),
    v.transform((input) => parseInt(input)),
    v.minValue(2),
    v.maxValue(10)
  ),
});

export async function joinVoiceChatAction({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  try {
    await updateUserCurrentVoiceChat(userId, id);
  } catch (err) {
    return { message: "server error joining voice chat" };
  }
}
