import classes from "./loading.module.css";

export function Loading() {
  return (
    <div className={classes.wrapper}>
      <span className={classes.loading} aria-label="loading"></span>
    </div>
  );
}
