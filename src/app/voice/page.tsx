import components from "@/app/components.module.css";
import classes from "./page.module.css";
import Link from "next/link";
import {
  getAllVoiceChats,
  getMembersCountByVoiceChatId,
} from "@/server/db/queries";
import { Suspense } from "react";
import { Level } from "@/lib/const";

/* ! temp, remove when I add all fields to db */
// interface VoiceChat {
//   title: string;
//   language: string;
//   level?: "A1" | "A2" | "B1" | "B2";
//   tags: string[];
//   maxMembers: number;
// }

// const VOICE_CHATS: VoiceChat[] = [
//   {
//     title: "sinskiy",
//     language: "english",
//     members: 0,
//     maxMembers: 3,
//     tags: [],
//   },
//   {
//     title: "sinuki",
//     language: "toki pona",
//     level: "A1",
//     members: 0,
//     maxMembers: 3,
//     tags: ["philosophy", "programming"],
//   },
//   {
//     title: "sinukis",
//     language: "toki pona",
//     level: "A1",
//     members: 0,
//     maxMembers: 3,
//     tags: ["philosophy", "programming"],
//   },
// ] as const;

export default function Voice() {
  return (
    <>
      <section className={classes.buttons}>
        <button
          className={`${components.button} ${components["primary-container"]}`}
        >
          join random
        </button>
        <Link
          href="/voice/new"
          className={`${components.button} ${components["tertiary-container"]} ${components["link-button"]}`}
        >
          create new
        </Link>
      </section>
      {/* TODO: better loading state */}
      <Suspense fallback="loading...">
        <VoiceChats />
      </Suspense>
    </>
  );
}

async function VoiceChats() {
  const voiceChats = await getAllVoiceChats();
  return (
    <section className={classes["voice-chats"]}>
      {voiceChats.map((voiceChat) => (
        <VoiceChat key={voiceChat.title} {...voiceChat} />
      ))}
    </section>
  );
}

interface VoiceChatProps {
  id: number;
  title: string;
  language: string;
  level: Level;
  // tags: string[];
  maxMembers: number;
}

function VoiceChat({
  id,
  title,
  language,
  level,
  maxMembers,
}: // tags,
VoiceChatProps) {
  return (
    <article className={classes["voice-chat"]}>
      <div className={classes["voice-chat-header"]}>
        <h2 className={classes["voice-chat-title"]}>{title}</h2>
        {/* TODO: better label */}
        <Members id={id} maxMembers={maxMembers} />
      </div>
      <ul role="list" className={classes.tags}>
        <li className={classes.tag}>
          {language}
          <span className={classes.level}>{level && ` (${level})`}</span>
        </li>
        {/* {tags.map((tag) => (
          <li key={tag} className={classes.tag}>
            {tag}
          </li>
        ))} */}
      </ul>
    </article>
  );
}

interface MembersProps {
  id: number;
  maxMembers: number;
}

async function Members({ id, maxMembers }: MembersProps) {
  const members = await getMembersCountByVoiceChatId(id);
  return (
    <div
      className={classes["voice-chat-members"]}
      aria-label={`${members.count} out of ${maxMembers} members`}
    >
      {members.count}/{maxMembers}
    </div>
  );
}
