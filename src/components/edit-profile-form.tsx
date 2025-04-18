"use client";

import { updateAccountAction } from "@/server/actions";
import Form from "@/ui/form";
import { useActionState } from "react";
import PfpUpload from "./pfp-upload";
import InputField from "@/ui/input-field";
import classes from "./edit-profile-form.module.css";
import components from "@/app/components.module.css";
import Checkbox from "@/ui/checkbox";

interface ProfilePictureProps {
  username: string;
  id?: string;
  image?: string | null;
}

export default function EditProfileForm({
  username,
  id,
  image,
}: ProfilePictureProps) {
  const [state, action] = useActionState(
    updateAccountAction.bind(null, { id, image }),
    undefined
  );

  return (
    <Form
      formTitle="edit profile"
      action={action}
      buttonProps={{ disabled: !id }}
      formError={state?.message}
    >
      <div className={classes["user-info"]}>
        <h3>profile picture</h3>
        <div style={{ position: "relative" }}>
          <PfpUpload username={username} image={image} />
          <p aria-live="polite" className={components["input-error"]}>
            {state?.errors?.pfp?.[0]}
          </p>
        </div>
        <Checkbox
          id="delete-pfp"
          name="deletePfp"
          label="delete pfp"
          disabled={!image}
        />
        <p aria-live="polite" className={components["input-error"]}>
          {state?.errors?.deletePfp?.[0]}
        </p>
        <InputField
          id="username"
          type="text"
          defaultValue={username}
          error={state?.errors?.username?.[0]}
          required
        />
      </div>
    </Form>
  );
}
