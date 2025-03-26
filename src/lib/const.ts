export const LANGUAGES = ["english", "russian", "toki pona"] as const;
export const LEVELS = ["A1", "A2", "B1", "B2"] as const;

export type Language = (typeof LANGUAGES)[number];
export type Level = (typeof LEVELS)[number] | undefined | null;
