import { z } from "zod";

export const policySchema = z
  .object({
    id: z.uuidv4(),
    name: z.string().min(1, "Name is required"),
    content: z.string().min(1, "Content is required"),
  })
  .strict();

export const createPolicySchema = policySchema.omit({ id: true });

export const updatePolicySchema = createPolicySchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type PolicySchema = z.infer<typeof policySchema>;
export type CreatePolicyFormData = z.infer<typeof createPolicySchema>;
export type UpdatePolicyFormData = z.infer<typeof updatePolicySchema>;
