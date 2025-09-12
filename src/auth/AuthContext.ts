import { createContext } from "react";
import type { User } from "../types/user";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
