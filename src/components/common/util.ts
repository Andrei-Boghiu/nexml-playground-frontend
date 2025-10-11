export function formatCreationDate(date?: string | number | Date) {
  if (!date) return "...";
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? "Invalid date" : parsed.toLocaleString().replace(",", " -");
}
