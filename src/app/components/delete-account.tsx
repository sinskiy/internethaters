"use client";

import FormButton from "./form-button";
import components from "@/app/components.module.css";
import { deleteAccountAction } from "@/server/actions";
import { RefObject, useRef } from "react";

interface Props {
  id: string;
}

export default function DeleteAccount({ id }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className={`${components.button} ${components.error}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        delete account
      </button>
      <dialog ref={dialogRef as RefObject<HTMLDialogElement>}>
        <form action={() => deleteAccountAction(id)}>
          <h2 className={components["form-title"]}>Are you sure?</h2>
          <p className={components.text}>
            Your account and all related data will be immediately deleted
          </p>
          <FormButton className={components.error}>delete account</FormButton>
          <button
            type="button"
            className={components.button}
            onClick={() => dialogRef.current?.close()} // TODO: use formMethod without click event
          >
            cancel
          </button>
        </form>
      </dialog>
    </>
  );
}
