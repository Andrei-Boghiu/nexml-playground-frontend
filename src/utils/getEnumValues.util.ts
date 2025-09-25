import type { ZodObject } from "zod";

/**
 *  Important: Assumes the ZodObject is built like:
 *  z.optional(z.enum(["PRIVATE", "PUBLIC"])).or(z.literal("")),
 */
export function getEnumValues(zodObject: ZodObject, property: string): string[] {
  return Object.values(zodObject.shape[property].def.options[0].def.innerType.enum);
}
