import { SVGAttributes } from "react";

export default function Placeholder({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="64" cy="64" r="64" fill="currentColor" />
    </svg>
  );
}
