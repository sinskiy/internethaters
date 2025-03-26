"use client";

import { LANGUAGES, LEVELS } from "@/lib/const";
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
        <p aria-live="polite">{state?.errors?.language?.[0]}</p>
      </div>
      <div>
        <label htmlFor="level" className={components.label}>
          level
        </label>
        <select name="level" id="level" className={components.select}>
          <option value=""></option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <p aria-live="polite">{state?.errors?.level?.[0]}</p>
      </div>
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
