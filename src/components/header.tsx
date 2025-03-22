import Link from "next/link";
import classes from "./header.module.css";
import Home from "@/icons/home";
import { Suspense } from "react";
import { UserOrAuth } from "./user";
import components from "@/app/components.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link href="/" aria-label="home" className={components.activatable}>
        <Home />
      </Link>
      <Suspense fallback="loading...">
        <UserOrAuth />
      </Suspense>
    </header>
  );
}
