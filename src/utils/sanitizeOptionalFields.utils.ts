type surelyNotAny = string | number | [] | null | undefined;

// This function removes optional string fields that are empty or whitespace-only from the form data.
// It should only be called inside the `handleSubmit` callback provided by React Hook Form,
// because required fields are guaranteed to have values by the form validation.
// Non-string fields are preserved unless they are null or undefined.
// The return type is T (not Partial<T>) under the assumption that required fields are always filled in.

export function sanitizeOptionalFields<T extends Record<string, surelyNotAny>>(
  data: T,
  optionalKeys?: Array<keyof T>
): T {
  const keysToCheck = optionalKeys ?? (Object.keys(data) as Array<keyof T>);
  const result: Partial<T> = {};

  for (const key of keysToCheck) {
    const val = data[key];

    // Only remove strings that are empty after trimming
    if (typeof val === "string") {
      if (val.trim() !== "") {
        result[key] = val;
      }
    } else if (val !== null && val !== undefined) {
      // Keep other non-nullish values
      result[key] = val;
    }
  }

  return result as T;
}
