export function timeSinceUpdate(dataUpdatedAt: number | string | Date): number {
  const now = new Date();
  const updatedAt = new Date(dataUpdatedAt);
  const diffMs = now.getTime() - updatedAt.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  return diffSeconds;
}
