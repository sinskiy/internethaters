import Info from "@/icons/info";
import classes from "./info-box.module.css";

interface Props {
  message: string;
}

export default function InfoBox({ message }: Props) {
  return (
    <div className={classes.box}>
      <Info className={classes.svg} />
      {message}
    </div>
  );
}
