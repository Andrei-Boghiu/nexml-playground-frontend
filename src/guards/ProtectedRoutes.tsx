import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // ! to replace with global spinner
  if (isLoading) return <div>Authenticating...</div>;

  if (!isAuthenticated) return null; // nothing to render while redirecting

  return <Outlet />;
}
