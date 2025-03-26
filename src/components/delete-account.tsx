"use client";

import components from "@/app/components.module.css";
import { deleteAccountAction } from "@/server/actions";
import { RefObject, useRef, useState } from "react";
import Form from "../ui/form";
import { DialogCloseButton } from "../ui/dialog-close-button";
import InputField from "../ui/input-field";
import Trash from "@/icons/trash";

interface Props {
  username: string;
}

export default function DeleteAccount({ username }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(
    null
  ) as RefObject<HTMLDialogElement>;

  const message = `i, ${username}, want to delete my account`;

  const [deletionConfirmation, setDeletionConfirmation] = useState("");

  return (
    <>
      <button
        className={`${components.button} ${components.error} ${components["with-icon"]}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <Trash />
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
          buttonProps={{ disabled: deletionConfirmation !== message }}
          formError={undefined} // TODO: handle errors
        >
          <InputField
            id="deletion-confirmation"
            label={`type "${message}"`}
            type="text"
            value={deletionConfirmation}
            onChange={(e) => setDeletionConfirmation(e.currentTarget.value)}
            error={undefined}
            required
          />
        </Form>
      </dialog>
    </>
  );
}
