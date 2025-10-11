export type Query = Record<string, string | number | boolean | undefined | null>;

export default function buildQueryString(query: Query): string {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${queryString}` : "";
}
