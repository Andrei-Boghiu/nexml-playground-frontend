import type { UserRole } from "./types";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};
