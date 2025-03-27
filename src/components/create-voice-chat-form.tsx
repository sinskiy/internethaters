"use client";

import { LANGUAGES, LEVELS } from "@/lib/const";
import { createVoiceChatAction } from "@/server/actions";
import Form from "@/ui/form";
import InputField from "@/ui/input-field";
import { useActionState } from "react";
import Select from "@/ui/select";

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
      <Select
        id="language"
        options={LANGUAGES}
        error={state?.errors?.language?.[0]}
      />
      <Select
        id="level"
        options={["", ...LEVELS]}
        error={state?.errors?.level?.[0]}
      />
      <InputField
        id="max-members"
        type="number"
        name="maxMembers"
        label="max members"
        required
        min={2}
        max={10}
        defaultValue={2}
        error={state?.errors?.maxMembers?.[0]}
      />
    </Form>
  );
}
