import Link from "next/link";
import components from "@/app/components.module.css";
import DeleteAccount from "@/components/delete-account";
import classes from "./page.module.css";

export default async function Settings({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;
  return (
    <>
      <nav className={`${components["small-nav"]} ${classes.nav}`}>
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
      <section>
        <h2 className={components["section-heading"]}>manage account</h2>
        <DeleteAccount username={awaitedParams.username} />
      </section>
    </>
  );
}
