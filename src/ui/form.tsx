import components from "@/app/components.module.css";
import classes from "./form.module.css";
import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import FormButton from "../components/form-button";
import { cn } from "@/lib/utils";

interface Props extends FormHTMLAttributes<HTMLFormElement>, PropsWithChildren {
  formTitle?: string;
  formDescription?: string;
  formError: string | undefined;
  secondButton?: false | ReactNode;
  formButtonLabel?: string;
  buttonsStyle?: "default" | "primary-container" | "dangerous";
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;
}

export default function Form({
  formTitle,
  formDescription,
  formError,
  children,
  secondButton,
  formButtonLabel,
  buttonsStyle = "default",
  buttonProps,
  ...props
}: Props) {
  return (
    <form {...props}>
      <div className={cn(!children && formTitle && classes["orphan-header"])}>
        {formTitle && <h2 className={components["form-title"]}>{formTitle}</h2>}
        {formDescription && (
          <p className={components.text}>{formDescription}</p>
        )}
      </div>
      <div className={classes.body}>{children}</div>
      <div className={classes.nav}>
        <FormButton
          className={cn(
            buttonsStyle === "primary-container" &&
              components["primary-container"],
            buttonsStyle === "dangerous" && components.error
          )}
          {...buttonProps}
        >
          {formButtonLabel ?? "submit"}
        </FormButton>
        {secondButton}
      </div>
      <p aria-live="polite" className={components["input-error"]}>
        {formError}
      </p>
    </form>
  );
}
