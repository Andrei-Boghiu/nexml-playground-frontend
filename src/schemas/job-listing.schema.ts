import { z } from "zod";

export const jobListingSchema = z
  .object({
    id: z.uuidv4(),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  })
  .strict();

export const createJobListingSchema = jobListingSchema.omit({ id: true });

export const updateJobListingSchema = createJobListingSchema
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type JobListingSchema = z.infer<typeof jobListingSchema>;
export type CreateJobListingFormData = z.infer<typeof createJobListingSchema>;
export type UpdateJobListingFormData = z.infer<typeof updateJobListingSchema>;
