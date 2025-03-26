"use client";

import { createVoiceChatAction } from "@/server/actions";
import Form from "@/ui/form";
import InputField from "@/ui/input-field";
import { useActionState } from "react";

interface Props {
  userId: string | undefined;
}

export default function CreateVoiceChatForm({ userId }: Props) {
  const [state, action] = useActionState(
    createVoiceChatAction.bind(null, { userId }),
    null
  );
  return (
    <Form
      formTitle="New voice chat"
      action={action}
      buttonProps={{ disabled: !userId }}
      formError={state?.message}
    >
      <InputField
        id="title"
        type="text"
        required
        error={state?.errors?.title?.[0]}
      />
    </Form>
  );
}
