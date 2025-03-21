"use client";

import Error from "../components/error";

export default function InternalServerError({ error }: { error: Error }) {
  return <Error title={error.name} description={error.message} />;
}
