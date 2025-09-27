export default function buildQueryString(query: Record<string, string | number | boolean | undefined | null>): string {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
