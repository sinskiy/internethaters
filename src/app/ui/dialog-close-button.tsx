import { RefObject } from "react";
import components from "@/app/components.module.css";
interface DialogCloseButtonProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export function DialogCloseButton({ dialogRef }: DialogCloseButtonProps) {
  return (
    <button
      type="button"
      className={components.button}
      onClick={() => dialogRef.current?.close()} // TODO: use formMethod without click event
    >
      cancel
    </button>
  );
}
