import Form from "@/app/ui/form";
import InputField from "@/app/ui/input-field";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import classes from "./page.module.css";
import components from "@/app/components.module.css";
import { Suspense } from "react";
import Placeholder from "@/app/icons/placeholder";

export default async function Edit({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;
  return (
    <Form formTitle="edit profile">
      <div className={classes["user-info"]}>
        <InputField
          id="username"
          type="text"
          defaultValue={awaitedParams.username}
          required
        />
        <Suspense
          fallback={
            <figure>
              <figcaption>profile picture</figcaption>
              <Placeholder />
            </figure>
          }
        >
          <ProfilePicture />
        </Suspense>
      </div>
    </Form>
  );
}

async function ProfilePicture() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <figure>
      <figcaption>profile picture</figcaption>
      {session?.user.image ? (
        <img
          src={session.user.image}
          alt={`${session?.user.name}'s profile picture`}
          className={`${components.pfp} ${classes.pfp}`}
          width={96}
          height={96}
        />
      ) : (
        <Placeholder />
      )}
    </figure>
  );
}
