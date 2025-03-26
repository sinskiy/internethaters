import CreateVoiceChatForm from "@/components/create-voice-chat-form";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  return <CreateVoiceChatForm userId={session?.user.id} />;
}
