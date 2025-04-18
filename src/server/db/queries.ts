import { count, eq, sql } from "drizzle-orm";
import db from ".";
import { user, voiceChat } from "./schema";
import { Language, Level } from "@/lib/const";

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

export async function getAllVoiceChats() {
  return await db.select().from(voiceChat);
}

export async function getMembersCountByVoiceChatId(id: number) {
  const [membersCount] = await db
    .select({ count: count(user.id) })
    .from(user)
    .where(eq(user.currentVoiceChatId, id));
  return membersCount;
}

export async function insertVoiceChat(
  userId: string,
  title: string,
  language: Language,
  level: Level,
  maxMembers: number
) {
  const [newVoiceChat] = await db
    .insert(voiceChat)
    .values({
      ownerId: userId,
      title,
      language,
      level,
      maxMembers,
    })
    .returning({ id: voiceChat.id });
  return newVoiceChat;
}

export async function updateUserCurrentVoiceChat(
  userId: string,
  voiceChatId: number
) {
  await db
    .update(user)
    .set({ currentVoiceChatId: voiceChatId })
    .where(eq(user.id, userId));
}

export async function getRandomVoiceChatId() {
  const [randomVoiceChat] = await db
    .select({ id: voiceChat.id })
    .from(voiceChat)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  return randomVoiceChat;
}
