/**
 *  "email" -> "Email"
 *  "firstName" -> "First name"
 */
export function humanizeFieldName(fieldName: string): string {
  // Insert space before uppercase letters and lowercase the rest
  const result = fieldName
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();

  // Capitalize the first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}
