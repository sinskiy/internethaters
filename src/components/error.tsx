import Link from "next/link";
import classes from "./error.module.css";
import components from "@/app/components.module.css";
import Back from "./back";
import Home from "@/icons/home";
import Undo from "@/icons/undo";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  description: string;
}

export default function Error({ title, description }: Props) {
  return (
    <main className={classes.wrapper}>
      <h1 className={classes.title}>{title}</h1>
      <p className={components.text}>{description}</p>
      <nav className={classes.nav}>
        <Link
          href="/"
          className={`${components["with-icon"]} ${components.link}`}
        >
          <Home />
          home
        </Link>
        <Back className={`${components["with-icon"]} ${components.link}`}>
          <Undo />
          go back
        </Back>
      </nav>
    </main>
  );
}
