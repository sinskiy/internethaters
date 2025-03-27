export function cn(...passedClasses: (string | undefined | false | 0 | 0n)[]) {
  return (
    passedClasses.filter((passedClass) => passedClass).join(" ") || undefined
  );
}

export const initialState = { message: "" };
