import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import components from "@/app/components.module.css";
import classes from "./input-field.module.css";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: HTMLInputTypeAttribute;
  name?: string;
  label?: string;
  error: string | undefined;
}

export default function InputField({
  type,
  id,
  name = id,
  label = id,
  required,
  className,
  error,
  ...props
}: Props) {
  return (
    <div>
      <label htmlFor={id} className={components.label}>
        {label}
        {required && (
          <span aria-label="required" className={classes.required}>
            *
          </span>
        )}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={cn(className, components.input, error && classes.error)}
        {...props}
      />
      <p aria-live="polite" className={components["input-error"]}>
        {error}
      </p>
    </div>
  );
}
