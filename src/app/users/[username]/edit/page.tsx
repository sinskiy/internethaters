export default async function Edit({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const awaitedParams = await params;
  return <div>{awaitedParams.username}</div>;
}
