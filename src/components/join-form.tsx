"use client";

import {
  joinRandomVoiceChatAction,
  joinVoiceChatAction,
} from "@/server/actions";
import Form from "@/ui/form";
import { useActionState } from "react";
import classes from "./join-form.module.css";

interface JoinRandomFormProps {
  userId: string;
}

export function JoinRandomForm({ userId }: JoinRandomFormProps) {
  const [state, action] = useActionState(
    joinRandomVoiceChatAction.bind(null, userId),
    null
  );
  return (
    <Form
      formError={state?.message}
      action={action}
      formButtonLabel="join random"
      buttonsStyle="primary-container"
    />
  );
}

interface JoinFormProps {
  id: number;
  userId: string;
}

export function JoinForm({ id, userId }: JoinFormProps) {
  const [state, action] = useActionState(
    joinVoiceChatAction.bind(null, { id, userId }),
    null
  );
  return (
    <Form
      formError={state?.message}
      action={action}
      formButtonLabel="join"
      buttonsStyle="primary-container"
      className={classes.form}
    />
  );
}
