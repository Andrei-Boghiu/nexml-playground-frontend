export function safeJsonParse<T = unknown>(objString: string, defaultValue: T): T {
  try {
    return JSON.parse(objString) as T;
  } catch {
    return defaultValue;
  }
}
