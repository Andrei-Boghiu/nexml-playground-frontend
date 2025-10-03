import { z } from "zod";

export const resumeSchema = z
  .object({
    id: z.uuidv4(),
    state: z.enum(["NOT_ANALYZED", "IN_PROGRESS", "ANALYZED", "FAILED", "REJECTED"]).optional(),
    candidateName: z.string().optional(),
    qualification: z.enum(["UNDER_QUALIFIED", "QUALIFIED", "OVERQUALIFIED"]).optional(),
    score: z.number().int().min(0).max(100).optional(),
    reasoning: z.string().optional(),
    ai_model: z.string().optional(),
  })
  .strict();

export const createResumeSchema = resumeSchema.omit({ id: true });

export const updateResumeSchema = createResumeSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type ResumeSchema = z.infer<typeof resumeSchema>;
export type CreateResumeFormData = z.infer<typeof createResumeSchema>;
export type UpdateResumeFormData = z.infer<typeof updateResumeSchema>;
