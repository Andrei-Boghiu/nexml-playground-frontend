import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";
import AuthLoader from "@/components/misc/auth-loader";

export default function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <AuthLoader />;

  if (!isAuthenticated) return null; // nothing to render while redirecting

  return <Outlet />;
}
