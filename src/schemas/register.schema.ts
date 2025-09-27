import { z } from "zod";
import { userSchema } from "./user.schema";

export const registerSchema = userSchema.omit({ id: true });

export type RegisterFormData = z.infer<typeof registerSchema>;
