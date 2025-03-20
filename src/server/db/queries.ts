import { eq } from "drizzle-orm";
import db from ".";
import { user } from "./schema";

export async function deleteAccountById(id: string) {
  await db.delete(user).where(eq(user.id, id));
}
