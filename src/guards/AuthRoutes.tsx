import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "@/auth/useAuth";
import AuthLoader from "@/components/misc/auth-loader";

export default function AuthRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <AuthLoader />;

  if (isAuthenticated) return null; // nothing to render while redirecting

  return <Outlet />;
}
