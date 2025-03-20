import Link from "next/link";
import components from "@/app/components.module.css";
import classes from "./page.module.css";
import DeleteAccount from "@/app/components/delete-account";

export default async function Settings({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;
  return (
    <main className={classes.main}>
      <nav className={components["small-nav"]}>
        <Link
          href={`/users/${awaitedParams.username}`}
          className={components.link}
        >
          profile
        </Link>
        <Link
          href={`/users/${awaitedParams.username}/edit`}
          className={components.link}
        >
          edit information
        </Link>
      </nav>
      <DeleteAccount username={awaitedParams.username} />
    </main>
  );
}
