import SearchClient from "./SearchClient";

export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const query = resolvedParams.query;

  return <SearchClient query={query} />;
}