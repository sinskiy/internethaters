import { auth } from "@/server/auth";
import { headers } from "next/headers";
import components from "@/app/components.module.css";
import { OAuthButton, SignOutButton } from "./auth";
import classes from "./user.module.css";
import Link from "next/link";
import Settings from "../icons/settings";

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
        <img
          src={pfpUrl ?? "/placeholder.svg"}
          width={32}
          height={32}
          alt={`${username}'s profile picture`}
          className={components.pfp}
        />
        <p>{username}</p>
      </div>
      <div className={components["small-nav"]}>
        <Link href={`/users/${username}/settings`} aria-label="settings">
          <Settings />
        </Link>
        <SignOutButton />
      </div>
    </div>
  );
}
