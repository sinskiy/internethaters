import { auth } from "@/server/auth";
import { headers } from "next/headers";
import Form from "@/app/ui/form";
import InputField from "@/app/ui/input-field";
import { Suspense } from "react";
import Placeholder from "@/app/icons/placeholder";
import { updateAccountAction } from "@/server/actions";
import classes from "./page.module.css";
import components from "@/app/components.module.css";

export default async function Edit({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;

  return (
    <Suspense
      fallback={<EditProfileForm username={awaitedParams.username} loading />}
    >
      <EditProfileForm username={awaitedParams.username} />
    </Suspense>
  );
}

interface ProfilePictureProps {
  username?: string;
  loading?: true;
}

async function EditProfileForm({ username, loading }: ProfilePictureProps) {
  const session = !loading
    ? await auth.api.getSession({ headers: await headers() })
    : null;
  const action = updateAccountAction.bind(null, session?.user.id);
  return (
    <Form
      formTitle="edit profile"
      action={action}
      buttonProps={{ disabled: !session?.user.id }}
    >
      <div className={classes["user-info"]}>
        <InputField
          id="username"
          type="text"
          defaultValue={username}
          required
        />
        <figure>
          <figcaption>profile picture</figcaption>
          {session?.user.image ? (
            <img
              src={session.user?.image}
              alt={`${username}'s profile picture`}
              className={`${components.pfp} ${classes.pfp}`}
              width={96}
              height={96}
            />
          ) : (
            <Placeholder />
          )}
        </figure>
      </div>
    </Form>
  );
}
