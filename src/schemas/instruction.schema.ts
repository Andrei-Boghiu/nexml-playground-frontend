import { z } from "zod";

export const instructionSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    content: z.string().min(1, "Content is required"),
  })
  .strict();

export const createInstructionSchema = instructionSchema.omit({ id: true });

export const updateInstructionSchema = createInstructionSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type InstructionSchema = z.infer<typeof instructionSchema>;
export type CreateInstructionFormData = z.infer<typeof createInstructionSchema>;
export type UpdateInstructionFormData = z.infer<typeof updateInstructionSchema>;
