import { InputHTMLAttributes } from "react";
import classes from "./checkbox.module.css";
import components from "@/app/components.module.css";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name?: string;
  label?: string;
}

export default function Checkbox({
  id,
  name = id,
  label = id,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`${components["checkbox-field"]} ${classes["checkbox-field"]}`}
    >
      <div className={classes["checkbox-wrapper"]}>
        <input
          type="checkbox"
          id={id}
          name={name}
          className={cn(className, components["invisible-checkbox"])}
          {...props}
        />
        <div className={classes["fake-checkbox"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            className={classes["check"]}
          >
            <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path>
          </svg>
        </div>
      </div>
      <label htmlFor={id} className={components["checkbox-label"]}>
        {label}
      </label>
    </div>
  );
}
