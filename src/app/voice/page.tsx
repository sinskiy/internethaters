import components from "@/app/components.module.css";
import classes from "./page.module.css";
import Link from "next/link";

/* ! temp */
interface VoiceChat {
  title: string;
  language: string;
  level?: "A1" | "A2" | "B1" | "B2";
  tags: string[];
  members: number;
  maxMembers: number;
}

const VOICE_CHATS: VoiceChat[] = [
  {
    title: "sinskiy",
    language: "english",
    members: 0,
    maxMembers: 3,
    tags: [],
  },
  {
    title: "sinuki",
    language: "toki pona",
    level: "A1",
    members: 0,
    maxMembers: 3,
    tags: ["philosophy", "programming"],
  },
  {
    title: "sinukis",
    language: "toki pona",
    level: "A1",
    members: 0,
    maxMembers: 3,
    tags: ["philosophy", "programming"],
  },
] as const;

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
          className={`${components["tertiary-container"]} ${components["link-button"]}`}
        >
          create new
        </Link>
      </section>
      <section className={classes["voice-chats"]}>
        {VOICE_CHATS.map((voiceChat) => (
          <VoiceChat key={voiceChat.title} {...voiceChat} />
        ))}
      </section>
    </>
  );
}

interface VoiceChatProps {
  title: string;
  language: string;
  level?: "A1" | "A2" | "B1" | "B2";
  tags: string[];
  members: number;
  maxMembers: number;
}

function VoiceChat({
  title,
  language,
  level,
  maxMembers,
  tags,
  members,
}: VoiceChatProps) {
  return (
    <article className={classes["voice-chat"]}>
      <div className={classes["voice-chat-header"]}>
        <h2 className={classes["voice-chat-title"]}>{title}</h2>
        {/* TODO: better label */}
        <div
          className={classes["voice-chat-members"]}
          aria-label={`${members} out of ${maxMembers} members`}
        >
          {members}/{maxMembers}
        </div>
      </div>
      <ul role="list" className={classes.tags}>
        <li className={classes.tag}>
          {language}
          <span className={classes.level}>{level && ` (${level})`}</span>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={classes.tag}>
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
