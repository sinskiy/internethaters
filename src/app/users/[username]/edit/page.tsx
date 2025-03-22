import { auth } from "@/server/auth";
import { headers } from "next/headers";
import EditProfileForm from "@/components/edit-profile-form";

export default async function Edit({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <EditProfileForm
      username={awaitedParams.username}
      id={session?.user.id}
      image={session?.user.image}
    />
  );
}
