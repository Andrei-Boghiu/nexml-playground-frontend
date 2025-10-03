import { z } from "zod";

export const userSchema = z.object({
  id: z.uuidv4(),
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional().nullable(),
  companyType: z.string().optional().nullable(),
  accessReason: z.string().optional().nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
