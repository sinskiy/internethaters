import Placeholder from "@/icons/placeholder";
import { getUserByUsername } from "@/server/db/queries";
import { Suspense } from "react";
import components from "@/app/components.module.css";
import classes from "./page.module.css";
import Link from "next/link";
import { SignOutButton } from "@/components/auth";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export default async function User({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;
  return (
    <Suspense
      fallback={<UserProfile username={awaitedParams.username} loading />}
    >
      <UserProfile username={awaitedParams.username} />
    </Suspense>
  );
}

interface Props {
  username: string;
  loading?: boolean;
}

async function UserProfile({ username, loading }: Props) {
  const user = loading ? null : await getUserByUsername(username);
  return (
    <section className={classes["user-profile"]}>
      <div className={classes["user-info"]}>
        {user?.image ? (
          <img
            src={user.image}
            alt={`${username}'s profile picture`}
            className={components.pfp}
            width={128}
            height={128}
          />
        ) : (
          <Placeholder width={128} height={128} />
        )}
        <p className={classes.username}>
          {user?.name ? `@${user.name}` : "loading"}
        </p>
        <Suspense>
          <UserProfileNav username={username} />
        </Suspense>
      </div>
    </section>
  );
}

interface UserProfileNavProps {
  username: string;
}

async function UserProfileNav({ username }: UserProfileNavProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.name === username) {
    return (
      <nav className={classes["user-nav"]}>
        <Link
          href={`/users/${username}/edit`}
          className={`${components.button} ${components["link-button"]} ${components["primary-container"]}`}
        >
          edit profile
        </Link>
        <SignOutButton className={components["tertiary-container"]} />
      </nav>
    );
  }
}
