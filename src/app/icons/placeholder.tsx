import { SVGAttributes } from "react";

export default function Placeholder({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 96 96"
      width={96}
      height={96}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="48" cy="48" r="48" fill="currentColor" />
    </svg>
  );
}
