import { z } from "zod";

export const archiveSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
  })
  .strict();

export const createArchiveSchema = archiveSchema.omit({ id: true });

export const updateArchiveSchema = createArchiveSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type ArchiveSchema = z.infer<typeof archiveSchema>;
export type CreateArchiveFormData = z.infer<typeof createArchiveSchema>;
export type UpdateArchiveFormData = z.infer<typeof updateArchiveSchema>;
