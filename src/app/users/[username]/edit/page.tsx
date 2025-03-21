import { auth } from "@/server/auth";
import { headers } from "next/headers";
import Form from "@/ui/form";
import InputField from "@/ui/input-field";
import { Suspense } from "react";
import Placeholder from "@/icons/placeholder";
import { updateAccountAction } from "@/server/actions";
import classes from "./page.module.css";
import components from "@/app/components.module.css";
import PfpUpload from "@/components/pfp-upload";

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
  username: string;
  loading?: true;
}

async function EditProfileForm({ username, loading }: ProfilePictureProps) {
  const session = loading
    ? null
    : await auth.api.getSession({ headers: await headers() });
  const action = updateAccountAction.bind(
    null,
    session?.user.id,
    session?.user.image
  );

  return (
    <Form
      formTitle="edit profile"
      action={action}
      buttonProps={{ disabled: !session?.user.id }}
    >
      <div className={classes["user-info"]}>
        <h3>profile picture</h3>
        <div style={{ position: "relative" }}>
          <PfpUpload username={username} image={session?.user.image} />
        </div>
        <div className={components["checkbox-field"]}>
          <input
            type="checkbox"
            name="deletePfp"
            id="delete-pfp"
            disabled={!session?.user.image}
          />
          <label htmlFor="delete-pfp">delete pfp</label>
        </div>
        <InputField
          id="username"
          type="text"
          defaultValue={username}
          required
        />
      </div>
    </Form>
  );
}
