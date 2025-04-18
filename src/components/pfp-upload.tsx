"use client";

import { ChangeEvent, useState } from "react";
import Placeholder from "../icons/placeholder";
import classes from "./pfp-upload.module.css";
import components from "@/app/components.module.css";

interface Props {
  username: string;
  image?: string | null;
}

export default function PfpUpload({ username, image }: Props) {
  const [pfpPreview, setPfpPreview] = useState<string>(image ?? "PLACEHOLDER");

  function previewPfp(e: ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      if (file) {
        setPfpPreview(URL.createObjectURL(file));
      }
    }
  }

  return (
    <div className={classes["pfp-upload"]}>
      {pfpPreview === "PLACEHOLDER" ? (
        <Placeholder width={128} height={128} />
      ) : (
        <img
          src={pfpPreview}
          alt={`${username}'s profile picture`}
          className={`${components.pfp} ${classes.pfp}`}
          width={128}
          height={128}
        />
      )}
      <div style={{ position: "relative" }}>
        <input
          type="file"
          name="pfp"
          id="pfp"
          className={components["invisible-checkbox"]}
          onChange={previewPfp}
        />
        <label htmlFor="pfp" className={components.file}>
          select file
        </label>
      </div>
    </div>
  );
}
