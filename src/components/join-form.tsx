"use client";

import { joinVoiceChatAction } from "@/server/actions";
import Form from "@/ui/form";
import { useActionState } from "react";

interface JoinFormProps {
  id: number;
  userId: string;
}

export default function JoinForm({ id, userId }: JoinFormProps) {
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
    />
  );
}
