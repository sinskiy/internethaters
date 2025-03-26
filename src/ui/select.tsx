import components from "@/app/components.module.css";
import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: readonly (number | string)[];
  name?: string;
  label?: string;
  error: string | undefined;
}

export default function Select({
  id,
  name = id,
  label = id,
  options,
  error,
  required,
  className,
  ...props
}: Props) {
  return (
    <div>
      <label htmlFor={id} className={components.label}>
        {label}
        {required && (
          <span aria-label="required" className={components.required}>
            *
          </span>
        )}
      </label>
      <select
        name={name}
        id={id}
        className={cn(className, components.select)}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p aria-live="polite" className={components["input-error"]}>
        {error}
      </p>
    </div>
  );
}
