import Link from "next/link";
import components from "@/app/components.module.css";
import classes from "./page.module.css";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { deleteAccountById } from "@/server/db/queries";
import FormButton from "@/app/components/form-button";

export default async function Settings({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const sessionPromise = auth.api.getSession({ headers: await headers() });
  const [session, awaitedParams] = await Promise.all([sessionPromise, params]);
  if (!session || session.user.name !== awaitedParams.username) {
    redirect("/");
  }

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
      <form
        action={async () => {
          "use server";
          await deleteAccountById(session.user.id);
          redirect("/");
        }}
      >
        <FormButton className={components.error}>delete account</FormButton>
      </form>
    </main>
  );
}
