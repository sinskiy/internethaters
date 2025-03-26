export const LANGUAGES = ["english", "russian", "toki pona"] as const;

export type Language = (typeof LANGUAGES)[number];
