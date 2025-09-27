import type { UserSchema } from "@/schemas/user.schema";
import type { UserRole } from "./types";

export interface User extends UserSchema {
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
