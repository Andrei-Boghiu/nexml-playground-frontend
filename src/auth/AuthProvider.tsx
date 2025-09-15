import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutUser, handleInitiateProfile } from "../services/auth.service";
import { AuthContext } from "./AuthContext";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { safeJsonParse } from "../utils/safeParseJson.util";

const stringUser = window.localStorage.getItem("AUTH_USER");
const storedUser = stringUser ? safeJsonParse(stringUser, null) : null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(storedUser);
  const [initialized, setInitialized] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const logoutCallback = useCallback(() => {
    queryClient.invalidateQueries();
    localStorage.clear();
    setUser(null);
  }, [queryClient]);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: handleInitiateProfile,
    enabled: !initialized,
    retry: false,
    staleTime: Infinity,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: logoutCallback,
    onError: () => {
      console.warn("Logout request failed unexpectedly!");
    },
  });

  const logout = () => logoutMutation.mutate();

  useEffect(() => {
    if (isError) {
      logoutCallback();
      setInitialized(true);
    }
  }, [isError, logoutCallback]);

  useEffect(() => {
    if (profile && (!user || user.id !== profile.id)) {
      setUser(profile);
      window.localStorage.setItem("AUTH_USER", JSON.stringify(profile));
    }
    if (profile) {
      setInitialized(true);
    }
  }, [profile, user]);

  const isAuthenticated = Boolean(user?.id);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, isLoading: isLoading || logoutMutation.isPending, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
