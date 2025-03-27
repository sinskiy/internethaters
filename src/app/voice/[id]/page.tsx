import Error from "@/components/error";
import VoiceChat from "@/components/voice-chat";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export default async function VoiceChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const sessionPromise = auth.api.getSession({ headers: await headers() });
  const [session, awaitedParams] = await Promise.all([sessionPromise, params]);
  if (!session) return <Error title={401} description="Unauthorized" />;
  return <VoiceChat id={awaitedParams.id} username={session.user.name} />;
}
