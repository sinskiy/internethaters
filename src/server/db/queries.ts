import { eq } from "drizzle-orm";
import db from ".";
import { user } from "./schema";

export async function deleteAccountById(id: string) {
  await db.delete(user).where(eq(user.id, id));
}

export async function updateAccountById(
  id: string,
  newUsername: string,
  newPfp: string | null
) {
  await db
    .update(user)
    .set({ name: newUsername, image: newPfp })
    .where(eq(user.id, id));
}
