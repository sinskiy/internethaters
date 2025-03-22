import Link from "next/link";
import classes from "./header.module.css";
import Home from "@/icons/home";
import { Suspense } from "react";
import { UserOrAuth } from "./user";
import components from "@/app/components.module.css";
import Headphones from "@/icons/headphones";

export default function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link href="/" aria-label="home" className={components.activatable}>
          <Home />
        </Link>
        <Link
          href="/voice"
          aria-label="voice chats"
          className={components.activatable}
        >
          <Headphones />
        </Link>
      </nav>
      <Suspense fallback="loading...">
        <UserOrAuth />
      </Suspense>
    </header>
  );
}
