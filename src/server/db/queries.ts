import { eq } from "drizzle-orm";
import db from ".";
import { user } from "./schema";

export async function getUserByUsername(username: string) {
  const [selectedUser] = await db
    .select({ name: user.name, image: user.image })
    .from(user)
    .where(eq(user.name, username));
  return selectedUser;
}

export async function deleteAccountById(id: string) {
  await db.delete(user).where(eq(user.id, id));
}

export async function updateUsernameById(id: string, newUsername: string) {
  await db.update(user).set({ name: newUsername }).where(eq(user.id, id));
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
