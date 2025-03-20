"use client";

import components from "@/app/components.module.css";
import { deleteAccountAction } from "@/server/actions";
import { RefObject, useRef } from "react";
import Form from "../ui/form";
import { DialogCloseButton } from "../ui/dialog-close-button";

interface Props {
  username: string;
}

export default function DeleteAccount({ username }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(
    null
  ) as RefObject<HTMLDialogElement>;
  return (
    <>
      <button
        className={`${components.button} ${components.error}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        delete account
      </button>
      <dialog ref={dialogRef} className={components.dialog}>
        <Form
          formTitle="are you sure?"
          formDescription="your account and all related data will be immediately deleted"
          formButtonLabel="delete account"
          action={() => deleteAccountAction(username)}
          buttonsStyle="dangerous"
          secondButton={<DialogCloseButton dialogRef={dialogRef} />}
        ></Form>
      </dialog>
    </>
  );
}
