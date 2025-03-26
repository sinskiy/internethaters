"use client";

import { LANGUAGES } from "@/lib/const";
import { createVoiceChatAction } from "@/server/actions";
import Form from "@/ui/form";
import InputField from "@/ui/input-field";
import { useActionState } from "react";
import components from "@/app/components.module.css";

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
      <div>
        <label htmlFor="language" className={components.label}>
          language
        </label>
        <select name="language" id="language" className={components.select}>
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </Form>
  );
}
