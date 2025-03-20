import components from "@/app/components.module.css";
import classes from "./form.module.css";
import { FormHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import FormButton from "../components/form-button";
import { cn } from "@/lib/utils";

interface Props extends FormHTMLAttributes<HTMLFormElement>, PropsWithChildren {
  formTitle?: string;
  formDescription?: string;
  secondButton?: false | ReactNode;
  formButtonLabel?: string;
  buttonsStyle?: "default" | "dangerous";
}

export default function Form({
  formTitle,
  formDescription,
  children,
  secondButton,
  formButtonLabel,
  buttonsStyle = "default",
  ...props
}: Props) {
  return (
    <form {...props}>
      <div className={cn(!children && classes["orphan-header"])}>
        {formTitle && <h2 className={components["form-title"]}>{formTitle}</h2>}
        {formDescription && (
          <p className={components.text}>{formDescription}</p>
        )}
      </div>
      <div className={classes.body}>{children}</div>
      <div className={classes.nav}>
        <FormButton
          className={cn(buttonsStyle === "dangerous" && components.error)}
        >
          {formButtonLabel ?? "submit"}
        </FormButton>
        {secondButton}
      </div>
    </form>
  );
}
