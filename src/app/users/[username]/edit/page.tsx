import Form from "@/app/ui/form";
import InputField from "@/app/ui/input-field";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import classes from "./page.module.css";
import components from "@/app/components.module.css";

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
        <ProfilePicture />
      </div>
    </Form>
  );
}

async function ProfilePicture() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <figure>
      <figcaption>profile picture</figcaption>
      <img
        src={session?.user.image ?? "placeholder.svg"}
        alt={`${session?.user.name}'s profile picture`}
        className={`${components.pfp} ${classes.pfp}`}
        width={128}
        height={128}
      />
    </figure>
  );
}
