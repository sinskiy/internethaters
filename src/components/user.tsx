import { auth } from "@/server/auth";
import { headers } from "next/headers";
import components from "@/app/components.module.css";
import { OAuthButton, SignOutButton } from "./auth";
import classes from "./user.module.css";
import Link from "next/link";
import Settings from "../icons/settings";
import Placeholder from "../icons/placeholder";

export async function UserOrAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return <OAuthButton />;
  }

  return <User username={session.user.name} pfpUrl={session.user.image} />;
}

interface UserProfileProps {
  username: string;
  pfpUrl?: string | null;
}

function User({ username, pfpUrl }: UserProfileProps) {
  return (
    <div className={classes.user}>
      <div className={classes.profile}>
        {pfpUrl ? (
          <img
            src={pfpUrl}
            width={40}
            height={40}
            alt={`${username}'s profile picture`}
            className={components.pfp}
          />
        ) : (
          <Placeholder width={40} height={40} />
        )}
        <p className={classes.username}>{username}</p>
      </div>
      <div className={components["small-nav"]}>
        <SignOutButton small />
        <Link href={`/users/${username}/settings`} aria-label="settings">
          <Settings />
        </Link>
      </div>
    </div>
  );
}
