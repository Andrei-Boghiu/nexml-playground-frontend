/**
 * * "ENUM" --> "Enum"
 */
export function humanizeEnum(upperEnum: string): string {
  return upperEnum.charAt(0) + upperEnum.slice(1).toLowerCase();
}
