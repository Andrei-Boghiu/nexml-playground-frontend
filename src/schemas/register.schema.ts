import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  organization: z.string().optional(),
  accessReason: z.string().optional().nullable(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
